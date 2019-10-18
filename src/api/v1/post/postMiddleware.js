export default function addUserId(error, req, resp, next) {
  if (req.user) {
    req.body.userId = req.user.userId;
  }
  next();
}
