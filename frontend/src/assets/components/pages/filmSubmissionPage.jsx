import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import FilmForm from "../Forms/filmForm";
import FilmStatAggregator from '../filmStatAggregator';
import Navbar from '../Navbar';  // Add navbar

export default function FilmSubmissionPage() {
  return (
    <>
      <Navbar />
      <Container>
        <h1>Film Submissions</h1>
        <FilmForm />
      </Container>
      <Container>
        <FilmStatAggregator
          stat="0"
          type="All"
        />
      </Container>
    </>
  );
}