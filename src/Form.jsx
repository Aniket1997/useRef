import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = () => {
  const [productName, setProductName] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productRating, setProductRating] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://shopping-fc0d9-default-rtdb.firebaseio.com/products.json');
        const fetchedProducts = [];

        for (let key in response.data) {
          fetchedProducts.push({
            id: key,
            productName: response.data[key].productName,
            productTitle: response.data[key].productTitle,
            productRating: response.data[key].productRating,
            price: response.data[key].price,
            image: response.data[key].image
          });
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { productName, productTitle, productRating, price, image };

    try {
      const response = await axios.post('https://shopping-fc0d9-default-rtdb.firebaseio.com/products.json', data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    setProductName('');
    setProductTitle('');
    setProductRating('');
    setPrice('');
    setImage('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
        />

        <label htmlFor="productTitle">Product Title:</label>
        <input
          type="text"
          id="productTitle"
          value={productTitle}
          onChange={(event) => setProductTitle(event.target.value)}
        />

        <label htmlFor="productRating">Product Rating:</label>
        <input
          type="number"
          id="productRating"
          min="1"
          max="5"
          value={productRating}
          onChange={(event) => setProductRating(event.target.value)}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />

        <label htmlFor="image">Image:</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <div className="row row-cols-1 row-cols-md-3 g-4">
  {products.map((product) => (
    <div className="col" key={product.id}>
      <div className="card h-100">
        <img src={product.image} className="card-img-top" alt={product.productName} />
        <div className="card-body">
          <h5 className="card-title">{product.productName}</h5>
          <p className="card-text">{product.productTitle}</p>
          <p className="card-text">Rating: {product.productRating}</p>
          <p className="card-text">Price: {product.price}</p>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Form;
