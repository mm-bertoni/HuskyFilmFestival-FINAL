import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import '../styles/adminForm.css';

export default function AdminForm(){
    const [login, setLogin] = useState({user:"", password:""});
    const onSubmit = async (evt) => {
        evt.preventDefault();
        console.log("Log In Attempt: ", login);
        // need to pass a set function here to transfer it to the parent
       // NEED
       // POST ACTION HERE
       try {
        await fetch("https://huskyfilmfestival-final.onrender.com/loginUser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: login.username,
        password: login.password
      })
        }); 
        
    
       } catch (error){
        console.error("Error in sending POST with user info:", error)
       }
    }
    const onRegister = async (evt) =>{
        evt.preventDefault();
        console.log("Register Attempt: ", login);
        // need to pass a set function here to transfer it to the parent
       // NEED
       // POST ACTION HERE
       try {
        await fetch("https://huskyfilmfestival-final.onrender.com/registerUser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: login.username,
        password: login.password
      })
        }); 
        
    
       } catch (error){
        console.error("Error in sending POST with user info:", error)
       }
    }

    return(
        <Container className="filmFormContainer">
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
                <Button className="submitButton" type="register">
                    Register
                </Button>
                <Button className="submitButton" type="submit" onClick={onRegister}>
                    Log In
                </Button>
            </Form>
        </Container>
    );
}