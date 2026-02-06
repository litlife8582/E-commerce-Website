import Product from "../models/Product.js";

// @desc    Get all products (Search + Pagination)
// @route   GET /api/products?keyword=...&page=...
export const getAllProducts = async (req, res) => {
  try {
    const pageSize = 8; // Products per page
    const page = Number(req.query.page) || 1;

    // Search by Name (case insensitive)
    const keyword = req.query.keyword
      ? {
          Name: {
            $regex: req.query.keyword,//pattern recognition- partial matching of words
            $options: "i",//"i"-insensitive(case of letters do not matter)
          },
        }
      : {};//ternery operator- if yes constructs a specific filter object to match entries name or else searches the entire list

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product (Admin only)
// @route   POST /api/products
export const createProduct = async (req, res) => {
  try {
    // Destructure using your capitalized keys
    const {
      Name,
      Description,
      Price,
      Category,
      Brand,
      Stock,
      Image,
    } = req.body;

    const product = new Product({
      Name,
      Description,
      Price,
      Category,
      Brand,
      Stock,
      Image, // Expecting object like { url: "..." }
      Rating: 0,
      numReview: 0,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product (Admin only)
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const { Name, Description, Price, Category, Brand, Stock, Image } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.Name = Name || product.Name;
      product.Description = Description || product.Description;
      product.Price = Price || product.Price;
      product.Category = Category || product.Category;
      product.Brand = Brand || product.Brand;
      product.Stock = Stock || product.Stock;
      if (Image) product.Image = Image;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a product (Admin only)
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
