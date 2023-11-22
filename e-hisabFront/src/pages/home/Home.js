import React, { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import styles from "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../redux/slices/productsSlice";
import ProductCard from "../../components/ProductCard";
import getCurrentUserData from "../../Utils/FetchCurrentUserData";

const Home = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const userData = getCurrentUserData();

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [localProducts, setLocalProducts] = useState([]);
  // const [categories, setCategory] = useState("");
  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(0);
  // const [localProducts, setLocalProducts] = useState(products);

  const handleProductSearch = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
  };

  const handleCategorySearch = (e) => {
    const category = e.target.value;
    setCategory(category);
  };

  // Dispatch searchProducts when either searchQuery or category changes
  useEffect(() => {
    dispatch(searchProducts({ searchQuery, category }));
  }, [searchQuery, category, dispatch]);

  // Update localProducts once the products state is populated
  useEffect(() => {
    if (products && products.length > 0) {
      setLocalProducts(products);
    }
  }, [products]);

  // const handlePriceSearch = () => {
  //   dispatch(searchByPriceRange(minPrice, maxPrice));
  // };
  return (
    <>
      <section className="">
        <div className="home-banner" />
        <div className="flex flex-col lg:flex-row justify-between w-auto md:w-[776px] lg:w-[850px] xl:w-[1015px] mx-auto py-12 ">
          <SearchInput
            placeholder="Search Bar"
            showIcon={true}
            value={searchQuery}
            onChange={handleProductSearch}
          />
          <SearchInput
            placeholder="Categories"
            showIcon={true}
            value={category}
            onChange={handleCategorySearch}
          />
          {/* <SearchInput
            placeholder="Min Price - Max Price"
            showIcon={true}
            value={`${minPrice} - ${maxPrice}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split(" - ");
              setMinPrice(min);
              setMaxPrice(max);
            }}
            onSearch={handlePriceSearch}
          /> */}
        </div>
        <div className="flex flex-wrap md:w-[776px] lg:w-[850px] xl:w-[1015px] mx-auto py-12 ">
          {localProducts.length > 0 ? (
            localProducts?.map((product) => {
              return (
                <div
                  key={product._id}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-[33.3%] px-4 mb-4"
                >
                  <ProductCard product={product} />
                </div>
              );
            })
          ) : (
            <h1 className="text-center">No Results Found</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
