import React, { useCallback } from 'react'
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";


const Category = (props) => {

  // console.log(props);

  const navigate = useNavigate();
  //const handleOnClick = useCallback(() => navigate('/products', {replace: true, state: props.category.id}), [navigate]);
  const prodOnClick = () => {
    props.setCategory(props.category.id);
    navigate('/products');
  }

  return(
      <div className='category' onClick={prodOnClick}>
        <img src={props.category.picture + ".jpg"}></img>
        <h2 className="img-block-title">{props.category.name}</h2>
        <h3 className="img-block-subtitle">{props.category.note}</h3>
      </div>
  )

}

export { Category }