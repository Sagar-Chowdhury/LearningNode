const Product = require("./models/product");
const connectToMongoDb = require("./connection");
const products = require("./products.json");
require("dotenv").config();

async function connectAndPopulate() {
  try {
    connectToMongoDb(process.env.DATABASE_URL);
    await Product.deleteMany();
    await Product.create(products);
    console.log(" Success!!! ");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

connectAndPopulate();
