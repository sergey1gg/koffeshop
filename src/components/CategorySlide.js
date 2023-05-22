import React, { useCallback } from 'react'
//import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";


const CategorySlide = (props) => {

  console.log(props);

  //const navigate = useNavigate();
  //const handleOnClick = useCallback(() => navigate('/products', {replace: true, state: props.category.id}), [navigate]);
  //const prodOnClick = () => navigate('/products', {replace: true, state: props.category.id});
  return(
      <div className='category_slide'>
        {props.categories.map(el => (
          <div key={el.id} onClick={() => props.chooseCategory(el.key)}>{el.name}</div>
        )) }
      </div>
  )

}

export { CategorySlide }