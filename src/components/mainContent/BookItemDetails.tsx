import "./MainContent.css";
import { useAppSelector } from "../../redux/hooks";

const BookItemDetails = () => {
  const details = useAppSelector((state) => state.bookItemDetails.details);

  return (
    <div className="container">
      {details && (
        <div className="row">
          <div className="col-lg-6 col">
            <img
              src={details?.image}
              className="card-details-img-top"
              alt={details?.title}
            />
          </div>
          <div className="col-lg-6 col p-3">
            <u className="text-muted fs-6 tc-grey m-3">
              <i>{details?.categories}</i>
            </u>
            <h5 className="card-title m-3">
              <strong>{details?.title}</strong>
            </h5>
            <p className="text-muted m-3">{details?.authors}</p>
            <div className="description">{details?.description}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookItemDetails;
