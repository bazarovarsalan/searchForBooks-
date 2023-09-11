import "./MainContent.css";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import Loading from "./Loading";
import BookItem from "./BookItem";
import ErrorComponent from "./ErrorComponent";
import { fetchBooksList } from "../../redux/booksListSlice";
import { addPaginationStep } from "../../redux/paginationSlice";

const BooksList = () => {
  const { booksList, status, error } = useAppSelector(
    (state) => state.booksList
  );

  const inputSearchValue = useAppSelector(
    (state) => state.inputSearch.inputSearch.value
  );

  const { categories, sortingBy } = useAppSelector((state) => state.dropdowns);

  const dispatch = useAppDispatch();
  const pagination = useAppSelector((state) => state.pagination.pagination);

  const handlerOffset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputSearchValue === "") return;
    dispatch(
      fetchBooksList({
        value: inputSearchValue,
        category: categories,
        sortingBy,
        pagination,
      })
    );
    dispatch(addPaginationStep());
  };

  return (
    <div className="container-main-fluid">
      {status === "loading" && <Loading />}
      {status === "resolved" && booksList?.items && (
        <div className="row">
          <h6 className="d-flex justify-content-center mt-3">
            <em>Found {booksList?.totalItems} results</em>
          </h6>
          {booksList.items.map((o) => {
            return (
              <BookItem
                title={o.volumeInfo.title}
                authors={o.volumeInfo.authors || []}
                categories={o.volumeInfo.categories || []}
                image={o.volumeInfo.imageLinks.thumbnail}
                description={o.volumeInfo.description || ""}
                id={o.id}
                key={o.id}
              />
            );
          })}
          {status === "resolved" && booksList.totalItems === 0 && (
            <div className="row gy-3">
              <div
                className="card w-120 text-center"
                style={{ marginTop: "100px" }}
              >
                <div className="card-body">
                  По вашему запросу ничего не найдено
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {status === "resolved" && booksList?.items && (
        <div className="text-center mt-3">
          <button className="btn btn-outline-secondary" onClick={handlerOffset}>
            Загрузить ещё
          </button>
        </div>
      )}
      {status === "rejected" && error && <ErrorComponent errorText={error} />}
    </div>
  );
};

export default BooksList;
