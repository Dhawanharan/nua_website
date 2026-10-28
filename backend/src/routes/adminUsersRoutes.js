const express = require('express');
const router = express.Router();
const {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} = require('../controllers/adminUsersController');
const authMiddleware = require('../middleware/authMiddleware');
const superAdminGuard = require('../middleware/superAdminGuard');

// All routes here require valid JWT authentication and Super Admin privilege
router.use(authMiddleware, superAdminGuard);

router.get('/', getAdmins);
router.post('/', createAdmin);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

module.exports = router;
