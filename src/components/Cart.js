import React, { useCallback } from 'react'
//import {useNavigate} from 'react-router-dom';
//import { Link } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';


const CartItem = (props) => {

    let summa = props.product.price;
    props.product.additionals.forEach(el => summa += Number.parseFloat(el.price))
 
    return(
        <div className='cart_item'>
            <img src={props.product.picture}></img>
            <hr className='hr_100vw'/>
            <div className='card_name_and_sum'>
                <div>
                    <h2 className="img-block-title">{props.product.name}</h2>
                    <p>{props.product.note}</p>
                </div>
                {/* <FaTrash className='delete-icon' onClick={() => props.onDelete(props.product.id) } /> */}
                <p>{props.product.price} ₽</p>
            </div>
            <hr />
            {props.product.additionals.map((el, index) => (
                    <div className='card_name_and_sum' key={index}>
                        <div>
                            <h2 className="img-block-title">{el.name}</h2>
                            <p>{el.note}</p>
                        </div>
                        {/* <FaTrash className='delete-icon' onClick={() => props.onDelete(props.product.id) } /> */}
                        <p>{el.price} ₽</p>
                    </div>             
            ))}
            <hr />
        </div>
    )
}

const CartItems = (props) => {

    let summa = props.product.price;
    props.product.additionals.forEach(el => summa += Number.parseFloat(el.price))
  
    return(
        <div className='cart_item'>
            <img src={props.product.picture + ".jpg"}></img>
            <div className='card_name_and_sum'>
                <div>
                    <h2 className="img-block-title">{props.product.name}</h2>
                </div>
                <div className='second_div'>
                    <p>{summa} ₽</p>
                    <p>{props.product.capacity} мл</p>
                </div>
                <div>
                    {props.product.additionals.map((el,index) => (
                        <span key={index}>{el.name}</span>
                    ))}
                </div>
            {/* <p>{props.product.price} ₽</p> */}
            </div>
            <div className='wrapper_delete-icon'>
                <FaTrash className='delete-icon' onClick={() => props.onDelete(props.product.id) } />
            </div>
        </div>
    )
}

export { CartItem, CartItems }