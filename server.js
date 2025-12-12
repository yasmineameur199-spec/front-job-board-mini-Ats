import express from "express";
import cors from "cors";
import methodOverride from "method-override";

import { syncDatabase } from "./src/models/index.model.js";

// ROUTES API (JSON)
import { indexRouter } from "./src/routes/index.routes.js";

// ROUTES VIEWS (EJS)
import categoryRoute from "./src/routes/category.routes.js";
import jobRoute from "./src/routes/job.routes.js";
import jobCategoryRoute from "./src/routes/jobCategory.routes.js";

// -----------------------------------------------------
// 1. CRÉATION APP
// -----------------------------------------------------
const app = express();

// -----------------------------------------------------
// 2. MIDDLEWARES GLOBAUX
// -----------------------------------------------------
app.use(cors());
app.use(express.urlencoded({ extended: true })); // important pour recevoir les forms EJS
app.use(express.json());

app.use(methodOverride("_method"));

// -----------------------------------------------------
// 3. VIEW ENGINE (EJS) POUR LE FRONT
// -----------------------------------------------------
app.set("view engine", "ejs");
app.set("views", "./src/views");

// -----------------------------------------------------
// 4. ROUTES EJS (le front HTML)
// -----------------------------------------------------
app.use("/categories", categoryRoute);      // ex: /categories/add-category-form
app.use("/jobs", jobRoute);                // ex: /jobs/add-job-form
app.use("/job-categories", jobCategoryRoute);

// -----------------------------------------------------
// 5. ROUTES API (JSON)
// -----------------------------------------------------
app.use("/api", indexRouter);

// -----------------------------------------------------
// 6. SYNC DATABASE
// -----------------------------------------------------
syncDatabase();

// -----------------------------------------------------
// 7. START SERVER
// -----------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
