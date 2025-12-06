import Container from "react-bootstrap/esm/Container";

import AdminForm from "../Forms/adminForm";


export default function LoginAdmin(){

    /* const [isLoggedIn, setIsLoggedIn] = useState(false); // Indicator of logged in
    //const [attempt, setAttempt] = useState({user:"", password:""})
    // Hard coding 1 user for now
    const adminAccount = {user:"mbertoni", password:"1234"}
    */

    
        

    
    
    
        return(
            <>
                <Container>
                    <h1>Husky Film Festival Admin Portal</h1>
                </Container>  
                <Container>
                    <AdminForm/>
            
                </Container>
            </>
        );
     
    }



   

