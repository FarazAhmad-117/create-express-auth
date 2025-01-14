const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

/**
 * @swagger
 * /api/role:
 *   post:
 *     summary: Create a new role
 *     tags:
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Role created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", roleController.createRole);

/**
 * @swagger
 * /api/role:
 *   get:
 *     summary: Get all roles
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: Successfully fetched roles
 *       500:
 *         description: Internal server error
 */
router.get("/", roleController.getRoles);

/**
 * @swagger
 * /api/role/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the role
 *     responses:
 *       200:
 *         description: Successfully fetched the role
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", roleController.getRoleById);

/**
 * @swagger
 * /api/role/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", roleController.updateRole);

/**
 * @swagger
 * /api/role/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the role
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", roleController.deleteRole);

module.exports = router;
