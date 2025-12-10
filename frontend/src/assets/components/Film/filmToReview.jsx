import Container from "react-bootstrap/Container";
import ReviewForm from "../Forms/reviewForm";
import "../styles/filmToReview.css";
import PropTypes from "prop-types";

export default function FilmToReview({
  director,
  title,
  genre,
  screener,
  status,
  onReload,
}) {
  return (
    <Container
      className="filmBlock"
      as="article"
      aria-labelledby={`film-title-${title}`}
    >
      <header>
        <h2 id={`film-title-${title}`}>Film: {title}</h2>
      </header>

      <dl className="film-details">
        <div>
          <dt>Director:</dt>
          <dd>{director}</dd>
        </div>

        <div>
          <dt>Genre:</dt>
          <dd>{genre}</dd>
        </div>

        <div>
          <dt>Screener Website:</dt>
          <dd>
            <a
              href={screener}
              className="filmInfo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch screener for ${title} (opens in new tab)`}
            >
              {screener}
            </a>
          </dd>
        </div>

        <div>
          <dt>Selection Status:</dt>
          <dd>
            <span
              /*className={`status-badge status-${status.toLowerCase().replace(/\s+/g, "-")}`}*/
              aria-label={`Current status: TBD`}
            >
              {status}
            </span>
          </dd>
        </div>
      </dl>

      <section aria-labelledby={`review-heading-${title}`}>
        <h3
          id={`review-heading-${title}`}
        >
          Review Actions for {title}
        </h3>
        <ReviewForm
          director={director}
          title={title}
          genre={genre}
          screener={screener}
          status={status}
          onReload={onReload}
        />
      </section>
    </Container>
  );
}

FilmToReview.propTypes = {
  director: PropTypes.string,
  title: PropTypes.string,
  genre: PropTypes.string,
  screener: PropTypes.string,
  status: PropTypes.string,
  onReload: PropTypes.func.isRequired,
};
