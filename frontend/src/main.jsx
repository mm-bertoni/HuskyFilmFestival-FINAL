import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import IndexPage from "./assets/components/pages/IndexPage";
import FilmSubmissionPage from "./assets/components/pages/filmSubmissionPage";
import TicketPage from "./assets/components/pages/TicketPage";
import AdminTicketList from "./assets/components/pages/AdminTicketList";
import AdminLogin from "./assets/components/pages/AdminLogin";
import Footer from "./assets/components/Footer";
import FilmAdminPage from "./assets/components/pages/filmAdminPage";
import AcceptedFilmPage from "./assets/components/pages/acceptedFilmPage";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/filmForm" element={<FilmSubmissionPage />} />
        <Route path="/acceptedFilms" element={<AcceptedFilmPage />} />
        <Route path="/filmAdmin" element={<FilmAdminPage />} />
        <Route path="/tickets" element={<TicketPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/adminTickets" element={<AdminTicketList />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </StrictMode>
);
