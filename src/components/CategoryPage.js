import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Product from "./Product";
import Pagination from "./Pagination";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { categoryName } = useParams();

  const removeProduct = (id, category) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, category } });
  };

  const products = useSelector((state) =>
    state.productsData.products[categoryName].filter(
      (p) => p.category === categoryName
    )
  );
  const currentPage = useSelector((state) => state.productsData.currentPage);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch({ type: "SET_CURRENT_CATEGORY", payload: categoryName });
  }, [categoryName, dispatch]);

  useEffect(() => {
    if (currentItems.length === 0 && currentPage > 1) {
      dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage - 1 });
    }
  }, [currentItems, currentPage, dispatch]);

  return (
    <div className="wrapper">
      <div className="product-list">
        {currentItems.map((product) => (
          <Product
            key={product.id}
            product={product}
            removeProduct={removeProduct}
          />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={products.length}
        currentPage={currentPage}
      />
    </div>
  );
};

export default CategoryPage;
