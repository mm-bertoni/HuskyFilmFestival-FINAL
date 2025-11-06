import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
// Bootstrap React for a Navbar


import IndexPage from "./assets/components/pages/IndexPage";
import FilmSubmissionPage from "./assets/components/pages/filmSubmissionPage";
import TicketPage from "./assets/components/pages/TicketPage";
import AdminTicketList from "./assets/components/pages/AdminTicketList";
import AdminLogin from "./assets/components/AdminLogin";





import FilmAdminPage from './assets/components/pages/filmAdminPage';




const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/filmForm" element={<FilmSubmissionPage />} />
        <Route path="/filmAdmin" element={<FilmAdminPage />} />
        <Route path="/tickets" element={<TicketPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/adminTickets" element={<AdminTicketList />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
