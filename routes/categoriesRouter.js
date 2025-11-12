const express = require("express");

const service = require('../services/categoriesService');

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Obtiene una lista de categorías
 *     description: Devuelve todas las categorías registradas.
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida correctamente
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
 *                   categoryName:
 *                     type: string
 *                     example: "Electrónica"
 *                   description:
 *                     type: string
 *                     example: "Dispositivos electrónicos y gadgets"
 *                   active:
 *                      type: boolean
 *                      example: true
 */
router.get("/", async (req, res) => {
  const categories = await service.getAll();
  res.json(categories);
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Obtiene una categoría por su ID
 *     description: Devuelve la información detallada de una categoría específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a obtener
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       200:
 *         description: Categoría obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 categoryName:
 *                   type: string
 *                   example: "Electrónica"
 *                 description:
 *                   type: string
 *                   example: "Dispositivos electrónicos y gadgets"
 *                 active:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: No hay categoria registrada con ese id
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const category = await service.getById(id);
  res.json(category);
});

/**
 * @swagger
 * /categories:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Crea una nueva categoría
 *     description: Agrega una categoría con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryName
 *               - description
 *               - active
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: "Electrónica"
 *               description:
 *                 type: string
 *                 example: "Dispositivos electrónicos y gadgets"
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "created"
 *                 data:
 *                   type: object
 *                   properties:
 *                     categoryName:
 *                       type: string
 *                       example: "Electrónica"
 *                     description:
 *                       type: string
 *                       example: "Dispositivos electrónicos y gadgets"
 *                     active:
 *                       type: boolean
 *                       example: true
 */
router.post('/', async (req, res) => {
  const { categoryName, description, active } = req.body;
  const newCategory = await service.create(categoryName, description, active);
  res.status(201).json({
    message: 'created',
    data: newCategory
  });
});

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     tags:
 *       - Categories
 *     summary: Actualiza una categoría existente
 *     description: Modifica los datos de una categoría identificada por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: "Electrónica"
 *               description:
 *                 type: string
 *                 example: "Dispositivos electrónicos y gadgets"
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "updated"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 3
 *                     categoryName:
 *                       type: string
 *                       example: "Electrónica"
 *                     description:
 *                       type: string
 *                       example: "Dispositivos electrónicos y gadgets"
 *                     active:
 *                       type: boolean
 *                       example: true
 *       500:
 *         description: Categoría no encontrada
 */
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const category = await service.update(id, changes);
  res.json({
    message: 'updated',
    data: category
  });
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Elimina una categoría
 *     description: Elimina una categoría existente identificada por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría a eliminar
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Categoría eliminada correctamente"
 *       500:
 *         description: Categoría no encontrada
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const categoryDelete = await service.delete(id);
  return res.json({
    message: categoryDelete
  });
});

module.exports = router;
