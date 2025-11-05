import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";

export default function AdminForm(){
    const [login, setLogin] = useState({user:"", password:""});
    const onSubmit = (evt) => {
        evt.preventDefault();
        console.log("Log In Attempt: ", login);
    }
    return(
        <Container>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUser">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="" 
                        value = {login.user}
                        onChange = {(e) => setLogin({...login, user: e.target.value})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder=""
                        value={login.password}
                        onChange = {(e) => setLogin({...login, password: e.target.value})}
                     />
                </Form.Group>
      
                <Button variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
        </Container>
    );
}