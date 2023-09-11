import { useAppDispatch } from "../../redux/hooks";
import { selectCategory, selectSortingBy } from "../../redux/dropdownSlice";

const Dropdowns = () => {
  const dispatch = useAppDispatch();

  const selectChangeCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    dispatch(selectCategory(value));
  };

  const selectChangeSortingBy = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    dispatch(selectSortingBy(value));
  };

  return (
    <div className="col-md-8 offset-md-2">
      <div className="row my-4">
        <div className="col md-2">
          <h4 className="text-white text-end">categories</h4>
        </div>
        <div className="col md-2 ">
          <select
            className="form-select"
            aria-label="Default select example"
            defaultValue={"all"}
            onChange={selectChangeCategory}
          >
            <option value="all">all</option>
            <option value="art">art</option>
            <option value="biography">biography</option>
            <option value="computers">computers</option>
            <option value="history">history</option>
            <option value="medical">medical</option>
            <option value="poetry">poetry</option>
          </select>
        </div>
        <div className="col md-2">
          <h4 className="text-white text-end">sorting by</h4>
        </div>
        <div className="col md-2">
          <select
            className="form-select"
            aria-label="Default select example"
            defaultValue={"relevance"}
            onChange={selectChangeSortingBy}
          >
            <option value="relevance">relevance</option>
            <option value="newest">newest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Dropdowns;
