import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from '../Navbar'; 
import AcceptedFilms from '../Film/acceptedFilmList.jsx';

export default function AcceptedFilmPage(){
    return (
    <>
    <Navbar/>
    <Container>
        <h1>Husky Film Fest Official Selections</h1>
        <AcceptedFilms/>
    </Container>
    </>
    );
}