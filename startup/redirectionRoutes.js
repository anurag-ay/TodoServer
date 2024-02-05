import userRoutes from "../routes/userRoute.js";
import categoryRoute from "../routes/categoryRoute.js";
import taskRoute from "../routes/taskRoute.js";
import decodedTokenRoute from "../routes/decodeTokenRoute.js";

export default function redirectionRoutes(app) {
  // Home route
  app.get("/", (req, res) => {
    res.status(200).send("This is todo home");
  });

  // redirecting to the routes
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/category", categoryRoute);
  app.use("/api/v1/task", taskRoute);
  app.use("/api/v1/decodeToken", decodedTokenRoute);
}
