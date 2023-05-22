import { useState, useEffect, useCallback } from "react";
import UserService from "../services/user.service"
import Header from  "../components/Header"
import Footer from  "../components/Footer"
import {Category} from "../components/Category"

const MenuPage = (props) => {
  const intervalValue = 15000;
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
  }, [props.kioskId, isClose, error]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          if (error) {
            handleRefresh()
            setCountdown(intervalValue / 1000);
            getCategory(props.kioskId);
          }
        } else {
          return prevCountdown - 1;
        }
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [props.kioskId, intervalValue, isClose, error]);

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
          <h3>Ошибка</h3>
          <button onClick={handleRefresh} style={{ background: "#F72331", color: "white", padding: "10px", marginTop: "20px", border: "none", width: "100%" }}>
            Refresh
          </button>
          <div style={{ marginTop: "10px", fontSize: "14px" }}>{countdown} сек.</div>
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
