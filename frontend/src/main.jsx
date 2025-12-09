import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import IndexPage from "./assets/components/pages/IndexPage";
import FilmSubmissionPage from "./assets/components/pages/filmSubmissionPage";
import TicketPage from "./assets/components/pages/TicketPage";
import AdminTicketList from "./assets/components/pages/AdminTicketList";
import Footer from "./assets/components/Footer";
import FilmAdminPage from "./assets/components/pages/filmAdminPage";
import AcceptedFilmPage from "./assets/components/pages/acceptedFilmPage";
import FilmLoggedIn from "./assets/components/pages/filmLoggedIn";


/* This module developed with Claude:
Anthropic. (2025, Dec 9). *Protected routes with React Router and Passport* [Generative AI chat] Claude Sonnet 4.5 https://claude.ai/share/9318a278-fd5f-425b-94a3-26655ee1c615
*/
import ProtectedRoute, {AuthProvider} from "./assets/components/protectedRoute";


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/filmForm" element={<FilmSubmissionPage />} />
        <Route path="/acceptedFilms" element={<AcceptedFilmPage />} />
        <Route path="/filmAdmin" element={<FilmAdminPage />} />
        <Route path="/tickets" element={<TicketPage />} />
        
        <Route path="/adminTickets" element={
          <ProtectedRoute>
          <AdminTicketList />
        </ProtectedRoute>
          } />
        <Route path="/loggedInAdmin" element ={
          <ProtectedRoute>
            <FilmLoggedIn/>
          </ProtectedRoute>
        }/>
        
      </Routes>
    </AuthProvider>
    </BrowserRouter>
    <Footer />
  </StrictMode>
);
