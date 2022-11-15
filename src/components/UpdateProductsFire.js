import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { db } from "../config/config";
import { getDoc, doc, updateDoc } from "firebase/firestore";



const UpdateProductsFire = () => {
  const [Titulo, setTitulo] = useState("");
  const [Precio, setPrecio] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();


  const getProductByID = async (id) => {
    const productRef = doc(db, "Products", id);
    const productSnap = await getDoc(productRef);
    console.log(productSnap);
    if (productSnap.exists()) {
      setPrecio(productSnap.data().Precio);
      setTitulo(productSnap.data().Titulo);
    } else {
      alert("No such document!");
      navigate("/productsfire");
    }
  };

  const editProduct = async (e) => {
    e.preventDefault();
    const productRef = doc(db, "Products", id);
    const newData = {
      Titulo,
      Precio,
    };
    try {
      await updateDoc(productRef, newData);
      navigate("/productsfire");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductByID(id)
  }, [id]);

  return (
    <div>
      <h1>Update Products Fire</h1>
      <form onSubmit={editProduct} >
        <input
          type="text"
          name="Titulo"
          placeholder="Title"
          value={Titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="number"
          name="Precio"
          value={Precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <Button type="submit">Update Product</Button>
      </form>
    </div>
  );
};
export default UpdateProductsFire;
