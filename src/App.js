import React from "react";
// import Posts from "./posts/posts";
import Products from "./Products/Products";
import CartItems from "./CartItem/CartItem";
import { Routes, Route } from "react-router-dom";
import CartItem from "./CartItem/CartItem";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Products />}></Route>
        <Route path="/cartItem" element={<CartItem />}></Route>
        <Route path="*" element={<h1>Page Not Found</h1>}></Route>
      </Routes>
    </>
  );
}

export default App;
