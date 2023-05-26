import { useState, useEffect, useCallback } from "react";
import UserService from "../services/user.service"
import Header from  "../components/Header"
import Footer from  "../components/Footer"
import {Category} from "../components/Category"
import preloader from '../common/preloader.gif'
const MenuPage = (props) => {
  const [intervalValue, setInternalValue] = useState(2000);
  const [categories, setCategories] = useState(null);
  const [isClose, setIsClose] = useState(null);
  const [closeImg, setCloseImg] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(intervalValue / 1000);

  const getCategory = (kioskId) => {
    if (kioskId) {
      setIsLoading(true);
      UserService.getCategiriesContent(kioskId)
        .then((response) => {
          setIsLoading(false);
          console.log(response.data.menu);
          if (response.data.isOpen === 1) {
            setCategories(response.data.menu);
            props.storCategories(response.data.menu);
            setIsClose(null);
            setError(null);
          } else {
            const url_img = `https://app.robottod.ru:9007/img/kiosk/${kioskId}/close.png`;
            setCloseImg(url_img);
            setIsClose(true);
            setError(null);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error.response?.data?.message || error.message || error.toString());
        });
    }
  };

  useEffect(() => {
    getCategory(props.kioskId);
    const interval = setInterval(() => {
      if (isClose && !error) {
        getCategory(props.kioskId);
      }
    }, intervalValue);

    return () => clearInterval(interval);
  }, [props.kioskId, isClose, error, intervalValue]);

  useEffect(() => {
    const handleRefresh = () => {
      getCategory(props.kioskId);
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
  }, [props.kioskId, intervalValue, error]);
  const handleRefresh = () => {
    getCategory(props.kioskId);
    setCountdown(intervalValue / 1000);
  };
  return (
    <main>
      <div>
        <span className="hello_menu">Всегда вам рады!</span>
        {/* <span className="choice_a_drink">Сделайте заказ</span> */}
      </div>
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
      {!isLoading && !error && categories && (
        <div className="categories">
          {categories.map((el) => (
            <Category key={el.id} category={el} onAdd={props.onAdd} setCategory={props.setCategory} />
          ))}
        </div>
      )}
      {isClose && (
        <div className="content">
          <img src={closeImg} alt="Closed" />
        </div>
      )}
    </main>
  );
};

export {MenuPage}
