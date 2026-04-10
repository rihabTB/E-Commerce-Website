export const adminKeyMiddleware = (req, res, next) => {
  console.log("HEADER KEY:", req.headers["x-admin-key"]);
  console.log("ENV KEY:", process.env.ADMIN_KEY);

  const adminKey = req.headers["x-admin-key"];

  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized: Invalid admin key" });
  }

  next();
};