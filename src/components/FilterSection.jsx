import { useDispatch, useSelector } from "react-redux";
import { filterBook } from "../redux/features/BookSlice";

const FilterSection = () => {
  const dispatch = useDispatch();
  const { filterType } = useSelector((state) => state.book);
  return (
    <div className="flex items-center justify-between mb-12">
      <h4 className="mt-2 text-xl font-bold">Book List</h4>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => dispatch(filterBook("all"))}
          className={
            filterType == "all"
              ? "lws-filter-btn active-filter"
              : "lws-filter-btn"
          }
        >
          All
        </button>
        <button
          onClick={() => dispatch(filterBook("featured"))}
          className={
            filterType == "featured"
              ? "lws-filter-btn active-filter"
              : "lws-filter-btn"
          }
        >
          Featured
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
