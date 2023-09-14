import "./Header.css";
import Dropdowns from "./Dropdowns";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addValueInput } from "../../redux/inputSearchSlice";
import { fetchBooksList } from "../../redux/booksListSlice";
import { resetPaginationStep } from "../../redux/paginationSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const inputSearchValue = useAppSelector(
    (state) => state.inputSearch.inputSearch.value
  );
  const { categories, sortingBy } = useAppSelector((state) => state.dropdowns);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    dispatch(addValueInput(value));
  };

  const searchClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (inputSearchValue === "") return; // если пользователь ничего не ввел в инпут поиск не осуществляется
    dispatch(
      fetchBooksList({
        value: inputSearchValue,
        category: categories,
        sortingBy,
      })
    );
    dispatch(resetPaginationStep());
    navigate("/");
  };

  const keyDownEventHandler = (event: React.KeyboardEvent) => {
    if (event.code !== "Enter") return;
    if (inputSearchValue === "") return; // если пользователь ничего не ввел в инпут поиск не осуществляется
    dispatch(
      fetchBooksList({
        value: inputSearchValue,
        category: categories,
        sortingBy,
      })
    );
    dispatch(resetPaginationStep());
    navigate("/");
  };

  return (
    <div className="container-header-fluid px-4">
      <h2 className="title" onClick={() => navigate("/")}>
        Search for books
      </h2>
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div className="input-group">
            <input
              className="form-control border-end-0 border rounded-pill"
              type="search"
              id="search-input"
              value={inputSearchValue}
              onChange={onChangeHandler}
              onKeyDown={keyDownEventHandler}
              autoComplete="off"
            />

            <button
              className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5 hover-zoom"
              type="submit"
              onClick={searchClickHandler}
              onKeyDown={keyDownEventHandler}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>
      <Dropdowns />
    </div>
  );
};

export default Header;
