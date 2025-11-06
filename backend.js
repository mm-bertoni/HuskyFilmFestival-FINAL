import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import ticketsRouter from "./server/routes/tickets.js";
import authRoutes from './server/routes/auth.js';
import filmRouter from './server/routes/films.js';
import filmCountRouter from './server/routes/countFilms.js';
import deleteFilmRouter from './server/routes/deleteFilm.js';
import updateFilmRouter from './server/routes/updateFilmStatus.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("directory name ", __dirname);
console.log("filename name ", __filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Routes MUST come BEFORE static files
app.use("/api/tickets", ticketsRouter);

app.use('/api/auth', authRoutes);

/* Film Routes */
app.use("/api/", filmRouter);
app.use("/api/", filmCountRouter);
app.use("/api/", updateFilmRouter);
app.use("/api/", deleteFilmRouter);

// Serve React static files with fallback to index.html
// TROUBLESHOOTING: Removing leading ../
app.use(express.static(path.join(__dirname, "frontend/dist"), {
  index: 'index.html',
  fallthrough: true
}));

// Fallback - if no file found, serve index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});