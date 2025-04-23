module.exports = (req, res, next) => {
  if (!req.userRole) {
      return res.status(400).json({ error: 'User role is not defined. Please login again.' });
  }
  if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};
