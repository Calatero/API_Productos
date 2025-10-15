const express = require("express");

const service = require('../services/brandsService');

const router = express.Router();

router.get("/", (req, res) => {
  const brands = service.getAll();
  res.json(brands);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const brand = service.getById(id);
  res.json(brand);
});

router.post('/', (req, res) => {
  const { brandName, description, active } = req.body;
  const newBrand = service.create(brandName, description, active);
  res.status(201).json({
    message: 'created',
    data: newBrand
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { brandName, description, active } = req.body;
  const brand = service.update(id, brandName, description, active);
  res.json({
    message: 'updated',
    data: brand
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const brandDelete = service.delete(id);
  return res.json({
    message: brandDelete
  });
});

module.exports = router;
