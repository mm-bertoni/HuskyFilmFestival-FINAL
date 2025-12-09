import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import "../styles/filmForm.css";

export default function FilmForm() {
  const [application, setApplication] = useState({
    director: "",
    title: "",
    genre: "Action",
    screener: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!application.director.trim()) {
      newErrors.director = "Director's name is required";
    }

    if (!application.title.trim()) {
      newErrors.title = "Film title is required";
    }

    if (!application.screener.trim()) {
      newErrors.screener = "Screener link is required";
    } else if (!application.screener.match(/^https?:\/\/.+/)) {
      newErrors.screener =
        "Please enter a valid URL (must start with http:// or https://)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    console.log("On Submit: ", application);

    try {
      const res = await fetch(`/api/films`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          director: application.director,
          title: application.title,
          genre: application.genre,
          screener: application.screener,
        }),
      });
      if (res.ok) {
        console.log("Data posted successfully");
        alert(`We have received your submission for: ${application.title}`);
        // clear after submission
        setApplication({
          director: "",
          title: "",
          genre: "Action",
          screener: "",
        });
        setErrors({});
        window.location.reload();
      } else {
        alert("Failed to submit your film. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting film:", error);
      alert(
        "Error submitting film. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="filmFormContainer">
      <h2>Submit Your Film</h2>
      <Form onSubmit={onSubmit} className="submitFilmForm" noValidate>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label className="text-white">
            Director's Name <span aria-label="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter director's name"
            value={application.director}
            onChange={(e) => {
              setApplication({ ...application, director: e.target.value });
              if (errors.director) {
                setErrors({ ...errors, director: "" });
              }
            }}
            required
            aria-required="true"
            aria-invalid={errors.director ? "true" : "false"}
            aria-describedby={errors.director ? "director-error" : undefined}
          />
          {errors.director && (
            <Form.Text id="director-error" className="text-danger" role="alert">
              {errors.director}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label className="text-white">
            Film's Title <span aria-label="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter film title"
            value={application.title}
            onChange={(e) => {
              setApplication({ ...application, title: e.target.value });
              if (errors.title) {
                setErrors({ ...errors, title: "" });
              }
            }}
            required
            aria-required="true"
            aria-invalid={errors.title ? "true" : "false"}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <Form.Text id="title-error" className="text-danger" role="alert">
              {errors.title}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGenre">
          <Form.Label className="text-white">Film Genre</Form.Label>
          <Form.Select
            value={application.genre}
            onChange={(e) =>
              setApplication({ ...application, genre: e.target.value })
            }
            aria-describedby="genre-help"
          >
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Romance">Romance</option>
            <option value="Comedy">Comedy</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
          </Form.Select>
          <Form.Text id="genre-help" className="formText">
            Select a genre from the list
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLink">
          <Form.Label className="text-white">
            Film Screener Link <span aria-label="required">*</span>
          </Form.Label>
          <Form.Control
            type="url"
            placeholder="https://example.com/your-film"
            value={application.screener}
            onChange={(e) => {
              setApplication({ ...application, screener: e.target.value });
              if (errors.screener) {
                setErrors({ ...errors, screener: "" });
              }
            }}
            required
            aria-required="true"
            aria-invalid={errors.screener ? "true" : "false"}
            aria-describedby={
              errors.screener ? "screener-error screener-help" : "screener-help"
            }
          />
          <Form.Text id="screener-help" className="formText">
            Provide a link to view your film (e.g., Vimeo, YouTube, or private
            link)
          </Form.Text>
          {errors.screener && (
            <Form.Text
              id="screener-error"
              className="text-danger d-block"
              role="alert"
            >
              {errors.screener}
            </Form.Text>
          )}
        </Form.Group>

        <Button
          variant="primary"
          className="submitButton"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </Container>
  );
}
