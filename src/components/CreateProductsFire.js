import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { db } from "../config/config";
import { collection, addDoc } from "firebase/firestore"


const MySwal = withReactContent(Swal)


const CreateProductsFire = () => {
  const [product, setProducts] = useState({
    title: "",
    description: "",
    stock: 0
  })
  //Sin refactor
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [stock, setStock] = useState(0);

  const navigate = useNavigate();

  const productCollection = collection(db, "Products");

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await addDoc(productCollection, product);

      MySwal.fire({
        title: "Created!",
        text: "Your product has been created.",
        icon: "success",
        confirmButtonText: "Ok",
      });

      console.log("addProduct");
      navigate("/productsfire")
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: "Your product has not been created.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      navigate("/productsfire")
    }

  };

  const handleChange = (e) => {
    setProducts({
      ...product,
      [e.target.name]: e.target.value
    })
  };

  return (
    <div>
      <h1>Create Products Fire</h1>
      <form onSubmit={addProduct}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={product.title}
          //onChange={(e) => setTitle(e.target.value)}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          //onChange={(e) => setDescription(e.target.value)}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="stock"
          value={product.stock}
          //onChange={(e) => setStock(e.target.value)}
          onChange={handleChange}
        />
        <Button variant="success" type="submit">Create Product</Button>
      </form>
    </div>
  );
};
export default CreateProductsFire;
