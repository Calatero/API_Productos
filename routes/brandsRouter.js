const express = require("express");
const service = require('../services/brandsService');
const router = express.Router();

/**
 * @swagger
 * /brands:
 *   get:
 *     tags:
 *       - Brands
 *     summary: Obtiene una lista de marcas
 *     description: Devuelve todas las marcas disponibles.
 *     responses:
 *       200:
 *         description: Lista de marcas obtenida correctamente
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
 *                   brandName:
 *                     type: string
 *                     example: "Samsung"
 *                   description:
 *                     type: string
 *                     example: "Marca de electrónicos y dispositivos móviles"
 *                   active:
 *                     type: boolean
 *                     example: true
 */
router.get("/", async (req, res) => {
  const brands = await service.getAll();
  res.json(brands);
});

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     tags:
 *       - Brands
 *     summary: Obtiene una marca por su ID
 *     description: Devuelve la información detallada de una marca específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la marca
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       200:
 *         description: Marca obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 brandName:
 *                   type: string
 *                   example: "Samsung"
 *                 description:
 *                   type: string
 *                   example: "Marca de electrónicos y dispositivos móviles"
 *                 active:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: No hay marca registrada con ese id
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const brand = await service.getById(id);
  res.json(brand);
});

/**
 * @swagger
 * /brands:
 *   post:
 *     tags:
 *       - Brands
 *     summary: Crea una nueva marca
 *     description: Agrega una marca con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brandName
 *               - description
 *               - active
 *             properties:
 *               brandName:
 *                 type: string
 *                 example: "Samsung"
 *               description:
 *                 type: string
 *                 example: "Marca de electrónicos y dispositivos móviles"
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Marca creada exitosamente
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
 *                     brandName:
 *                       type: string
 *                       example: "Samsung"
 *                     description:
 *                       type: string
 *                       example: "Marca de electrónicos y dispositivos móviles"
 *                     active:
 *                       type: boolean
 *                       example: true
 */
router.post('/', async (req, res) => {
  const { brandName, description, active } = req.body;
  const newBrand = await service.create(brandName, description, active);
  res.status(201).json({
    message: 'created',
    data: newBrand
  });
});

/**
 * @swagger
 * /brands/{id}:
 *   patch:
 *     tags:
 *       - Brands
 *     summary: Actualiza una marca existente
 *     description: Modifica los datos de una marca identificada por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *                 example: "Samsung"
 *               description:
 *                 type: string
 *                 example: "Marca de electrónicos y dispositivos móviles"
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Marca actualizada exitosamente
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
 *                     brandName:
 *                       type: string
 *                       example: "Samsung"
 *                     description:
 *                       type: string
 *                       example: "Marca de electrónicos y dispositivos móviles"
 *                     active:
 *                       type: boolean
 *                       example: true
 *       500:
 *         description: Brand Not Found
 */
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const brand = await service.update(id, changes);
  res.json({
    message: 'updated',
    data: brand
  });
});

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     tags:
 *       - Brands
 *     summary: Elimina una marca
 *     description: Elimina una marca existente identificada por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca a eliminar
 *     responses:
 *       200:
 *         description: Marca eliminada o No puede eliminar esta marca porque tiene productos asociados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Marca eliminada"
 *       500:
 *         description: Brand Not Found
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const brandDelete = await service.delete(id);
  return res.json({
    message: brandDelete
  });
});

module.exports = router;
