const express = require('express');
const router = express.Router();
const {
  getCommittee,
  createMember,
  updateMember,
  deleteMember,
} = require('../controllers/committeeController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route to view committee
router.get('/', getCommittee);

// Protected routes (Admin / Super Admin)
router.post('/', authMiddleware, createMember);
router.put('/:id', authMiddleware, updateMember);
router.delete('/:id', authMiddleware, deleteMember);

module.exports = router;
