import React from 'react';
import { useEffect, useState } from "react";

let apiURL = "http://localhost:3001";
const list = async () => {
  try {
    let response = await fetch(apiURL + '/ad/list', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return await response.json();
  } catch (err) {
    console.log(err)
  }
}

/*function ProductList() {
  const products = [
    {
      id: 1,
      name: "Used Laptop",
      price: "$500",
      image: "/images/laptop.jpg",
      link: "/product/1"
    },
    {
      id: 2,
      name: "Vintage Chair",
      price: "$150",
      image: "/images/chair.jpg",
      link: "/product/2"
    },
    // Add more products as needed
  ];

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <a href={product.link}>View Details</a>
        </div>
      ))}
    </div>
  );
}
*/

const ProductList = () => {
  let [adList, setAdList] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    list().then((data) => {
      if (data) {
        setAdList(data);
        setIsLoading(false);
      }
    }).catch(err => {
      alert(err.message);
      console.log(err);
    });
  }, []);

  return (
    <div className="table-responsive">
      {isLoading && <div>Loading...</div>}
      {!isLoading &&
        <div className="product-grid">
          {adList.map((ad, i) => {
            return (
              <div key={i} className="product-card">
                <h3>{ad.title}</h3>
                <p>{ad.price}</p>
              </div>
            )
          })}
        </div>
      }
    </div>
  );
};

export default ProductList;