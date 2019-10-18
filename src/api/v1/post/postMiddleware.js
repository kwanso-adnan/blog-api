export default function addUserId(req, resp, next) {
  if (req.user) {
    req.body.userId = req.user.id;
  }
  next();
}
