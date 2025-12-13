// server.js
import express from "express";
import session from "express-session";
import flash from "connect-flash";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";

import { syncDatabase } from "./src/models/index.model.js";
import authRoutes from "./src/routes/auth.routes.js";
import homeRoutes from "./src/routes/home.routes.js";
import jobsRoutes from "./src/routes/jobs.routes.js";
import recruiterRoutes from "./src/routes/recruiter.routes.js";
import applicationsRoutes from "./src/routes/applications.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ------------------ EJS + Layouts ------------------ */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

//  This makes layout.ejs work with <%- body %>
app.use(expressLayouts);
app.set("layout", "layout"); // uses: src/views/layout.ejs

/* ------------------ Middlewares ------------------ */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret-change-me",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

// Make currentUser + flash available in all EJS views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.flash = req.flash();
  next();
});

/* ------------------ Routes ------------------ */
app.use("/", authRoutes);
app.use("/", homeRoutes);
app.use("/jobs", jobsRoutes);
app.use("/recruiter", recruiterRoutes);
app.use("/applications", applicationsRoutes);


/* ------------------ Start server ------------------ */
const PORT = process.env.PORT || 4000;

syncDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`EJS app running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB sync failed:", err);
    process.exit(1);
  });
