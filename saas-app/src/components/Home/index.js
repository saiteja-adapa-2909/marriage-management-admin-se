import React from "react";
import Navbar from "../Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkToken from "../../Middleware";
import Dashboard from "../Dashboard";
import ProductsPage from "../Products";
import CreateProduct from "../CreateProduct";
import OrdersPage from "../Orders";
import { Routes, Route } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    // Use the middleware function to check the token
    const isAuthenticated = checkToken();
    if (!isAuthenticated) {
      // Redirect or handle unauthorized access
      // For example, redirect to the login page
      console.log("not authenticated");
      navigate("/");
    } else {
      console.log("User authenticated");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/createproduct" element={<CreateProduct />} />
      </Routes>
    </div>
  );
}
export default Home;
