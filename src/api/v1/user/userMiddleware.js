export default function addUserId(req, resp, next) {
  if (req.user) {
    req.params.id = req.user.id;
  }
  next();
}
