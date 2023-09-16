"use client";

import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  let router = useRouter();
  const [fileInputState, setFileInputState] = useState([]);
  const [previewSource, setPreviewSource] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const productNameRef = useRef(null);
  const productPriceRef = useRef(null);
  const productDescRef = useRef(null);
  const productSellerRef = useRef(null);
  const productStockRef = useRef(null);
  const productCatRef = useRef(null);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource((preState) => [...preState, reader.result]);
    };
    toast.info("Image file selected!");
  };

  const handleFileChange = (event) => {
    const imgFile = event.target.files[0];
    previewFile(imgFile);
    setSelectedFile(imgFile);
    setFileInputState((preState) => [...preState, event.target.value]);
  };

  const resetState = () => {
    toast.info("Form reset!");
    setSelectedFile("");
    setPreviewSource([]);
    setFileInputState([]);
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;
    if (fileInputState.length < 3) {
      toast.warn("Please select 3 image files");
      return;
    }

    const formData = new FormData();
    previewSource.map((img) => formData.append(`images`, img));
    formData.set("name", productNameRef.current.value);
    formData.set("desc", productDescRef.current.value);
    formData.set("cat", productCatRef.current.value);
    formData.set("seller", productSellerRef.current.value);
    formData.set("price", productPriceRef.current.value);
    formData.set("stock", productStockRef.current.value);

    try {
      let res = await fetch("/api/admin/cloudinary", {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400) {
        throw new Error(body?.error || "Failed to add the product!");
      }

      let body = await res.json();
      toast.success(`Product add under productID: ${body.Product.id}`);
      router.push("/");
    } catch (error) {
      toast.error(error.massage);
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col ">
      <form onSubmit={handleSubmitForm} className="">
        <div className="mx-2 my-5 px-2 py-5 rounded-t-3xl border  border-dashed border-gray-900/25">
          <div className="rounded-2xl p-2 m-2 flex flex-col lg:flex-row">
            <div className=" sm:col-span-4 flex-1">
              <div className="flex text-sm font-medium ">
                <label
                  htmlFor="file"
                  className="block flex-1 rounded-md text-center m-1 px-3 py-2 bg-slate-300  leading-6 text-gray-900"
                >
                  Upload # {fileInputState?.length}
                </label>
                <button
                  type="reset"
                  onClick={resetState}
                  className="rounded-md bg-red-500 m-1 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset upload!
                </button>
              </div>

              <div className="mt-2">
                <div className="flex rounded-2xl shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="file"
                    name="image1"
                    id="image1"
                    required
                    autoComplete="image1"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Please select image.."
                    onChange={handleFileChange}
                    disabled={!!fileInputState[0]}
                  />
                </div>
                <div className="flex rounded-2xl shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="file"
                    name="image2"
                    id="image2"
                    required
                    className={` flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6 ${
                      fileInputState?.length < 1 ? "hidden" : "block"
                    }`}
                    onChange={handleFileChange}
                    disabled={!!fileInputState[1]}
                  />
                </div>
                <div className="flex rounded-2xl shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="file"
                    name="image3"
                    id="image3"
                    required
                    className={` flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6 ${
                      fileInputState?.length < 2 ? "hidden" : "block"
                    }`}
                    onChange={handleFileChange}
                    disabled={!!fileInputState[2]}
                  />
                </div>
                <div className="flex rounded-2xl shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="file"
                    name="image4"
                    id="image4"
                    className={` flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6 ${
                      fileInputState?.length < 3 ? "hidden" : "block"
                    }`}
                    onChange={handleFileChange}
                    disabled={!!fileInputState[3]}
                  />
                </div>
              </div>
            </div>

            <div className="m-2 p-2  ">
              {previewSource.length > 0 && (
                <div className="flex w-auto h-auto">
                  <div className="flex flex-wrap">
                    {previewSource.map((img) => (
                      <img
                        src={img}
                        alt={img}
                        className="p-1 m-1 rounded-2xl h-44"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mx2 my-5 mt-5 px-2 py-5 border-b border-gray-900/10 border-t ">
          <div className="space-y-12">
            <div className=" pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Add New Product Details.
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="productname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        required
                        name="productname"
                        id="productname"
                        autoComplete="productname"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="productname"
                        ref={productNameRef}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Price
                  </label>
                  <div className="mt-2">
                    <input
                      ref={productPriceRef}
                      type="text"
                      required
                      name="price"
                      id="price"
                      autoComplete="price"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="desc"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Descripton
                  </label>
                  <div className="mt-2">
                    <textarea
                      required
                      ref={productDescRef}
                      rows={3}
                      name="desc"
                      id="desc"
                      autoComplete="desc"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="seller"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Seller
                  </label>
                  <div className="mt-2">
                    <select
                      required
                      ref={productSellerRef}
                      id="seller"
                      name="seller"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="amozon">Amozon</option>
                      <option value="dell">Dell</option>
                      <option value="lg">LG</option>
                      <option value="lenovo">Lenovo</option>
                      <option value="hp">Hp</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      ref={productCatRef}
                      id="seller"
                      name="seller"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="electronic">Electronic</option>
                      <option value="homeAppliance">Home Appliance</option>
                      <option value="laptop">Laptop</option>
                      <option value="mobile">Mobile</option>
                      <option value="networking">Networking</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Stock
                  </label>
                  <div className="mt-2">
                    <input
                      ref={productStockRef}
                      type="stock"
                      name="stock"
                      id="stock"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={fileInputState.length < 1}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
