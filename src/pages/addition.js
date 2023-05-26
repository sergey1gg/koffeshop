import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";

import UserService from "../services/user.service"
import Header from  "../components/Header"
import Footer from  "../components/Footer"
import { Addition } from "../components/Addition"
import preloader from "../common/preloader.gif"

const AdditionPage = (props) => {
  const {productId} = useParams();
  const navigate = useNavigate();
  const [addition, setAddition] = useState(null);
  
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [intervalValue, setInternalValue] = useState(2000);
  const [countdown, setCountdown] = useState(intervalValue / 1000);

  // console.log(useParams())

  const getProducts = (categoryId) => {
    setIsLoading(true);
    UserService.getProductsContent(categoryId)
    .then(
      response => {
        // console.log(response.data.products);
        //const products_array = response.data.products;
        if (response.data.products.length > 0) {
          setAddition(response.data.products);
          setIsLoading(false);
          setError(null);
        } else {
          navigate('/cart', {replace: true});
        }
        
      },

    ).catch((error) => {
      setIsLoading(false);
      setAddition(null);
      setError(error.response?.data || error.message || error.toString());
    });
  };

useEffect(() => {
   getProducts(props.product)
}, [props.product])
  
useEffect(() => {
  const handleRefresh = () => {
    getProducts(props.product);
    setInternalValue((prevIntervalValue) => prevIntervalValue + 2000);
  };
  const countdownInterval = setInterval(() => {
    setCountdown((prevCountdown) => {
      if (prevCountdown <= 1 && error) {
        handleRefresh();
        return (intervalValue + 2000) / 1000;
      } else {
        return prevCountdown - 1;
      }
    });
  }, 1000);

  return () => clearInterval(countdownInterval);
}, [props.product, error]);

  return(
    <main>
      {addition && (
        <div className='additions'>
          {addition.map(el => (
            <Addition key={el.id} addition={el} parant={props.product} onAdd={props.onAdd}/>
            ))}
            {isLoading && <div>Loading...</div>}
        </div>
      )}
            {error && (
       <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", marginTop: "50px", alignItems: "center", width: "100px" }}>
       <h5>Один момент</h5>
       <div>
   <img src={preloader} style={{width: '133px'}} alt="Loading..." />
 </div>
       <div style={{ fontSize: "14px" }}>{countdown} сек.</div>
     </div>
      )}
      <Footer />
    </main>
  )
}

export { AdditionPage }
