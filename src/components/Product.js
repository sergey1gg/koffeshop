import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';


const Product = (props) => {

  const navigate = useNavigate();

  let product = {
    id: props.product.id,
    tovarId: props.product.tovarId,
    capacity: props.product.capacity,
    note: props.product.note,
    name: props.product.name,
    description: props.product.description,
    picture: props.product.picture,
    additionals: [],
    price: props.product.price,
    total_price: props.product.price,
    promo_code: null,
  } 


  const additionalOnClick = () => {
    props.onAdd(product, 'product');
    navigate('/additional');
  }
  
  return (
    <div  className='product' onClick={additionalOnClick}>
      <img src={"/" + props.product.picture} alt='product'></img>
      <h2 className="img-block-title">{props.product.name}</h2>
      <div>
        <span className="img-block-subtitle">{props.product.price}  ₽</span>
        <span className="img-block-subtitle">{props.product.note}</span>
      </div>
  </div>
  )
}

export  { Product }