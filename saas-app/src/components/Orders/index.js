import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkToken from "../../Middleware";
import { v4 as uuidv4 } from "uuid";
// import Createorder from "../Createorder";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { getDesignerOrders } from "../../reduxstore/dataslice";

const OrdersPage = () => {
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
  const allorders = useSelector((state) => state.app.orders);
  const loading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();
  const [orders,setOrders] = useState(allorders);

  useEffect(() => {
    console.log("Dispatching getDesignerData");
    dispatch(getDesignerOrders());
  }, [dispatch]);
  console.log(orders);
  //   const updateState = () => {
  //     console.log("Update state called");
  //   };
  const handleSearch = (e) => {
    const search = e.target.value;
    setOrders(
      allorders.filter((order) => {
        return order.product_name.toLowerCase().includes(search) || order.product_category.toLowerCase().includes(search);
      })
    );
    console.log(orders);
  };
  return (
    <div>
      <div className="d-flex flex-row ">
        <div className="dashboard-header">
          <h1 className="head-style d-flex flex-row">
            Orders ({loading ? (<div className="numloader"></div>) : orders.length})
          </h1>
          <p>Manage orders for your store</p>
        </div>
        {/* <div className="d-flex flex-column justify-content-center add-button-style">
          <button
            type="button"
            className="btn btn-dark text-light border-0 cp-button-style"
            // onClick={}
          >
            + Add New
          </button>
        </div> */}
      </div>
      <hr className="hr-style" />
      <div>
        <div className="d-flex">
          <input
            className="form-control search-button-style me-2"
            type="search"
            placeholder="Search orders"
            aria-label="Search"
            onChange = {(e)=> handleSearch(e)}
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
            {orders.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Order ID</th>
                    <th>Product ID</th>
                    <th>Name</th>

                    <th>Product Price</th>
                    <th>Order Price</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.order_id}>
                      <td>
                        <img
                          src={order.product_image}
                          alt={`sample_${order.order_id}`}
                          width="60"
                          height="60"
                        />
                      </td>
                      <td>{order.order_id}</td>
                      <td>{order.product_id}</td>
                      <td>{order.product_name}</td>
                      <td>{order.product_price}</td>
                      <td>{order.order_price}</td>
                      <td>{order.order_timestamp.substring(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-states">No orders available.</p>
            )}
          </>
        )}

      </div>
   
    </div>
  );
};

export default OrdersPage;
