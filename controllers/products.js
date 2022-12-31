const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  // const myData = await Product.find({});
  // res.status(200).json({ myData });

  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (featured) {
    queryObject.featured = featured;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  // (select = name company;
  if (select) {
    // let selectFix = select.replace(",", " ");
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;

  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);

  // console.log(queryObject);

  const myData = await apiData;
  res.status(200).json({ myData, nbHits: myData.length });
};

const getAllProductsTesting = async (req, res) => {
  //1 res.status(200).json({ msg: "I am getAllProductsTesting" });

  //2 const myData = await Product.find(req.query);

  //3
  const myData = await Product.find(req.query).sort("name"); // for ascending
  // const myData = await Product.find(req.query).sort("-name"); // for descending

  res.status(200).json({ myData });
};

module.exports = { getAllProducts, getAllProductsTesting };
