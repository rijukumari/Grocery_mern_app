import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, offerPrice, category } = req.body;
    const image = req.files?.map((file) => file.filename);

    if (
      !name ||
      !description ||
      !price ||
      !offerPrice ||
      !category ||
      !image.length === 0
    ) {
      return res
        .status(201)
        .json({ message: "Product added successfully", success: false });
    }
    await Product.create({
      name,
      description,
      price,
      offerPrice,
      category,
      image
    });
    res
      .status(201)
      .json({ message: "Product added successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error ", error: error.message });
  }
};

// export const addProduct = async (req, res) => {
//   try {
//     const { name, description, price, offerPrice, category } = req.body;

//     const image = req.file?.filename ? [req.file.filename] : [];

//     if (
//       !name ||
//       !description ||
//       !price ||
//       !offerPrice ||
//       !category ||
//       image.length === 0
//     ) {
//       return res
//         .status(400)
//         .json({ message: "All fields are required", success: false });
//     }

//     await Product.create({
//       name,
//       description,
//       price,
//       offerPrice,
//       category,
//       image
//     });

//     res
//       .status(201)
//       .json({ message: "Product added successfully", success: true });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


// getProducts

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createAt: -1 });
    res.status(200).json({ products, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get single products

export const getProductById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// change stock
export const changeStock = async (req, res) => {
  try {
    const { id,inStock} = req.body;
    console.log("📦 req.body:", req.body);

    const product = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true }
    );
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }
    res
      .status(200)
      .json({ product, success: true, message: "Stock updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
