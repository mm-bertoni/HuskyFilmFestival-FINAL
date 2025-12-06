import Container from "react-bootstrap/esm/Container";
import FilmList from "../Film/filmReviewList";

export default function FilmLoggedIn(){
    return(
            <>
                <Container>
                    <h1>Review Films</h1>
                    <FilmList/>
                </Container>
            </>
            
        );
}