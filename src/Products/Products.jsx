// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Button, Spinner, Pagination, Container } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../CartItems/CartItems";

// function Products() {
//   //   const { addToCart } = useCart();
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [sortOrder, setSortOrder] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("https://dummyjson.com/products");
//         setProducts(response.data.products);
//         setFilteredProducts(response.data.products);
//         const uniqueCategories = [
//           "All",
//           ...new Set(response.data.products.map((p) => p.category)),
//         ];
//         setCategories(uniqueCategories);
//       } catch (error) {
//         console.error("Error fetching products", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     let filtered = products.filter((product) =>
//       product.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     if (selectedCategory !== "All") {
//       filtered = filtered.filter(
//         (product) => product.category === selectedCategory
//       );
//     }

//     if (sortOrder === "lowToHigh") {
//       filtered.sort((a, b) => a.price - b.price);
//     } else if (sortOrder === "highToLow") {
//       filtered.sort((a, b) => b.price - a.price);
//     }

//     setFilteredProducts(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, selectedCategory, sortOrder, products]);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredProducts.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <Container fluid className="mt-4">
//       <h2 className="text-center mb-4">Products</h2>

//       <Container className="overflow-auto">
//         <div className="row mb-3">
//           <div className="col-md-4">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by title..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="col-md-3">
//             <select
//               className="form-control"
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             >
//               {categories.map((category, index) => (
//                 <option key={index} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-md-3">
//             <select
//               className="form-control"
//               value={sortOrder}
//               onChange={(e) => setSortOrder(e.target.value)}
//             >
//               <option value="">Sort by Price</option>
//               <option value="lowToHigh">Low to High</option>
//               <option value="highToLow">High to Low</option>
//             </select>
//           </div>
//         </div>

//         {loading ? (
//           <div className="text-center">
//             <Spinner animation="border" />
//           </div>
//         ) : currentItems.length === 0 ? (
//           <p className="text-center">No products found.</p>
//         ) : (
//           <div className="row">
//             {currentItems.map((product) => (
//               <div key={product.id} className="col-md-4 mb-4">
//                 <Card className="h-100 shadow-sm">
//                   <Card.Img
//                     variant="top"
//                     src={product.thumbnail}
//                     alt={product.title}
//                     height="200px"
//                   />
//                   <Card.Body>
//                     <Card.Title>{product.title}</Card.Title>
//                     <Card.Text>Price: ${product.price}</Card.Text>
//                     <Card.Text>Category: {product.category}</Card.Text>
//                     <Button variant="primary">Add to Cart</Button>
//                   </Card.Body>
//                 </Card>
//               </div>
//             ))}
//             <Button variant="primary" onClick={() => navigate("/cartItems")}>
//               Go to cart
//             </Button>
//           </div>
//         )}

//         {totalPages > 1 && (
//           <Pagination className="justify-content-center mt-4">
//             <Pagination.Prev
//               onClick={() => paginate(currentPage - 1)}
//               disabled={currentPage === 1}
//             />
//             {[...Array(totalPages).keys()].map((number) => (
//               <Pagination.Item
//                 key={number + 1}
//                 active={number + 1 === currentPage}
//                 onClick={() => paginate(number + 1)}
//               >
//                 {number + 1}
//               </Pagination.Item>
//             ))}
//             <Pagination.Next
//               onClick={() => paginate(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             />
//           </Pagination>
//         )}
//       </Container>
//     </Container>
//   );
// }

// export default Products;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Spinner, Pagination, Container } from "react-bootstrap";
import { useCart } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom";
function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        const uniqueCategories = [
          "All",
          ...new Set(response.data.products.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortOrder, products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid className="mt-4">
      <h2 className="text-center mb-4">Products</h2>

      <Container className="overflow-auto">
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort by Price</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : currentItems.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          <div className="row">
            {currentItems.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={product.thumbnail}
                    alt={product.title}
                    height="200px"
                  />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>Price: ${product.price}</Card.Text>
                    <Card.Text>Category: {product.category}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
            <Button variant="primary" onClick={() => navigate("/cartItem")}>
              Go to Cart
            </Button>
          </div>
        )}

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
      </Container>
    </Container>
  );
}
export default Products;
