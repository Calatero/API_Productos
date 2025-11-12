const express = require("express");

const service = require('../services/usersService');

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtiene una lista de usuarios
 *     description: Retorna todos los usuarios disponibles.
 *     responses:
 *       200:
 *         description: Lista de usuarios
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
 *                   name:
 *                     type: string
 *                     example: "Juan Pérez"
 *                   email:
 *                     type: string
 *                     example: "juan.perez@example.com"
 *                   isActive:
 *                     type: boolean
 *                     example: true
 */
router.get("/", async (req, res) =>{
  const users = await service.getAll();
  res.json(users);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtiene un usuario por su ID
 *     description: Retorna la información detallada de un usuario específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a consultar
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 3
 *                 name:
 *                   type: string
 *                   example: "María López"
 *                 email:
 *                   type: string
 *                   example: "maria.lopez@example.com"
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await service.getById(id);
  res.json(user);
});

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Crea un nuevo usuario
 *     description: Registra un nuevo usuario con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - username
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Carlos Pérez"
 *               username:
 *                 type: string
 *                 example: "carlosp"
 *               password:
 *                 type: string
 *                 example: "mypassword123"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
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
 *                     id:
 *                       type: integer
 *                       example: 5
 *                     name:
 *                       type: string
 *                       example: "Carlos Pérez"
 *                     username:
 *                       type: string
 *                       example: "carlosp"
 *       400:
 *         description: Datos inválidos o incompletos
 */
router.post('/', async (req, res) => {
  const { name, username, password } = req.body;
  const newUser = await service.create(name, username, password);
  res.status(201).json({
    message: 'created',
    data: newUser
  });
});

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Actualiza un usuario existente
 *     description: Modifica los datos de un usuario identificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ana Torres"
 *               username:
 *                 type: string
 *                 example: "anatorres"
 *               password:
 *                 type: string
 *                 example: "newsecurepass456"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "update"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 3
 *                     name:
 *                       type: string
 *                       example: "Ana Torres"
 *                     username:
 *                       type: string
 *                       example: "anatorres"
 *       404:
 *         description: Usuario no encontrado
 */
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const user = await service.update(id, changes);
  res.json({
    message: 'update',
    data: user
  });
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Elimina un usuario
 *     description: Elimina un usuario existente identificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario eliminado correctamente"
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userDelete = await service.delete(id);
  res.json({
    message: userDelete
  });
});


module.exports = router;
