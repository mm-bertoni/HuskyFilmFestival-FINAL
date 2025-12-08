//import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
//import ReviewForm from '../Forms/reviewForm';
import '../styles/acceptedFilm.css';

export default function FilmToReview({director, title, genre}){
    return(
            <Col>

                <Card style={{width: '18rem'}} className="acceptedCard mx-auto">
                    <Card.Body>
                        <Card.Title
                            style={{color:'white'}}
                        >{title}</Card.Title>
                        <Card.Text className="cardText">
                            Director: {director} 
                        </Card.Text>
                        <Card.Text className="cardText">
                            Genre: {genre}
                        </Card.Text>
                    </Card.Body>
                </Card>
                
            </Col>
        

    );

}