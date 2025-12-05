import Container from "react-bootstrap/esm/Container";

import {useState} from 'react';

import AdminForm from "../Forms/adminForm";
import FilmList from "../Film/filmReviewList";

export default function LoginAdmin(){

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Indicator of logged in
    //const [attempt, setAttempt] = useState({user:"", password:""})
    // Hard coding 1 user for now
    const adminAccount = {user:"mbertoni", password:"1234"}


    function handleLogin({login}){
        console.log("attempt user:",login.user);
        console.log("attempt password:",login.password)
        if(login.user === adminAccount.user && login.password === adminAccount.password){
            console.log("Success! You have logged in.")
            setIsLoggedIn(true); // Set successful login
            
        } else {
            console.log("Invalid Log In. You are not logged in.")

            
        }

    }
    
    if(!isLoggedIn){
        return(
            <>
                <Container>
                    <h1>Husky Film Festival Admin Portal</h1>
                </Container>  
                <Container>
                    <AdminForm
                        onAttempt={handleLogin}
                    />
            
                </Container>
            </>
        );
    } else {
        return(
            <>
                <Container>
                    <h1>Review Films</h1>
                    <FilmList/>
                </Container>
            </>
            
        );
    };



   

}