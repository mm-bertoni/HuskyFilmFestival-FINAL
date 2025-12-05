import Container from 'react-bootstrap/Container';
import ReviewForm from '../Forms/reviewForm';
import '../styles/filmToReview.css'

export default function FilmToReview({director, title, genre, screener, status, onReload}){
    return(
        <>
            <Container className="filmBlock">
                <div>
                    <h2>Film: {title}</h2>
                </div>
                <div>
                    <span>
                        <h2>Director:</h2> 
                        <p className="filmInfo">{director}</p>
                    </span>
                    <span>
                        <h2>Genre:</h2> 
                        <p className="filmInfo">{genre}</p>
                    </span>
    
                    <span>
                        <h2>Screener Website:</h2> 
                        <a href={screener} className="filmInfo">{screener}</a>
                    </span>
                    <span>
                        <h2>Selection Status:</h2> 
                        <p className="statusText">{status}</p>
                    </span>
                </div>
                
           
            
             
                <ReviewForm
                director={director}
                title={title}
                genre={genre}
                screener={screener}
                status={status}
                onReload={onReload}
                />
               
            </Container>
        </>

    );

}