
import {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Film from './acceptedFilm';

// TODO : CHANGE TO ONLY ACCEPTED STUFF
export default function FilmReviewList(){
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    const reloadFilms = async () => {
        //console.log("reloadFilms triggered");
        // Testing
        setLoading(true);
        const res = await fetch(`/api/acceptedFilms`);
        console.log("What is res gettting", res);
        if(!res.ok){
            console.error("Failed to fetch films", res.status);
            setLoading(false);
            return;

        } 
            const data = await res.json();
            //console.log("Full data received:", data);
            setFilms(data.films || []); // Defaults to empty array if issue
            setLoading(false);


        };

    useEffect(()=>{
        
        reloadFilms();

    },[]);
    
    
    function renderFilm(film){
        return (
            <Film
            key = {film._id}
            director={film.director}
            title={film.title}
            genre={film.genre}
            />
        );

    }

    // Diagnostic log just before render to catch non-array types
    //console.log('films before render:', films, 'isArray:', Array.isArray(films), 'toString:', Object.prototype.toString.call(films));

    if(loading){
        return(
            <Container>
                <div>Loading Films...</div>
            </Container>
        );
    }

    if(!films || films.length === 0){
        return(
            <Container>
                <div>Check Back Later For Accepted Films</div>
            </Container>
        )
    }
    return(
        <Container>
            <Row>
                
                    {films.map(renderFilm)}
               
                
            </Row>
            
        </Container>
    );
}
    
