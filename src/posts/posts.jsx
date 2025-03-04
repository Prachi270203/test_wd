import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "react-bootstrap";

function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [post, setPost] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const filteredPosts = post.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPost(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="fw-bold text-center mb-5 mx-5 mt-5">Posts</h1>

        <input
          type="search"
          id="form1"
          className="form-control mb-3"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by title..."
        />

        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Body</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <tr key={post.id}>
                  <th scope="row">{post.id}</th>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-danger">
                  No results found!
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <Pagination className="justify-content-center mt-4">
            <Pagination.Prev
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages).keys()].map((number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        )}
      </div>
    </>
  );
}

export default Posts;
