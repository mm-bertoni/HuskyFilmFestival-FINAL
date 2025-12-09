import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/filmForm.css";

export default function ReviewForm({
  director,
  title,
  genre,
  screener,
  onReload,
}) {
  const [selected, setSelected] = useState("Not Reviewed");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSelection = (event) => {
    setSelected(event.target.value);
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();

    if (selected === "Make a decision") {
      alert("Please select a decision before saving");
      return;
    }

    setIsSubmitting(true);
    console.log("Selection made:", selected);

    try {
      const res = await fetch(`/api/updateFilmStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          director,
          title,
          genre,
          screener,
          status: selected,
        }),
      });
      if (res.ok) {
        console.log("Data Posted Successfully");
        alert("Your selection was saved");
        console.log("About to call onReload, which is", onReload);
        onReload();
      } else {
        console.error("Failed to update film status");
        alert("Failed to save selection. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error saving selection. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  async function handleClick() {
    if (
      !window.confirm(
        `Are you sure you want to delete the submission for "${title}" by ${director}? This action cannot be undone.`
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/deleteFilm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          director,
          title,
          genre,
          screener,
        }),
      });
      if (res.ok) {
        console.log("Data Posted Successfully");
        onReload();
      } else {
        console.error("Failed to delete film");
        alert("Failed to delete submission. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting film:", error);
      alert("Error deleting submission. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId={`review-decision-${title}-${director}`}>
          <Form.Label className="text-white">Selection Decision</Form.Label>
          <Form.Select
            value={selected}
            onChange={handleSelection}
            aria-label={`Selection decision for ${title} by ${director}`}
            required
            aria-required="true"
          >
            <option value="Make a decision" disabled>
              Make a decision
            </option>
            <option value="Selected">Selected</option>
            <option value="Waitlisted">Waitlisted</option>
            <option value="Rejected">Rejected</option>
          </Form.Select>
        </Form.Group>
        <Button
          className="submitButton"
          type="submit"
          disabled={isSubmitting || selected === "Make a decision"}
          aria-label={`Save decision for ${title} by ${director}`}
        >
          {isSubmitting ? "Saving..." : "Save Decision"}
        </Button>
      </Form>
      <Button
        onClick={handleClick}
        className="submitButton"
        variant="danger"
        disabled={isDeleting}
        aria-label={`Delete submission for ${title} by ${director}`}
      >
        {isDeleting ? "Deleting..." : "DELETE SUBMISSION"}
      </Button>
    </Container>
  );
}

ReviewForm.propTypes = {
  director: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  screener: PropTypes.string.isRequired,
  onReload: PropTypes.func.isRequired,
};
