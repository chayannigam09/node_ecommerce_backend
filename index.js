const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require('./middlewares/errHandler');
const app = express()
const dotenv = require('dotenv').config();
const PORT = process.env.PORT||4000;
const authRouter = require("./routes/authroute")
const productRouter = require("./routes/productRoute")
const blogRouter = require("./routes/blogRoute")
const catagoryRouter = require("./routes/prodCatagoryRoute")
const blogCatagoryRouter = require("./routes/blogCatagoryRoute")
const brandRouter = require("./routes/brandRoute")
const coupunRouter = require("./routes/coupunRoute")
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
dbConnect();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());
app.use("/api/user",authRouter);
app.use("/api/product",productRouter);
app.use("/api/blog",blogRouter);
app.use("/api/catagory",catagoryRouter);
app.use("/api/blogcatagory",blogCatagoryRouter);
app.use("/api/brand",brandRouter);
app.use("/api/coupun",coupunRouter);

app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, ()=>{
    console.log('server running at',PORT);
})