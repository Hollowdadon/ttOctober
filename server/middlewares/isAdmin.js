module.exports = (req, res, next) => {
  if (req.user.role !== 'admin') {
    res.status(401).end();
  }

  next();
}
