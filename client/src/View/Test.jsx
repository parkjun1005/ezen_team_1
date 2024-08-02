import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../service/ApiService';

function Test() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        console.log('Fetched products:', data); // 데이터 확인용
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.productId.toString()}> {/* 고유 ID를 문자열로 변환하여 key로 사용 */}
            <h2>{product.name}</h2>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
            <img src={product.mainImageUrl} alt={product.name} />
            <img src={product.subImageUrl} alt={product.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Test;
