const express = require("express");

const service = require('../services/productsService');

const router = express.Router();

router.get("/", (req, res) => {
  const products = service.getAll();
  res.json(products);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = service.getById(id);
  res.json(product);
});

router.get("/category/:id", (req, res) => {
  const { id } = req.params;
  const productsByCategory = service.getProductsByCategoryId(id);
  res.json(productsByCategory);
});

router.get("/brand/:id", (req, res) => {
  const { id } = req.params;
  const productByBrand = service.getProductsByBrandId(id);
  res.json(productByBrand);
});

router.post('/', (req, res) => {
  const { image, productName, description, price, stock, categoryId, brandId } = req.body;
  const newProduct = service.create(image, productName, description, price, stock, categoryId, brandId);
  res.status(201).json({
    message: newProduct
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { image, productName, description, price, stock, categoryId, brandId } = req.body;
  const product = service.update(id, image, productName, description, price, stock, categoryId, brandId);
  res.json({
    message: product
  });
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const productDelete = service.delete(id);
  return res.json({
    message: productDelete
  });
});


module.exports = router;
