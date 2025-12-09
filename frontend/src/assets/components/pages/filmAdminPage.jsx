import { StrictMode } from "react";
//import { useState } from 'react';
//import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap React for a Container
import Container from "react-bootstrap/Container";
//import AdminForm from '../adminForm';
import LoginAdmin from "../Film/logInAdmin";
import Navbar from "../Navbar";

export default function FilmAdminPage() {
  return (
    <StrictMode>
      <Navbar />
      <main>
        <Container>
          <LoginAdmin />
        </Container>
      </main>
    </StrictMode>
  );
}
