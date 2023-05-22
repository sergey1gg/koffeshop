import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";

import UserService from "../services/user.service"
import Header from  "../components/Header"
import Footer from  "../components/Footer"
import { Addition } from "../components/Addition"


const AdditionPage = (props) => {
  const {productId} = useParams();
  const navigate = useNavigate();
  const [addition, setAddition] = useState(null);
  const [message, setMessage] = useState(null);
  // console.log(useParams())

  useEffect(() => {
    UserService.getProductsContent(props.product).then(
      response => {
        // console.log(response.data.products);
        //const products_array = response.data.products;
        if (response.data.products.length > 0) {
          setAddition(response.data.products);
        } else {
          navigate('/cart', {replace: true});
        }
        
      },
      error => {
        setMessage((error.response && error.response.data) || error.message || error.toString());
      }
    );
  }, [props.product])
  

  return(
    <main>
      {addition && (
        <div className='additions'>
          {addition.map(el => (
            <Addition key={el.id} addition={el} parant={props.product} onAdd={props.onAdd}/>
            ))}
        </div>
      )}
      <Footer />
    </main>
  )
}

export { AdditionPage }
