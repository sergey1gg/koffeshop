import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

import UserService from "../services/user.service"
import { Product } from "../components/Product"
import { ItemBarCategory } from "../components/ItemSlideBar"

import preloader from "../common/preloader.gif"
const ProductsPage = (props) => {
  const [categoryId, setCategoryId] = useState(props.category);
  const [products_list, setProducts_list] = useState(null);
  const categoryList = props.categories;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [intervalValue, setInternalValue] = useState(2000);
  const [countdown, setCountdown] = useState(intervalValue / 1000);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  const getProducts = (categoryId) => {
    setIsLoading(true);
    UserService.getProductsContent(categoryId)
      .then((response) => {
        setIsLoading(false);
        console.log(response.data.products);
        setProducts_list(response.data.products);
        setError(null);
      })
      .catch((error) => {
        setIsLoading(false);
        setProducts_list(null);
        setError(error.response?.data || error.message || error.toString());
      });
  };

  useEffect(() => {
    getProducts(categoryId);
  }, [categoryId]);

  useEffect(() => {
    const handleRefresh = () => {
      getProducts(categoryId);
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
  }, [categoryId, error]);

  const handleRefresh = () => {
    getProducts(categoryId);
    setCountdown(intervalValue / 1000);
  };
 
  const handleClick = (id) => {
    console.log('onSwitch category' + id);
    setCategoryId(id);
  };

  const setActiveCategory = (id) => {
    console.log('onSwitch category' + id);
    setCategoryId(id);
  };

  return (
    <main>
      {categoryList && (
        <div className="switch_categories">
          {categoryList.map((el) => (
            <ItemBarCategory key={el.id} category={el} isActiveId={categoryId} onSwitchCategory={handleClick} setActive={setActiveCategory} />
          ))}
        </div>
      )}

      {isLoading && <div>Loading...</div>}
      {error && (
       <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", marginTop: "50px", alignItems: "center", width: "100px" }}>
       <h5>Один момент</h5>
       <div>
   <img src={preloader} style={{width: '133px'}} alt="Loading..." />
 </div>
       <div style={{ fontSize: "14px" }}>{countdown} сек.</div>
     </div>
      )}

      {!isLoading && !error && products_list && (
        <div className='products'>
          {products_list.map((el) => (
            <Product key={el.id} product={el} onAdd={props.onAdd} />
          ))}
        </div>
      )}
    </main>
  );
};

export { ProductsPage }