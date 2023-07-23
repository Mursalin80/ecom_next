import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/utils/prisma";

const key = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(key);

export async function POST(request) {
  const body = await request.json();

  let { items, total } = body;
  try {
    if (items.length > 0 && total) {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        // shipping_options: [
        //   { shipping_rate: "shr_1NJgGfFFOcRRviB5IKHisAI1" },
        //   { shipping_rate: "shr_1NJgFzFFOcRRviB5RNlrrnhM" },
        // ],
        invoice_creation: {
          enabled: true,
        },
        line_items: items.map((item) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                // productId: item.id,
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
            // adjustable_quantity: {
            //   enabled: true,
            //   minimum: 1,
            //   maximum: 10,
            // },
          };
        }),
        phone_number_collection: {
          enabled: true,
        },
        success_url: `${request.headers.get("origin")}/cart/checkout_success`,
        cancel_url: `${request.headers.get("origin")}/?canceled=true`,
      });

      console.log("🚀 ~ file: route.js:53 ~ POST ~ session:", session);

      return NextResponse.json({ session });
    } else {
      return NextResponse.json({ message: "No Data Found" });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(err.message);
  }
}
