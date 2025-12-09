import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import '../styles/adminForm.css';

export default function AdminForm(){
    const [login, setLogin] = useState({username:"", password:""});
    
    const onLogin = async (evt) => {
        evt.preventDefault();
        console.log("Log In Attempt: ", login);
        try {
            const response = await fetch("/loginUser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: login.username,
                    password: login.password
                })
            });
            
            if (response.redirected) {
                localStorage.setItem("adminLoggedIn", "true");
                window.location.href = response.url;
            } else {
                const data = await response.json();
                console.log("Login response:", data);
                alert("Login failed: " + (data.message || "Unknown error"));
            }
        } catch (error){
            console.error("Error in sending POST with user info:", error);
        }
    }
    
    const onRegister = async (evt) => {
        evt.preventDefault();
        console.log("Register Attempt: ", login);
        if(login.password.trim.length === 0 || login.user.trim.length === 0 ){
            alert("Username and password must both be filled in. Please try again.");
        } else {
        try {
            const response = await fetch("/registerUser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: login.username,
                    password: login.password
                })
            });
            
            const data = await response.json();
            console.log("Register response:", response.status, data);
            
            if (response.ok) {
                alert("Registration successful! Please log in.");
            } else {
                alert("Registration failed: " + (data.message || "Unknown error"));
            }
        } catch (error){
            console.error("Error in sending POST with user info:", error);
            alert("Network error during registration");
        }
        }
    }


    return(
        <Container className="filmFormContainer">
            <Form onSubmit={onLogin}>
                <Form.Group className="mb-3" controlId="formBasicUser">
                    <Form.Label className='text-white'>Username *</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="" 
                        value={login.username}
                        onChange={(e) => setLogin({...login, username: e.target.value})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='text-white'>Password *</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder=""
                        value={login.password}
                        onChange={(e) => setLogin({...login, password: e.target.value})}
                     />
                </Form.Group>
                <Button className="submitButton" type="button" onClick={onRegister}>
                    Register
                </Button>
                <Button className="submitButton" type="submit">
                    Log In
                </Button>
            </Form>
        </Container>
    );
}