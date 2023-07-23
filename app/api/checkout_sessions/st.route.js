import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  // const { name, email, zip, country, state, city, street1, userId } =
  //   await req.json();

  // console.log({ name, email, zip, country, state, city, street1, userId });

  // let update = await prisma.user.update({
  //   where: { id: userId },
  //   data: {
  //     name,
  //     email,
  //     address: {
  //       zip,
  //       country,
  //       state,
  //       city,
  //       street1,
  //     },
  //   },
  // });
  // console.log("🚀 ~ file: route.js:20 ~ POST ~ update:", update);

  // return NextResponse.json(update);
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "{{PRICE_ID}}",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
    });
    res.redirect(303, session.url);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
  return NextResponse.json({ payment: true });
}
