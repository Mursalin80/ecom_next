import { NextResponse } from "next/server";
import { uploadImage } from "@/utils/cloudinary";
import prisma from "@/utils/prisma";

export async function POST(req) {
  let formData = await req.formData();
  // store images reference from cloudinary {public_id,url}
  let imgRes = [];

  // get post body data
  let images = formData.getAll("images");
  let name = formData.get("name");
  let desc = formData.get("desc");
  let cat = formData.get("cat");
  let price = formData.get("price");
  let seller = formData.get("seller");
  let stock = formData.get("stock");

  // upload images to cloudinary service
  for (let i = 0; i < images.length; i++) {
    const el = images[i];
    try {
      let res = await uploadImage(el);
      imgRes.push({ public_id: res.public_id, url: res.url });
    } catch (error) {
      console.log("🚀 ~ file: route.js:23 ~ POST ~ error:", error);
      return NextResponse.json({ error }, { status: 500, statusText: error });
    }
  }

  // product store in database
  let newProduct;
  try {
    newProduct = await prisma.product.create({
      data: {
        name: name,
        description: desc,
        seller: seller,
        price: parseFloat(price),
        category: cat,
        stock: parseFloat(stock),
        images: imgRes,
      },
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  // all good
  return NextResponse.json({ Product: newProduct });
}
