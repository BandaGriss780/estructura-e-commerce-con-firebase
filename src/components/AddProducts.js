import React, { useState } from 'react'
import { storage, db } from '../config/config'

export const AddProducts = () => {

  const [productsName, setProductName] = useState("");
  const [productsPrice, setProductPrice] = useState(0);
  const [productsImg, setProductImg] = useState(null);
  const [error, setError] = useState('');

  const types = ['image/png', 'image/jpeg']; // image types

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError('')
    }
    else {
      setProductImg(null);
      setError('Please select a valid image type (jpg or png)');
    }
  }
  // add product
  const addProduct = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`product-images/${productsImg.name}`).put(productsImg);
    uploadTask.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
    }, err => setError(err.message)
      , () => {
        storage.ref('product-images').child(productsImg.name).getDownloadURL().then(url => {
          db.collection('Products').add({
            ProductName: productsName,
            ProductPrice: Number(productsPrice),
            ProductImg: url
          }).then(() => {
            setProductName('');
            setProductPrice(0)
            setProductImg('');
            setError('');
            document.getElementById('file').value = '';
          }).catch(err => setError(err.message))
        })
      })
  }

  return (
    <div className='container'>
      <br />
      <h2>ADD PRODUCTS</h2>
      <hr />
      <form autoComplete="off" className='form-group' onSubmit={addProduct} >
        <label htmlFor="product-name">Product Name</label>
        <br />
        <input type="text" className='form-control' required
          onChange={(e) => setProductName(e.target.value)} value={productsName} />
        <br />
        <label htmlFor="product-price">Product Price</label>
        <br />
        <input type="number" className='form-control' required
          onChange={(e) => setProductPrice(e.target.value)} value={productsPrice}
        />
        <br />
        <label htmlFor="product-img">Product Image</label>
        <br />
        <input type="file" className='form-control' id="file" onChange={productImgHandler} />
        <br />
        <button className='btn btn-success btn-md mybtn'>ADD</button>

      </form>
      {error && <span>{error}</span>}

    </div>
  )
}
