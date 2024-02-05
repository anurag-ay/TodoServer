import cors from "cors";

export default function corsConfig(app) {
  const corsOptions = {
    origin: ["http://localhost:3000", "https://taskmanageranurag.netlify.app"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));
}
