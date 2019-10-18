export default function addUserId(error, req, resp, next) {
  if (req.user) {
    req.params.userId = req.user.id;
  }
  next();
}
