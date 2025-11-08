import Container from 'react-bootstrap/Container';

export default function FilmStatAggregator({ stat="0", type=""}){
    
    return(
        <Container className="statContainer">
            <h2>Number of Films Submitted - {type}: </h2>
            <h3 className="statText">{stat}</h3>
        </Container>
    );
}