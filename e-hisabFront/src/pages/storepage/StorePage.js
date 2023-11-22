import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Formik, Field, Form } from "formik";
import AddRemoveQuantity from "../../components/AddRemoveQuantity";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../redux/slices/addToCart";
import orderSchema from "../validation/OrderSchema";
import { sendPayment } from "../../redux/slices/paymentServiceSlice";
import { createOrderedUserProduct } from "../../redux/slices/saveOrderedUserData";

const StorePage = () => {
  const dispatch = useDispatch();
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const cartitems = useSelector((state) => state.cart.items);
  const saveordereduserData = useSelector((state) => state);
  console.log(saveordereduserData, "ordereddddddddd");

  const orderState = useSelector((state) => state.order);
  const isLoading = orderState.isLoading || false;
  const error = orderState.error || null;

  const isLoadingOrder = orderState.isLoading || false;
  const errorOrder = orderState.error || null;

  const handleSubmit = (values, { resetForm }) => {
    dispatch(createOrderedUserProduct(values));
    setIsSubmitSuccess(true);

    setTimeout(() => {
      setIsSubmitSuccess(false);
      resetForm();
    }, 3000);
  };
  return (
    <>
      <section className="px-[80px] ">
        <div className="flex flex-col xl:flex-row gap-[2rem] relative top-14 items-center lg:items-start ">
          <div className="xl:flex-[1.5] w-[100%] lg:w-[760px] xl:w-[unset]">
            {cartitems.length === 0 ? (
              <div className="text-center text-gray-500">
                No items in the cart.
              </div>
            ) : (
              cartitems.map((element) => (
                <div
                  className="bg-[#FBFBFB] shadow-xl rounded mb-[2rem] h-[234px]"
                  key={element._id}
                >
                  <div className="py-8 px-10 flex">
                    <div className="lg:w-[525px] flex">
                      <img
                        src={element.imageUrl}
                        alt=""
                        className="w-[82.35px] h-[78.35px]"
                      />
                      <div className="flex flex-col pl-8">
                        <p>{element.brand}</p>
                        <div className="flex flex-row">
                          <p className="pr-2">{element.price} Rs </p>
                          <p className="pr-2"> x {element.quantity} </p>
                          <p>= {element.price * element.quantity} Rs</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <AddRemoveQuantity
                        product={element}
                        increaseQuantity={() =>
                          dispatch(increaseQuantity(element._id))
                        }
                        decreaseQuantity={() =>
                          dispatch(decreaseQuantity(element._id))
                        }
                        quantityInCart={element.quantity}
                      />
                      <img
                        src="./images/delete.svg"
                        alt="del"
                        className="w-[16.47px] h-[17.63px] self-center my-[1rem] cursor-pointer"
                        onClick={() => {
                          console.log(element, "elementer");
                          dispatch(removeFromCart(element._id));
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* <div className=" xl:flex-[1.5] w-[100%] lg:w-[760px] xl:w-[unset] ">
            
            {cartitems?.map((element) => (
              <div
                className="bg-[#FBFBFB] shadow-xl rounded mb-[2rem] h-[234px]"
                key={element._id}
              >
                <div className=" py-8 px-10 flex">
                  <div className="lg:w-[525px] flex ">
                    <img
                      src={element.imageUrl}
                      alt=""
                      className="w-[82.35px] h-[78.35px]"
                    />
                    <div className="flex flex-col pl-8">
                      <p>{element.brand}</p>
                      <div className="flex flex-row">
                        <p className=" pr-2">{element.price} Rs </p>
                        <p className="pr-2"> x {element.quantity} </p>
                        <p>= {element.price * element.quantity} Rs</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <AddRemoveQuantity
                      product={element}
                      increaseQuantity={() =>
                        dispatch(increaseQuantity(element._id))
                      }
                      decreaseQuantity={() =>
                        dispatch(decreaseQuantity(element._id))
                      }
                      quantityInCart={element.quantity}
                    />
                    <img
                      src="./images/delete.svg"
                      alt="del"
                      className="w-[16.47px] h-[17.63px] self-center my-[1rem] cursor-pointer"
                      onClick={() => {
                        console.log(element, "elementer");
                        dispatch(removeFromCart(element._id));
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          <div className=" w-[100%] lg:w-[760px] xl:w-[unset] flex-[1.5] xl:flex-1 ">
            <div className="p-8 bg-[#FBFBFB] shadow-xl rounded">
              <Formik
                initialValues={{
                  fullName: "",
                  contact: "",
                  city: "",
                  state: "",
                  streetAddress: "",
                }}
                validationSchema={orderSchema}
                onSubmit={handleSubmit}
              >
                <Form className="w-[100%]">
                  <label
                    className="block text-gray-700 text-sm font-bold pt-2 pb-1"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <Field
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    id="fullName"
                    name="fullName"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <label
                    className="block text-gray-700 text-sm font-bold pt-2 pb-1"
                    htmlFor="contact"
                  >
                    Phone Number
                  </label>
                  <Field
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    id="contact"
                    name="contact"
                  />
                  <ErrorMessage
                    name="contact"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <label
                    className="block text-gray-700 text-sm font-bold pt-2 pb-1"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <Field
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    id="city"
                    name="city"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <label
                    className="block text-gray-700 text-sm font-bold pt-2 pb-1"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <Field
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    id="state"
                    name="state"
                  />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <label
                    className="block text-gray-700 text-sm font-bold pt-2 pb-1"
                    htmlFor="streetAddress"
                  >
                    Street Address
                  </label>
                  <Field
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    id="streetAddress"
                    name="streetAddress"
                  />
                  <ErrorMessage
                    name="streetAddress"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <div className="mt-8">
                    <button
                      type="submit"
                      className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "User Info"}
                    </button>
                    {isSubmitSuccess && (
                      <div className="text-green-500 mt-2">
                        User information submitted successfully!
                      </div>
                    )}
                  </div>
                </Form>
              </Formik>
              {error && <div className="text-red-500">{error}</div>}
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 w-full rounded mt-4 hover:bg-blue-600"
                disabled={isLoadingOrder}
                onClick={() => {
                  const formattedCartItems = cartitems.map((cartData) => ({
                    productId: {
                      productName: cartData.brand,
                      imageUrl: cartData.imageUrl,
                      price: cartData.price,
                    },
                    quantity: cartData.quantity,
                  }));
                  dispatch(sendPayment(formattedCartItems));
                }}
              >
                {isLoadingOrder ? "Processing Payment..." : "Checkout"}
              </button>

              {errorOrder && <div className="text-red-500">{errorOrder}</div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StorePage;
