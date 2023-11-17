import React from "react";

const Product = ({ product, removeProduct }) => (
  <div className="product">
    <h3>{product.name}</h3>
    <button onClick={() => removeProduct(product.id, product.category)}>
      Удалить
    </button>
  </div>
);

export default Product;
