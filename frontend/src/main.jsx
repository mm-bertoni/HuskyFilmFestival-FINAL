import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap React for a Navbar


import Navbar from './assets/components/Navbar';
import IndexPage from './assets/components/pages/IndexPage';
import FilmSubmissionPage from './assets/components/pages/filmSubmissionPage';
import TicketPage from './assets/components/pages/TicketPage';

//import FilmForm from "./components/filmForm";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/filmForm" element={<FilmSubmissionPage />} />
        <Route path="/tickets" element={<TicketPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);