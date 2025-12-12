import express from "express";
import cors from "cors";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";

import { syncDatabase } from "./src/models/index.model.js";

// ROUTES
import { indexRouter } from "./src/routes/index.routes.js";
import categoryRoute from "./src/routes/category.routes.js";
import jobRoute from "./src/routes/job.routes.js";
import jobCategoryRoute from "./src/routes/jobCategory.routes.js";
import userRoute from "./src/routes/user.routes.js";
import companyRoute from "./src/routes/company.routes.js";
import applicationRoute from "./src/routes/application.routes.js";

// -----------------------------------------------------
// 1. __dirname pour ES MODULES
// -----------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------------------------------------
// 2. CRÉATION APP (OBLIGATOIRE AVANT app.use)
// -----------------------------------------------------
const app = express();

// -----------------------------------------------------
// 3. MIDDLEWARES GLOBAUX
// -----------------------------------------------------
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// 🔥 RENDRE UPLOADS ACCESSIBLE (ICI ET PAS AILLEURS)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// -----------------------------------------------------
// 4. VIEW ENGINE
// -----------------------------------------------------
app.set("view engine", "ejs");
app.set("views", "./src/views");

// -----------------------------------------------------
// 5. ROUTES VUES
// -----------------------------------------------------
app.use("/categories", categoryRoute);
app.use("/jobs", jobRoute);
app.use("/job-categories", jobCategoryRoute);
app.use("/users", userRoute);
app.use("/companies", companyRoute);
app.use("/applications", applicationRoute);

// -----------------------------------------------------
// 6. ROUTES API
// -----------------------------------------------------
app.use("/api", indexRouter);

// -----------------------------------------------------
// 7. DATABASE
// -----------------------------------------------------
syncDatabase();

// -----------------------------------------------------
// 8. START SERVER
// -----------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
