import jwt from "jsonwebtoken";

export const decodeTokenController = async (req, res) => {
  const { token } = req.body;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

  res.send(decodedToken);
};
