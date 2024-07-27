function checkAuthentication(req, res, next) {
  try {
    if (req.user.email === req.params.user) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
}

export default checkAuthentication;
