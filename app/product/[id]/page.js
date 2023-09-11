import ProductDetails from "@/components/products/ProductDetails";
import prisma from "@/utils/prismaClient";
let getProduct = async (id) => {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
};
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
