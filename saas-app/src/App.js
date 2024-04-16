import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ProductsPage from "./components/Products";
import CreateProduct from "./components/CreateProduct";
import Signin from "./components/Signin";
import Home from "./components/Home";
import Signup from "./components/Signup";
function App() {
  return (
    <div className="bg-cont">
      <HashRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home/*" element={<Home />} />

          {/* <Route exact path="/dashboard" element={<Dashboard />} />

          <Route exact path="/" element={<Signup />} />

          <Route path="/products" element={<ProductsPage />} />
          <Route path="/createproduct" element={<CreateProduct />} /> */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
