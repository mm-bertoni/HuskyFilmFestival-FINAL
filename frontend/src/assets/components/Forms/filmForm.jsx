import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";

export default function FilmForm(){
    const [application, setApplication] = useState({director:"", title:"",type:"",genre:"",link:""});
    const onSubmit = (evt) => {
        evt.preventDefault();
        console.log("On Submit: ", application);
    }
    return(
        <Container>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Director's Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="" 
                        value = {application.director}
                        onChange = {(e) => setApplication({...application, director: e.target.value})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Film's Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder=""
                        value={application.title}
                        onChange = {(e) => setApplication({...application, title: e.target.value})}
                     />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicType">
                    <Form.Label>Film Type</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder=""
                        value={application.type}
                        onChange = {(e) => setApplication({...application, title: e.target.value})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicGenre">
                    <Form.Label>Film Genre</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder=""
                        value={application.genre}
                        onChange = {(e) => setApplication({...application, genre: e.target.value})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLink">
                    <Form.Label>Film Screener Link</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="" 
                        value={application.link}
                        onChange = {(e) => setApplication({...application, link: e.target.value})}
                    />
                </Form.Group>
                

      
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
