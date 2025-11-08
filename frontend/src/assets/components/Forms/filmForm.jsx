import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";

export default function FilmForm(){
    const [application, setApplication] = useState({director:"", title:"",genre:"",screener:""});
    // Controlling the submission behavior
    const onSubmit = async (evt) => {
        evt.preventDefault();
        console.log("On Submit: ", application);
        try {
            const res = await fetch(`/api/films`,{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    director: application.director,
                    title: application.title,
                    genre: application.genre,
                    screener: application.screener
                })
            });
            if(res.ok){
                console.log("Data posted successfully");
                // clear after submission
                setApplication({director:"", title:"",genre:"",screener:""});
                // TEsting
                window.location.reload(); // Trying to force a reload after submission. 
               
            }
        } catch (error){
            console.error("Error submitting film:",error);
        }
        

    }



    return(
        <Container>
            <Form onSubmit={onSubmit} className="submitFilmForm">
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className="text-white">Director's Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="" 
                        value = {application.director}
                        onChange = {(e) => setApplication({...application, director: e.target.value})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label className="text-white">Film's Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder=""
                        value={application.title}
                        onChange = {(e) => setApplication({...application, title: e.target.value})}
                     />
                </Form.Group>
                
                

                <Form.Group className="mb-3" controlId="formBasicGenre">
                    <Form.Label className="text-white">Film Genre</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder=""
                        value={application.genre}
                        onChange = {(e) => setApplication({...application, genre: e.target.value})}
                    />
                    <Form.Text className="text-white">
                        Please try to pick one from the following: Action, Drama, Romance, Comedy, Fantasy. If none of those fit, you may enter your own.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLink">
                    <Form.Label className="text-white">Film Screener Link</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="" 
                        value={application.screener}
                        onChange = {(e) => setApplication({...application, screener: e.target.value})}
                    />
                </Form.Group>
                

      
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
