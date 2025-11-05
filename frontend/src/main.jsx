import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap React for a Navbar

import Navbar from './assets/components/Navbar';
import IndexPage from './assets/components/pages/IndexPage';

//import FilmForm from "./components/filmForm";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Navbar/>
    <IndexPage/>
  </StrictMode>
);