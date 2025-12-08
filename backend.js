import express from "express";
import session from "express-session";
import passport from "./config/passportM.js";
import path from "path";
import { fileURLToPath } from "url";
import ticketsRouter from "./server/routes/tickets.js";
import filmRouter from "./server/routes/films.js";
import filmCountRouter from "./server/routes/countFilms.js";
import deleteFilmRouter from "./server/routes/deleteFilm.js";
import updateFilmRouter from "./server/routes/updateFilmStatus.js";
import filmSubmitRouter from "./server/routes/filmSubmit.js";

import authMargaret from "./server/routes/AuthM.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("directory name ", __dirname);
console.log("filename name ", __filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration 
app.use(
  session({
    secret:
      process.env.SESSION_SECRET || "your-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // HTTPS only in production
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// API Routes MUST come BEFORE static files
app.use("/api/tickets", ticketsRouter);

// Attempting to add my Auth route
app.use(authMargaret);

/* Film Routes */
app.use("/api/", filmRouter);
app.use("/api/", filmCountRouter);
app.use("/api/", updateFilmRouter);
app.use("/api/", deleteFilmRouter);
app.use("/api/", filmSubmitRouter);


// Serve React static files with fallback to index.html
// TROUBLESHOOTING: Removing leading ../
app.use(
  express.static(path.join(__dirname, "frontend/dist"), {
    index: "index.html",
    fallthrough: true,
  })
);

// Fallback - if no file found, serve index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
