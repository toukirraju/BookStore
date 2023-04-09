import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { searchBook } from "../redux/features/BookSlice";

const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { searchKeyword } = useSelector((state) => state.book);
  const [searchValue, setSearchValue] = useState(searchKeyword);
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchBook(searchValue));
  };
  return (
    <nav className="py-4 2xl:px-6">
      <div className="container flex items-center justify-between">
        <Link to="/">
          <img src={logo} width="150px" className="object-contain" />
        </Link>
        <ul className="hidden md:flex items-center space-x-6">
          <Link
            className={`${pathname === "/" && "font-semibold"} cursor-pointer`}
            to="/"
            id="lws-bookStore"
          >
            <li>Book Store</li>
          </Link>
          <Link
            className={`${
              pathname === "/books/add" && "font-semibold"
            } cursor-pointer`}
            to="/books/add"
            id="lws-addBook"
          >
            <li>Add Book</li>
          </Link>
        </ul>

        <form className="flex items-center" onSubmit={handleSearch}>
          <div className="group relative rounded-md bg-white">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-primary"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Filter books..."
              className="search"
              id="lws-search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
