import "./MainContent.css";
import { useNavigate } from "react-router";
import { addDetails } from "../../redux/bookItemDetailsSlice";
import { useAppDispatch } from "../../redux/hooks";

interface BookItemProps {
  title: string;
  authors: string[];
  categories: string[];
  image: string;
  id: string;
  description: string;
}

const BookItem = ({
  image,
  title,
  authors,
  categories,
  id,
  description,
}: BookItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlerClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(`/:${id}`);
    dispatch(
      addDetails({ image, title, authors, categories, id, description })
    );
  };

  return (
    <div className="col-md-3 col-4 m-9 mt-3">
      <div className="card h-100 width: 18rem" onClick={handlerClick}>
        <img className="card-img-top" src={image} alt="Card image cap" />
        <div className="card-body">
          <u className="text-muted fs-6 tc-grey">{categories}</u>
          <p className="font-weight-bold">
            <strong>
              {title.split(" ").length > 5
                ? title.split(" ").splice(0, 4).join(" ")
                : title}
            </strong>
          </p>
          <p className="text-muted">{authors?.join(",")}</p>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
