import { NextResponse, NextRequest } from "next/server";

export async function POST(req) {
  const { name, email, zip, country, state, city, street1, userId } =
    await req.json();

  console.log({ name, email, zip, country, state, city, street1, userId });

  let update = await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      email,
      address: {
        zip,
        country,
        state,
        city,
        street1,
      },
    },
  });
  console.log("🚀 ~ file: route.js:20 ~ POST ~ update:", update);

  // return NextResponse.json(update);
  return NextResponse.json({ update });
}
