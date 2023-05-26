import React, { useState, useEffect } from 'react'
import { useNavigate , Link } from "react-router-dom";
import Select from 'react-select'
import UserService from "../services/user.service"
import Modal from "./Modal"
import { LocationItem } from "../components/Location"
// import { FiShoppingCart } from 'react-icons/fi';
import ShoppingCart from '../svg/shopping-cart1.svg';
import SvgAccount from '../svg/account1.svg';
// import Badge from 'react-bootstrap/Badge'
import AuthService from "../services/auth.service";
import preloader from "../common/preloader.gif"


export default function Header(props) {

  const navigate = useNavigate();
  const user = props.user;

  const [modalActive, setModalActive] = useState(false);
  const [citiesOption, setCitiesOption] = useState(null);
  const [locationOption, setLocationOption] = useState(null);
  const [location, setLocation] = useState(null);
  const [lock, setLock] = useState(null);

  const [error, setError] = useState(null);
  const [intervalValue, setInternalValue] = useState(2000);
  const [countdown, setCountdown] = useState(intervalValue / 1000);


useEffect(() => {
  if (modalActive) {
    // Начинаем отсчет таймера
    setInternalValue((prevIntervalValue) => prevIntervalValue + 2000);
    // Запускаем таймер для каждой итерации
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1 && error) {
          cityList();
          return (intervalValue + 2000) / 1000;
        } else {
          return prevCountdown - 1;
        }
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }
}, [error, modalActive, setCountdown, setInternalValue]);

  useEffect(() => {
    if (!location) {
      console.log('location is undefined');
      cityList();
      getLocation();
    }
    getLockSettings();
  }, [modalActive]);

  const getLockSettings = async () => {
    const user_info = await AuthService.getUserInfo();
    console.log(user_info.data);
    if (user_info.data.lock_settings === 'true') {
      console.log('setLock');
      setLock(true);
    } else {
      console.log('unLock');
      setLock(false);
    }
  }

  const getLocation = () => {
    const store_location = UserService.getCurrentLocation();
    console.log("location",store_location);
    if (store_location) {
      setModalActive(false);
      setLocation(store_location);
      props.setKioskId(store_location.kiosk_id);
    } else {
      setModalActive(true);
    }
  }

  const cityList = () => {
    UserService.getSityList(props.country).then(
      response => {
        console.log(response.data.cities);
        let cities_array = [];
        let cities_array_src = response.data.cities;
        cities_array_src.map(function(el, i){
          let sity = {
            value: el,
            label: el
          }
          cities_array[i] = sity;    
        })
        setCitiesOption(cities_array);
      },
      error => {
        setError((error.response && error.response.data) || error.message || error.toString());
      }
    );
  }

  function LoginButton(props) {
    return (
      <div id='login_btn' className='no_login_btn' onClick={props.goToLogin}>
        <img src={SvgAccount} className='image_account' onClick={props.goToCart}/>
        <div className='user_block'>
          Войти
        </div>
      </div>
    );
  }
  
  function ProfileButton(props) {
    return (
      <div className='user_block'>
          <div className='icon_wrapper'>
            {/* <FiShoppingCart className='shop_cart_button' onClick={props.goToCart}/> */}
            <img src={ShoppingCart} className='shop_cart_button' onClick={props.goToCart}/>
            {!!props.orders.length && <div>{props.orders.length}</div>}
          </div>
          <img src={SvgAccount} className='image_account' onClick={props.goToProfile}/>
          <div id='login_btn' onClick={props.goToProfile}>
            {user.name}
          </div>
      </div>
    );
  }

  // const chackLock = () => {
  //   console.log("chek_locking",info);
  //   if (info.lock_settings) {

  //   } 
  // }

  const handleLoginClick = () => {
    navigate('/login');
  }

  const handleProfileClick = (porps) => {
    navigate('/profile', {replace: true});
  }

  const handleCartClick = (porps) => {
    navigate('/cart');
  }

  const handleCloseClick = () => {
      setModalActive(false);
      }


  const handleChange = (selectedOption) => {
    console.log("handleChange", selectedOption.value);
    UserService.getLocationList(props.country, selectedOption.value).then(
      response => {
        console.log(response.data.locations);
        setLocationOption(response.data.locations);
      },
      error => {
        console.log(error);
        //setMessage((error.response && error.response.data) || error.message || error.toString());
      }
    );
  }

  const handleChoosed = (Item) => {
    console.log("handleChoosed", Item);
    localStorage.setItem("location", JSON.stringify(Item));
    setLocation(Item);
    props.setKioskId(Item.kiosk_id);
    setModalActive(false);
    navigate('/', {replace: true});
    window.location.reload();
  }

  return (
    <header>
      <div className="first_group_header">
        <div className="logo"> 
            <a href="/">
            <img src="./img/logo.png" alt="logo"/>
            </a>
        </div>
        {location && (
            <div className='kiosk_info' onClick={() => setModalActive(true)}  style={{ pointerEvents: lock ? 'none' : 'auto' }}>
                <span className='kiosk_name'>{location.name}</span><br/>
                <span className='wokr_time'> с {location.start_day} до {location.end_day}</span>
            </div>
        )}
      </div>
      <div className='user_enter' style={{ pointerEvents: lock ? 'none' : 'auto' }}>
        {user
          ? <ProfileButton goToProfile={() => handleProfileClick()} goToCart={() => handleCartClick()}  orders={props.orders}/>
          : <LoginButton goToLogin={() => handleLoginClick()} />
        }
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        {citiesOption ?(
        <Select options={citiesOption} onChange={handleChange} placeholder={'Выберите город'}/>
        ):(
          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
       <h5>Один момент</h5>
       <div>
   <img src={preloader} style={{width: '133px'}} alt="Loading..." />
 </div>
       <div style={{ fontSize: "14px" }}>{countdown} сек.</div>
     </div>
        )}
        {locationOption && (
          <div className='location_items'>
          {locationOption.map(el => (
            <LocationItem key={el.kiosk_id} loc={el} onSelect={handleChoosed}/>
            ))}
        </div>
        )}
        <button className='close_location' onClick={handleCloseClick}>Закрыть</button>
      </Modal>
    </header>
  )
}
