import ProductDetails from "@/components/products/ProductDetails";
import prisma from "@/utils/prisma";
let getProduct = async (id) => {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
};

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    take: 15,
  });

  return products.map((product) => ({
    id: product.id,
  }));
}
const page = async ({ params: { id } }) => {
  let product = await getProduct(id);

  return (
    <div className="h-screen ">
      <p> Pdoduct Details</p>
      <ProductDetails productInfo={product} />
    </div>
  );
};

export default page;
