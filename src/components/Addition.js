import { Link } from "react-router-dom";


const Addition = (props) => {

  let addition = {
    id: props.addition.id,
    tovarId: props.addition.tovarId,
    capacity: props.addition.capacity,
    name: props.addition.name,
    description: props.addition.description,
    picture: props.addition.picture,
    price: props.addition.price,
    promo_code: null,
  } 
  
  return (
    <Link to={"/cart"} className='product' onClick={() => props.onAdd(addition)}>
      <div >
        <img src={"/" + props.addition.picture + ".jpg"} alt='product'></img>
        <h2 className="img-block-title">{props.addition.name}</h2>
        <div>
            <span className="img-block-subtitle">{props.addition.price}  ₽</span>
            <span className="img-block-subtitle">{props.addition.capacity} мл</span>
        </div>
      </div>
    </Link>
  )
}

export { Addition } 