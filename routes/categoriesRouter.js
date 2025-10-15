const express = require("express");

const service = require('../services/categoriesService');

const router = express.Router();

router.get("/", (req, res) => {
  const categories = service.getAll();
  res.json(categories);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const category = service.getById(id);
  res.json(category);
});

router.post('/', (req, res) => {
  const { categoryName, description, active } = req.body;
  const newCategory = service.create(categoryName, description, active);
  res.status(201).json({
    message: 'created',
    data: newCategory
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { categoryName, description, active } = req.body;
  const category = service.update(id, categoryName, description, active);
  res.json({
    message: 'updated',
    data: category
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const categoryDelete = service.delete(id);
  return res.json({
    message: categoryDelete
  });
  // const hasProducts = db.products.some(p => p.categoryId == id);
  // if (hasProducts) {
  //   return res.status(400).json({
  //     message: `No se puede eliminar la categoría con id ${id} porque tiene productos asociados`
  //   });
  // }
  // const categoryIndex = db.categories.findIndex(c => c.id == id);
  // if(categoryIndex !== -1){
  //   db.categories.splice(categoryIndex, 1);
  //   res.json({
  //     message: 'deleted',
  //     id
  //   });
  // }else{
  //   res.status(404).json({ message: 'Category Not Found' });
  // }
});

module.exports = router;
