import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAddBookMutation,
  useEditBookMutation,
} from "../redux/features/api/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectBook } from "../redux/features/BookSlice";

const ControlPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedBook } = useSelector((state) => state.book);
  const [addBook, { isLoading, isError, isSuccess }] = useAddBookMutation();
  const [editBook, { isSuccess: updateSuccess }] = useEditBookMutation();

  const [state, setState] = useState({
    name: "",
    author: "",
    thumbnail: "",
    price: 0,
    rating: 0,
    featured: false,
    id: "",
  });

  const resetForm = () => {
    setState({
      name: "",
      author: "",
      thumbnail: "",
      price: 0,
      rating: 0,
      featured: false,
      id: "",
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      ...state,
      id: Math.floor(new Date().getTime().toString()),
    });
    resetForm();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    editBook({
      id: state.id,
      data: state,
    });
  };
  if (updateSuccess) {
    dispatch(
      selectBook({
        name: "",
        author: "",
        thumbnail: "",
        price: 0,
        rating: 0,
        featured: false,
        id: "",
      })
    );
    navigate("/");
  }

  useEffect(() => {
    if (Object.keys(selectedBook) != 0) {
      setState({ ...selectedBook });
    }
  }, [selectedBook]);

  return (
    <main className="py-6 2xl:px-6">
      <div className="container">
        <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
          {isSuccess && (
            <h2 className="mb-8 text-xl font-bold text-center text-green-800">
              Book was added successfully
            </h2>
          )}
          {isError && (
            <h2 className="mb-8 text-xl font-bold text-center text-red-800">
              There was an error!
            </h2>
          )}
          <h4 className="mb-8 text-xl font-bold text-center  ">
            {pathname === "/books/add" ? "Add Book" : "Edit Book"}
          </h4>
          <form
            className="book-form"
            onSubmit={pathname === "/books/add" ? handleSubmit : handleUpdate}
          >
            <div className="space-y-2">
              <label htmlFor="lws-bookName">Book Name</label>
              <input
                required
                className="text-input"
                type="text"
                id="lws-bookName"
                onChange={handleChange}
                value={state.name}
                name="name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lws-author">Author</label>
              <input
                required
                className="text-input"
                type="text"
                id="lws-author"
                onChange={handleChange}
                value={state.author}
                name="author"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lws-thumbnail">Image Url</label>
              <input
                required
                className="text-input"
                type="text"
                id="lws-thumbnail"
                onChange={handleChange}
                value={state.thumbnail}
                name="thumbnail"
              />
            </div>

            <div className="grid grid-cols-2 gap-8 pb-4">
              <div className="space-y-2">
                <label htmlFor="lws-price">Price</label>
                <input
                  required
                  className="text-input"
                  type="number"
                  id="lws-price"
                  onChange={handleChange}
                  value={state.price}
                  name="price"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lws-rating">Rating</label>
                <input
                  required
                  className="text-input"
                  type="number"
                  id="lws-rating"
                  onChange={handleChange}
                  value={state.rating}
                  name="rating"
                  min="1"
                  max="5"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="lws-featured"
                type="checkbox"
                onChange={handleChange}
                checked={state.featured}
                name="featured"
                className="w-4 h-4"
              />
              <label htmlFor="lws-featured" className="ml-2 text-sm">
                {" "}
                This is a featured book{" "}
              </label>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="submit"
              id="lws-submit"
            >
              {pathname === "/books/add" ? "Add Book" : "Edit Book"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ControlPage;
