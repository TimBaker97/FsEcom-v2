import express from "express"; // using es module syntax
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 5000;

connectDB(); // this connects us to the db config

const app = express();

// Body parser middleware so that our api requets can utilise the email and password user data from the mongoDB
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie-parser middleware. This lets us use request.cookies
app.use(cookieParser());

// This runs the API
app.get("/", (req, res) => {
  res.send("API is running...");
});

// When we hit this route, of /api/products we the go to productRoutes
app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

// // This get method returns all the prodcus in json form on loacalhost:5000/api/products
// app.get("/api/products", (req, res) => {
//   res.json(products);
// });

// // This get method returns a single product defined by its ID
// app.get("/api/products/:id", (req, res) => {
//   const product = products.find((prod) => prod._id === req.params.id);
//   res.json(product);
// });

// We can use our own errors

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
