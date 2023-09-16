import { headers } from "next/headers";
import { stripe } from "@/utils/stripe";
import prisma from "@/utils/prisma";

export async function POST(req) {
  const body = await req.text();
  const sig = headers().get("Stripe-Signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // webhook events
  let checkout_session = event.data.object;

  try {
    switch (event.type) {
      case "checkout.session.completed":
        let checkout = await stripe.checkout.sessions.retrieve(
          checkout_session.id,
          { expand: ["line_items", "customer"] }
        );

        let items = checkout.line_items;

        let order = await prisma.order.create({
          data: {
            paidAt: new Date(Date(checkout.created)).toISOString(),
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: checkout.amount_total,
            orderStatus: "processing",

            shippingInfo: {
              create: [
                {
                  address:
                    checkout.customer_details.address.line1 +
                    " " +
                    checkout.customer_details.address.line1,
                  city: checkout.customer_details.address.city,
                  phoneNo: checkout.customer_details.phone,
                  postalCode: checkout.customer_details.address.postal_code,
                  country: checkout.customer_details.address.country,
                },
              ],
            },
            userId: checkout.metadata.userId,

            paymentInfo: {
              create: {
                status: checkout.payment_status,
                paymentMethod: checkout.payment_method_types[0],
                paymentId: checkout.payment_intent,
              },
            },
            orderItems: {
              create: checkout.line_items.data.map((item) => ({
                quantity: item.quantity,
                productId: item.description,
                price: item.price.unit_amount,

                name: item.description,
              })),
            },
          },
        });

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.log(error);
    return new Response(
      "Webhook handler failed. View your nextjs function logs.",
      {
        status: 400,
      }
    );
  }

  return new Response({ received: true });
}
