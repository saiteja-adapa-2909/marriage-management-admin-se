const express = require("express");
const mysql = require("mysql");
const route = express.Router();
// const OpenAIApi = require("openai");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const corsOptions = {
  // origin: "https://wk4h5tms-3000.inc1.devtunnels.ms",
  origin: "https://marriage-management-admin-f1kpaxw01-saiteja-adapas-projects.vercel.app/",

  credentials: true,
};

app.use(cors(corsOptions));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Saiteja2909",
  database: "saas_app",
});

app.get("/", (req, res) => {
  res.json("HEY IN PORT $))))))LOLLLLL");
});

app.get("/checkemail/:email", async (req, res) => {
  const email = req.params.email;
  const q = "SELECT * FROM saas_app.designer WHERE designer_email = ?";
  db.query(q, [email], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/designerdetails", async (req, res) => {
  const q = "SELECT * FROM saas_app.designer";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/onedesignerdetails/:designerid", async (req, res) => {
  const designerid = req.params.designerid;
  console.log(designerid);
  const q = "SELECT * FROM saas_app.designer WHERE designer_id = ?";
  db.query(q, [designerid], (err, data) => {
    if (err) {
      console.error(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/createdesigner", async (req, res) => {
  const { image, fname, lname, phone, email, dob, ad1, ad2, city, pincode } =
    req.body;
  const q =
    "INSERT INTO saas_app.designer (designer_firstname, designer_lastname, designer_email, designer_phone, designer_dob, designer_addressline1, designer_addressline2, designer_city, designer_pincode,designer_image) VALUES (?)";
  const values = [
    fname,
    lname,
    email,
    phone,
    dob,
    ad1,
    ad2,
    city,
    pincode,
    image,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/productdetails", async (req, res) => {
  const q = "SELECT * FROM saas_app.product";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/productdetails/:designerid", async (req, res) => {
  const designerid = req.params.designerid;
  const q = "SELECT * FROM saas_app.product WHERE designer_id = ?";
  db.query(q, [designerid], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/createproduct", async (req, res) => {
  const { designerid, name, desc, price, archive, image, category } = req.body;

  const q =
    "INSERT INTO saas_app.product (designer_id, product_name, product_desc, product_price, product_archive, product_image, product_category) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [designerid, name, desc, price, archive, image, category];
  console.log(values);

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/customerdetails", async (req, res) => {
  const q = "SELECT * FROM saas_app.customer";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/createcustomer", async (req, res) => {
  const { fname, lname, phone } = req.body;
  const q =
    "INSERT INTO saas_app.customer (customer_firstname, customer_lastname, customer_phone) VALUES (?)";
  const values = [fname, lname, phone];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/orderdetails/:designerid", async (req, res) => {
  const designerid = req.params.designerid;

  const q = `
  SELECT o.*, p.product_name, p.product_desc, p.product_price ,p.product_image
  FROM saas_app.order o
  JOIN saas_app.product p ON o.product_id = p.product_id
  WHERE p.designer_id = ?;  
  `;
  db.query(q, [designerid], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/orderdetails", async (req, res) => {
  const q = "SELECT * FROM saas_app.order";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/createorder", async (req, res) => {
  const { customerid, productid, price } = req.body;
  const q =
    "INSERT INTO saas_app.order (customer_id, product_id, order_price) VALUES (?)";
  const values = [customerid, productid, price];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(4000, () => {
  console.log("Running on 4000 yay");
});
