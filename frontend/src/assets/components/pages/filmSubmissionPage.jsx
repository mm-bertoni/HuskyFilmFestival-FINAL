import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import FilmForm from "../Forms/filmForm";
import FilmStatAggregator from '../Film/filmStatAggregator';
import Navbar from '../Navbar'; 

import {useState, useEffect} from 'react';

export default function FilmSubmissionPage() {
  const [filmCount, setFilmCount] = useState(0);

  // To update the film count
  const updateStat = async ()=>{
    const res = await fetch(`/api/countFilms`);
    if(!res.ok){
      console.error("Failed to fetch sum");
      res.status(500).json({ error: "Failed to get film count" });
  
    }
    const data = await res.json();
    //console.log("What am I getting for the sum", data.filmCount);
    setFilmCount(data.filmCount); 

  };

  useEffect(()=>{
    updateStat();
  },[]);
  
  
  return (
    <>
      <Navbar />
      <Container>
        <h1>Submit Your Film</h1>
        <FilmForm />
      </Container>
      <Container>
        <FilmStatAggregator
          stat={filmCount}
          type=""
        />
      </Container>
    </>
  );
}