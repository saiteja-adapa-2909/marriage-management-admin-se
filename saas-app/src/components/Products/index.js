import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkToken from "../../Middleware";
// import CreateProduct from "../CreateProduct";
import "./index.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getDesignerData,
  getDesignerProducts,
} from "../../reduxstore/dataslice";

const ProductsPage = () => {
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
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const designerdata = useSelector((state) => state.app.designer);
  const allproducts = useSelector((state) => state.app.products);
  const loading = useSelector((state) => state.app.loading);
  const [products, setProducts] = useState(allproducts);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setProductNames(
  //     products.map((product) => {
  //       return product.product_name;
  //     })
  //   );
  //   setProductCat(
  //     products.map((product) => {
  //       return product.product_category;
  //     })
  //   );
  // }, []);

  useEffect(() => {
    console.log("Dispatching getDesignerData");
    dispatch(getDesignerData());
    dispatch(getDesignerProducts());
  }, [dispatch]);

  console.log(designerdata, "in products page lol");
  console.log(products, "products products page lol");

  const handleAddNew = () => {
    navigate("/home/createproduct");
  };
  const handleSearch = (e) => {
    const search = e.target.value;
    setProducts(
      allproducts.filter((product) => {
        return (
          product.product_name.toLowerCase().includes(search) ||
          product.product_category.toLowerCase().includes(search) ||
          product.product_desc.toLowerCase().includes(search)
        );
      })
    );
    console.log(products);
  };

  return (
    <div>
      <div className="d-flex flex-row ">
        <div className="dashboard-header">
          <h1 className="head-style d-flex flex-row">
            Products (
            {loading ? <div className="numloader"></div> : products.length})
          </h1>
          <p>Manage products for your store</p>
        </div>
        <div className="d-flex flex-column justify-content-center add-button-style">
          <button
            type="button"
            className="btn btn-dark text-light border-0 cp-button-style"
            onClick={handleAddNew}
          >
            + Add New
          </button>
        </div>
      </div>
      <hr className="hr-style" />
      <div>
        <div className="d-flex">
          <input
            className="form-control search-button-style me-2"
            type="search"
            placeholder="Search products"
            aria-label="Search"
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>
      <div>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <span className="text-center text-states loader"></span>
          </div>
        ) : (
          <>
            {products.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Archived</th>
                    <th>Product ID</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.product_id}>
                      <td>
                        <img
                          src={product.product_image}
                          alt={`sample_${product.product_id}`}
                          width="60"
                          height="60"
                        />
                      </td>
                      <td>{product.product_name}</td>
                      <td>{product.product_category}</td>
                      <td>{product.product_price}</td>
                      <td>{product.product_date.substring(0, 10)}</td>
                      <td>{product.product_archive}</td>
                      <td>{product.product_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-states">No products available.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
