const superAdminGuard = (req, res, next) => {
  if (!req.user || req.user.privilege !== 'super_admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Super Admin privilege is required for this action.',
    });
  }
  next();
};

module.exports = superAdminGuard;
