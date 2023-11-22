// components/ProductForm.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createProduct } from "../redux/slices/uploadProductSlice";

const ProductForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      brand: "",
      price: "",
      productDescription: "",
      category: "",
      imageUrl: null,
      stock: "",
    },
    validationSchema: Yup.object({
      brand: Yup.string().required("Brand is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
      productDescription: Yup.string().required("Description is required"),
      category: Yup.string().required("Category is required"),
      imageUrl: Yup.mixed().required("imageUrl is required"), // Use Yup.mixed() for file input
      stock: Yup.number()
        .required("Stock is required")
        .integer("Stock must be an integer")
        .min(0, "Stock must be 0 or greater"),
      //   thumbnail: Yup.string().required("Thumbnail URL is required"),
      // images: Yup.string().required("Images URLs are required"),
    }),
    onSubmit: (values) => {
      console.log(values, "form valuesss");
      dispatch(createProduct(values));
      console.log(values, "product values");
      formik.resetForm();
      // Convert the comma-separated images string to an array
      // values.images = values.images.split(",").map((image) => image.trim());
    },
  });

  return (
    <div className="container mx-auto">
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block text-gray-700 font-bold mb-2 text-left"
          >
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.brand}
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          />
          {formik.touched.brand && formik.errors.brand && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.brand}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 font-bold mb-2 text-left"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          />
          {formik.touched.price && formik.errors.price && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.price}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="productDescription"
            className="block text-gray-700 font-bold mb-2 text-left"
          >
            Product Description
          </label>
          <input
            type="text"
            id="productDescription"
            name="productDescription"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.productDescription}
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          />
          {formik.touched.productDescription &&
            formik.errors.productDescription && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.productDescription}
              </div>
            )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-bold mb-2 text-left"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          />
          {formik.touched.category && formik.errors.category && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.category}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-gray-700 font-bold mb-2 text-left"
          >
            Images URLs (comma-separated)
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.imageUrl}
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          />
          {formik.touched.imageUrl && formik.errors.imageUrl && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.imageUrl}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="stock"
            className="block text-gray-700 font-bold mb-2 text-left"
          >
            Stock
          </label>
          <input
            type="text"
            id="stock"
            name="stock"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.stock}
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          />
          {formik.touched.stock && formik.errors.stock && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.stock}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#3E8AAD] text-white px-4 py-2 rounded-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

/* Form fields go here 
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            //   className="w-full border rounded-md py-2 px-3"
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.title}
            </div>
          )}
        </div> 
        
       <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-gray-700 font-bold mb-2"
          >
            Thumbnail Image
          </label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            className="form-control"
            // onChange={formik.handleChange}
            onChange={(event) => {
              formik.setFieldValue("imageUrl", event.currentTarget.files[0]);
            }}
          />
          <p className="image-size-ratio">
            Image Size Ratio: 400 * 200 px (PNG Format)
          </p>
           <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.thumbnail}
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          /> 
          {formik.touched.imageUrl && formik.errors.imageUrl && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.imageUrl}
            </div>
          )}
        </div> */
