import pkg from 'body-parser';
const { json, urlencoded } = pkg;
import express from 'express';
import dbConnect from "./config/dbConnect.js";
import { notFound, errorHandler } from './middlewares/errHandler.js';
const app = express()
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
const PORT = process.env.PORT||4000;
import authRouter from "./routes/authroute.js";
import productRouter from "./routes/productRoute.js";
import blogRouter from "./routes/blogRoute.js";
import catagoryRouter from "./routes/prodCatagoryRoute.js";
import blogCatagoryRouter from "./routes/blogCatagoryRoute.js";
import brandRouter from "./routes/brandRoute.js";
import coupunRouter from "./routes/coupunRoute.js";
import cookieParser from 'cookie-parser';
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert { type: 'json' };
dbConnect();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    if (req.method === 'OPTIONS') {
      res.sendStatus(200); // Respond to preflight requests
    } else {
      next();
    }
  });
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({extended:false}))
app.use(cookieParser());

app.use("/api/user",authRouter);
app.use("/api/product",productRouter);
app.use("/api/blog",blogRouter);
app.use("/api/catagory",catagoryRouter);
app.use("/api/blogcatagory",blogCatagoryRouter);
app.use("/api/brand",brandRouter);
app.use("/api/coupun",coupunRouter);

app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/", (req, res) => {
  const htmlContent = `
  <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <h1>Server Running</h1>
  </div>
`;
  res.send(htmlContent);
});
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, ()=>{
    console.log('server running at',PORT);
})