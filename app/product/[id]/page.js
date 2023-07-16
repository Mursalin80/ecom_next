import React from "react";

const page = ({ params: { id } }) => {
  console.log("🚀 ~ file: page.js:4 ~ page ~ id:", id);

  return <div className="h-screen">Pdoduct Details Page: {id}</div>;
};

export default page;
