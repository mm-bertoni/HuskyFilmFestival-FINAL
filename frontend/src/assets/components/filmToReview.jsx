import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function FilmToReview({id, director, title, genre, type, website, status}){
    return(
        <>
            <Container>
                <div>
                    <h2>Film: {title}</h2>
                </div>
                <div>
                    <span>
                        <h3>Director:</h3> 
                        <p>{director}</p>
                    </span>
                    <span>
                        <h3>Genre:</h3> 
                        <p>{genre}</p>
                    </span>
                    <span>
                        <h3>Film Type:</h3> 
                        <p>{type}</p>
                    </span>
                    <span>
                        <h3>Screener Website:</h3> 
                        <p>{website}</p>
                    </span>
                    <span>
                        <h3>Selection Status:</h3> 
                        <p>{status}</p>
                    </span>
                </div>
                <div>
                    
                </div>
            </Container>
        </>

    );

}