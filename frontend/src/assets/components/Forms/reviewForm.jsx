import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";

export default function ReviewForm({director, title, genre, screener, onReload}){
    const [selected, setSelected] = useState("Not Reviewed"); // Default is hasnt been reviewed.
    // Fix this 
    const handleSelection = (event) =>{
        setSelected(event.target.value);
    }

    const onSubmit = async (evt) => {
        evt.preventDefault();
        console.log("Selection made:", selected);
        // Will put comms to Server here
        // Check if delete or setting status
        
        try{
            const res = await fetch(`/api/updateFilmStatus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                director,
                title,
                genre,
                screener,
                status:selected
            })
            
        });
         if(res.ok) {
            console.log("Data Posted Successfully");
            console.log("About to call onReload, which is" ,onReload);
            onReload();  // Now actually call the function
        } else {
            console.error("Failed to update film status");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
             
    }

    async function handleClick(){
        
         try{
            const res = await fetch(`/api/deleteFilm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                director,
                title,
                genre,
                screener
            })
            
        });
         if(res.ok) {
            console.log("Data Posted Successfully");
            //console.log("About to call onReload, which is" ,onReload);
            onReload();  // Now actually call the function
        } else {
            console.error("Failed to update films");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
    }


    return(
        <Container>
            <Form onSubmit={onSubmit}>
                
                <Form.Select value={selected} onChange={handleSelection}>
                    <option>Make a decision</option>
                    <option value="Selected">Selected</option>
                    <option value="Waitlisted">Waitlisted</option>
                    <option value="Rejected">Rejected</option>
                </Form.Select>
                <Button className="submitButton" type="submit"> Submit</Button>
            </Form>
            <Button onClick={handleClick} variant="danger">DELETE SUBMISSION</Button>
        </Container>

    );
}
