import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap React for a Container
import Container from 'react-bootstrap/Container';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Container>
        <h1>Husky Film Festival Admin Portal</h1>
       
    </Container>  
    
  </StrictMode>
);