// const Product = require("../models/Product");
// const { validationResult } = require("express-validator");

// // Get all products
// exports.getallProduct = async (req, res) => {
//   try {
//     const result = await Product.find();
//     res.status(200).json({ message: "Products fetched successfully", result });
//   } catch (error) {
//     res.status(500).json({ message: error.message || "Something went wrong" });
//   }
// };

// // Add product
// exports.addProduct = async (req, res) => {
//   // Validation check  errors
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   try {
//     const product = new Product(req.body);
//     const savedProduct = await product.save();
//     res
//       .status(201)
//       .json({ message: "Product added successfully", savedProduct });
//   } catch (err) {
//     res.status(400).json({ message: err.message || "Something went wrong" });
//   }
// };

// // Update product
// exports.updateProduct = async (req, res) => {
//   console.log("Received productid:", req.params.productid);
//   try {
//     const { productid } = req.params;
//     const updateproduct = await Product.findByIdAndUpdate(productid, req.body, {
//       new: true,
//     });

//     if (!updateproduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "Product updated successfully", updateproduct });
//   } catch (err) {
//     res.status(500).json({ message: err.message || "Something went wrong" });
//   }
// };

// // Delete product
// exports.deleteProduct = async (req, res) => {
//   try {
//     const { productid } = req.params;
//     const deleteproduct = await Product.findByIdAndDelete(productid);

//     if (!deleteproduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "Product deleted successfully", deleteproduct });
//   } catch (err) {
//     res.status(500).json({ message: err.message || "Something went wrong" });
//   }
// };

const Product = require("../models/Product");
const { validationResult } = require("express-validator");

// Get all products
exports.getallProduct = async (req, res) => {
  try {
    const result = await Product.find();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Add product (with image upload)
exports.addProduct = async (req, res) => {
  try {
    // Validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const { name, description, category, sizes } = req.body;

    const product = new Product({
      name,
      description,
      category,
      sizes: sizes ? JSON.parse(sizes) : [],
      image: req.file.path,
    });

    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      result: savedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

// Update product (with optional image upload)
exports.updateProduct = async (req, res) => {
  try {
    const { productid } = req.params;
    const updateData = { ...req.body };

    // Optional image
    if (req.file) {
      updateData.image = req.file.path;
    }

    // Parse sizes if present
    if (updateData.sizes) {
      updateData.sizes = JSON.parse(updateData.sizes);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productid,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      result: updatedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { productid } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productid);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      result: deletedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};
