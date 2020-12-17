import express from "express";
import cors from "cors";
import "dotenv/config";
import v1Routes from "./routes";

const app = express();

app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(v1Routes);

app.use((req, res) => {
  const err = new Error("Not Found");
  err.status = 404;
});

app.use((req, res) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || process.env.PORT_PATH;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
