import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap React for a Container
import Container from 'react-bootstrap/Container';
import FilmForm from "../filmForm";
import FilmStatAggregator from '../filmStatAggregator';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Container>
        <h1>Film Submissions</h1>
        <FilmForm />
    </Container>
    <Container>
        <FilmStatAggregator
            stat="0"
            type="All"
        />
    </Container>
    
  </StrictMode>
);