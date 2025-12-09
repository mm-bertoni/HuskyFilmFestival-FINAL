import Container from "react-bootstrap/esm/Container";
import FilmList from "../Film/filmReviewList";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {useEffect} from "react";


export default function FilmLoggedIn() {
   const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/filmAdmin");
    }
  }, [navigate]);

  if (!localStorage.getItem("adminLoggedIn")) {
    return null;
  } 

  const handleLogout = async()=>{
      try {
            const response = await fetch("/logout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            
            });
            
            const data = await response.json();
            console.log("Logout response:", response.status, data);
            
            if (response.ok) {
                alert("Log out successful");
            } else {
                alert("Issue logging out: " + (data.message || "Unknown error"));
            }
        } catch (error){
            console.error("Error in sending POST with user info:", error);
            alert("Error while logging out");
        }
  

  };

  return (
    <>
      <Container>
        <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
          <h1>Review Films</h1>
          <Link to="/adminTickets">
            <Button
              variant="primary"
              style={{ backgroundColor: "#C8102E", borderColor: "#C8102E" }}
            >Ticket Page
            </Button>
          </Link>
          <Link to="/logout">
            <Button
              variant="primary"
              style={{ backgroundColor: "#C8102E", borderColor: "#C8102E" }}
              onClick={handleLogout}
            >LOGOUT
            </Button>
          </Link>
        </div>
        <FilmList />
      </Container>
    </>
  );
}
