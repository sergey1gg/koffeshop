import React, { Component } from 'react';
import { useRef, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';


const ItemBarCategory = (props) => {

  const [style, setStyle] = useState(null);
  
  const handleClick = () => {
    // console.log('onSwitch category' + props.category.id);
    props.onSwitchCategory(props.category.id)
    props.setActive(props.category.id)
  }; 

  useEffect(() => {
    // console.log('check active stile');
    if (props.isActiveId == props.category.id) setStyle('active_product');
    else setStyle(null);

    }, [props.isActiveId])
  
  return (
    <div className={style} onClick={handleClick}>
      {props.category.name}
    </div>
  )
}

export  { ItemBarCategory }