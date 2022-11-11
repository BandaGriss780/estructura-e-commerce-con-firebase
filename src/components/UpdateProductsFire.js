import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { db } from "../config/config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";


const UpdateProductsFire = () => {
  const [title, setTitle] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const editProduct = () => {
    console.log("id", id);
  }

  return (
    <div>
      <h1>Update Products Fire</h1>
      <form onSubmit={editProduct} >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          name="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit">Update Product</Button>
      </form>
    </div>
  );
};
export default UpdateProductsFire;
