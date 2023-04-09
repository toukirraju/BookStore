import React from "react";
import { useGetBooksQuery } from "../redux/features/api/apiSlice";
import BookCard from "./BookCard";
import { useSelector } from "react-redux";

const BooksGrid = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const { filterType, searchKeyword } = useSelector((state) => state.book);

  //decide what to render
  let content = null;
  if (isLoading) {
    content = <h2>Loading...</h2>;
  }
  if (!isLoading && isError) {
    content = <h2>Something want wrong!</h2>;
  }

  if (!isLoading && !isError && books?.length === 0) {
    content = <h2>No books found!</h2>;
  }

  if (!isLoading && !isError && books?.length > 0) {
    content = books
      ?.filter((book) => {
        switch (filterType) {
          case "all":
            return book;
          case "featured":
            return book.featured;
          default:
            return book;
        }
      })
      .filter((book) => {
        const formattedTitle = book.name.toUpperCase().replace(/\s+/g, "");
        const formattedSearchKeyword = searchKeyword.toUpperCase();
        return formattedTitle.includes(formattedSearchKeyword);
      })
      .map((book) => <BookCard key={book.id} book={book} />);
  }
  return (
    <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* <!-- Card  --> */}
      {content}
    </div>
  );
};

export default BooksGrid;
