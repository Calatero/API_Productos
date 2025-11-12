const express = require("express");

const service = require('../services/productsService');

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtiene una lista de productos
 *     responses:
 *       200:
 *         description: Lista de productos generados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   image:
 *                     type: string
 *                     example: "https://example.com/product.jpg"
 *                   productName:
 *                     type: string
 *                     example: "Incredible Soft Shirt"
 *                   description:
 *                     type: string
 *                     example: "A wonderful cotton shirt with premium texture."
 *                   price:
 *                     type: number
 *                     example: 299
 *                   stock:
 *                     type: integer
 *                     example: 42
 *                   categoryId:
 *                     type: integer
 *                     example: 3
 *                   brandId:
 *                     type: integer
 *                     example: 7
 */
router.get("/", async (req, res) => {
  const products = await service.getAll();
  res.json(products);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtiene un producto por su ID
 *     description: Retorna la información detallada de un producto específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a consultar
 *     responses:
 *       200:
 *         description: Producto encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 5
 *                 image:
 *                   type: string
 *                   example: "https://example.com/product.jpg"
 *                 productName:
 *                   type: string
 *                   example: "Fantastic Steel Gloves"
 *                 description:
 *                   type: string
 *                   example: "Durable steel gloves with ergonomic fit."
 *                 price:
 *                   type: number
 *                   example: 1299
 *                 stock:
 *                   type: integer
 *                   example: 60
 *                 categoryId:
 *                   type: integer
 *                   example: 4
 *                 brandId:
 *                   type: integer
 *                   example: 8
 *       500:
 *         description: No hay producto con ese id
 */
router.get("/:id", async (req, res, next) => {
  try{
    const { id } = req.params;
    const product = await service.getById(id);
    res.json(product);
  }catch(error){
    next(error);
  }
});

/**
 * @swagger
 * /products/category/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtiene productos por categoría
 *     description: Retorna una lista de productos que pertenecen a una categoría específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Lista de productos filtrados por categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 12
 *                   image:
 *                     type: string
 *                     example: "https://example.com/product.jpg"
 *                   productName:
 *                     type: string
 *                     example: "Incredible Wooden Table"
 *                   description:
 *                     type: string
 *                     example: "Stylish wooden table with modern design."
 *                   price:
 *                     type: number
 *                     example: 899
 *                   stock:
 *                     type: integer
 *                     example: 22
 *                   categoryId:
 *                     type: integer
 *                     example: 3
 *                   brandId:
 *                     type: integer
 *                     example: 5
 *       500:
 *         description: No se encontraron productos para esa categoría
 */
router.get("/category/:id", async (req, res) => {
  const { id } = req.params;
  const productsByCategory = await service.getProductsByCategoryId(id);
  res.json(productsByCategory);
});

/**
 * @swagger
 * /products/brand/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtiene productos por marca
 *     description: Retorna una lista de productos que pertenecen a una marca específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca
 *     responses:
 *       200:
 *         description: Lista de productos filtrados por marca
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 25
 *                   image:
 *                     type: string
 *                     example: "https://example.com/product.jpg"
 *                   productName:
 *                     type: string
 *                     example: "Awesome Granite Keyboard"
 *                   description:
 *                     type: string
 *                     example: "A stylish and durable keyboard from premium brand."
 *                   price:
 *                     type: number
 *                     example: 599
 *                   stock:
 *                     type: integer
 *                     example: 50
 *                   categoryId:
 *                     type: string
 *                     example: 2
 *                   brandId:
 *                     type: string
 *                     example: 7
 *       500:
 *         description: No se encontraron productos para esa marca
 */
router.get("/brand/:id", async (req, res) => {
  const { id } = req.params;
  const productByBrand = await service.getProductsByBrandId(id);
  res.json(productByBrand);
});

/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Crea un nuevo producto
 *     description: Agrega un nuevo producto con la estructura de datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 example: "https://example.com/product.jpg"
 *               productName:
 *                 type: string
 *                 example: "Ergonomic Wooden Chair"
 *               description:
 *                 type: string
 *                 example: "A comfortable chair with a modern design."
 *               price:
 *                 type: number
 *                 example: 499
 *               stock:
 *                 type: integer
 *                 example: 15
 *               categoryId:
 *                 type: string
 *                 example: 2
 *               brandId:
 *                 type: string
 *                 example: 4
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 */
router.post('/', async (req, res) => {
  const { image, productName, description, price, stock, categoryId, brandId } = req.body;
  const newProduct = await service.create(image, productName, description, price, stock, categoryId, brandId);
  res.status(201).json({
    message: newProduct
  });
});

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     tags:
 *       - Products
 *     summary: Actualiza un producto existente
 *     description: Modifica los datos de un producto identificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 example: "https://example.com/product-updated.jpg"
 *               productName:
 *                 type: string
 *                 example: "Updated Product Name"
 *               description:
 *                 type: string
 *                 example: "Updated product description with new details."
 *               price:
 *                 type: number
 *                 example: 799
 *               stock:
 *                 type: integer
 *                 example: 25
 *               categoryId:
 *                 type: integer
 *                 example: 3
 *               brandId:
 *                 type: integer
 *                 example: 6
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente O No existe una marca registrada con ese id o No existe una categoria registrada con ese id
 *       500:
 *         description: Producto no encontrado
 */
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const product = await service.update(id, changes);
  res.json({
    message: product
  });
});

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *    tags:
 *      - Products
 *    summary: Elimina un producto por ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del producto
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: producto Eliminado
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const productDelete = await service.delete(id);
  return res.json({
    message: productDelete
  });
});


module.exports = router;
