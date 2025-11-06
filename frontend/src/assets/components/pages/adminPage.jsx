import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import { useState } from 'react';
//import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap React for a Container
import Container from 'react-bootstrap/Container';
//import AdminForm from '../adminForm';
import LoginAdmin from '../logInAdmin';




const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Navbar/>
    <Container>
      <LoginAdmin/>
    </Container>
    
    
  </StrictMode>
);