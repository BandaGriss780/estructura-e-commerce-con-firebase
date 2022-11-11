import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Button } from "react-bootstrap"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const ProductsFire = () => {

  const [products, setProducts] = useState([])
  //Se llama a las colecciones de productos pasando como parametro la referencia a la base de datos y la coleccion que queremos recuperar
  const productsCollection = collection(db, "Products");
  console.log("productsCollection", productsCollection);

  //Recuperamos los productos de la colleccion
  const getProducts = async () => {
    const dataProducts = await getDocs(productsCollection)
    console.log("dataProducts", dataProducts);
    setProducts(dataProducts.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  console.log("products", products);

  const confirmDeleteProduct = (id) => {
    MySwal.fire({
      title: 'Are you sure to delete this product?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        MySwal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  //funcion para borrar un producto en particular y actualizar el front 
  const deleteProduct = async (id) => {
    const productToDelete = doc(db, "Products", id);
    try {
      await deleteDoc(productToDelete);
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: "Your product has not been deleted",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    getProducts();
  };
  //console.log("Vamos a Borrar", productToDelete);
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>Products Fire</h1>
      <Link to="/createproductsfire">
        <Button variant="success">Create Product</Button>
      </Link>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.id}</p>
            <Button onClick={() => confirmDeleteProduct(product.id)} variant="danger">Delete Products</Button>
            <Link to="/UpdateProductsFire">
              <Button>Update Products</Button>
            </Link>
          </div>
        )
      })}
    </div>
  );
};

export default ProductsFire;



