import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Keyboard from 'react-simple-keyboard';
import PinInput from "react-pin-input";
import "react-simple-keyboard/build/css/index.css";
import { FaTrash } from 'react-icons/fa';

import UserService from "../services/user.service"
import Footer from  "../components/Footer2"
import { CartItem, CartItems } from "../components/Cart"
import Modal from "../components/Modal"
import Arrow from '../svg/body.svg';

const CartPage = (props) => {

  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [displayActiv, setDisplayActiv] = useState('none');
  const [displayOneItem, setDisplayOneItem] = useState('none');
  const [displayArrayItems, setDisplayArrayItems] = useState('none');
  
  const [modalOpen,setModalOpen]=useState(false)

  const navigate = useNavigate();
  const keyboard = useRef();
  let pin = useRef();

  let orderLenght = 0;
  let summa = 0;
  props.orders.forEach(el => {
    summa += Number.parseFloat(el.price);
    el.additionals.forEach(ad => summa += Number.parseFloat(ad.price))
  })

  const StartPay = () => {
    console.log(props.orders);
    // alert("StartPay!");
    UserService.postOrderData(props.kioskId, props.orders).then(
      response => {
        console.log(response.data);
        if (response.data.order_id == null) {
          navigate('/', { replace: true });
        } else {
          props.setOrderId(response.data.order_id);
          navigate('/pay', { replace: true });
        }
        
      },
      error => {
        if(error.response.status===401){
          navigate('/login', { replace: true });
        }
        else {
          setModalOpen(true);
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 5000)
        }
      }
    );
  }

  const handleCloseClick=()=>{
    setModalOpen(false)
    navigate('/', { replace: true });
  }
  
  useEffect(() => {
    console.log(props.orders);
    orderLenght = props.orders.length;
    if (props.orders.length > 0) {
      if (props.orders.length > 1) {
        setDisplayOneItem('none');
        setDisplayArrayItems('block');
      } else {
        setDisplayOneItem('block');
        setDisplayArrayItems('none');
      }
      setDisplayActiv('block');
    } else {
      setDisplayActiv('none');
    }
  }, [props.orders])


  const onKeyPress = (button) => {
    console.log("onKeyPress", button);
    
    if (button === "{cancel}") {
      handleClear();
      setModalActive(false);
    }
    if (button === "{clear}") {
      handleClear();
    } else {
      if (pin.elements[4].state.value) {
        pin.elements[5].state.value = button;
        setTimeout(onSubmitHandler, 1000);
        return;
      }
      if (pin.elements[3].state.value) {
        pin.elements[4].state.value = button;
        return;
      }
      if (pin.elements[2].state.value) {
        pin.elements[3].state.value = button;
        return;
      }
      if (pin.elements[1].state.value) {
        pin.elements[2].state.value = button;
        return;
      }
      if (pin.elements[0].state.value) {
        pin.elements[1].state.value = button;
        return;
      }
      pin.elements[0].state.value = button;
    }
  }

  const handleClear = (value) => {
    console.log("handleClear");
    setValue(null);
    pin.elements[0].state.value = "";
    pin.elements[1].state.value = "";
    pin.elements[2].state.value = "";
    pin.elements[3].state.value = "";
    pin.elements[4].state.value = "";
    pin.elements[5].state.value = "";

    keyboard.current.setInput('');
    setMessage(null);
    console.log("handleClear after");
  }

  const onChangePin = (value) => {
    console.log(value);
    setValue(value);
    keyboard.current.setInput(value);
  };

  const onChange = async(value) => {
    console.log(value);
    await setValue(value);
  };

  const onSubmitHandler = (e) => {
    console.log('SubmitHandler', value);
    console.log(e);
    if (value == "1234") {
      //window.localStorage.setItem("pin", this.state.value);
      window.location.href = "/";
    } else {
      setMessage("Invalid PIN!")
      //swal("Invalid PIN!", "Pin you enter didn't match. Try again", "error");
      //window.location.reload();
    }
  }

  const handleOnCompleteInput = (value) => {
    console.log('handleOnCompleteInput', value);
  };


  return(
    <main className="main_no_flex">
      {props.orders && props.orders.length? (
        <div>
          <div className='cart_one' style={{display: displayOneItem}}>
            <div className='cart_one_item'>
            {props.orders.map((el, index) => (
              <CartItem key={index} product={el} onDelete={props.onDelete}/>
              ))}
            </div>          
          </div>
          <div className='cart_array' style={{display: displayArrayItems}}>
            {props.orders.map((el, index) => (
              <CartItems key={index} product={el} onDelete={props.onDelete}/>
              ))}
          </div>
          <div className="promo_code">
            <div onClick= {() => setModalActive(true)}>У меня есть промокод</div>
            <p className='summ'> Итого: {summa}  ₽</p>
          </div>
        </div>
      ):""}
      {props.orders && !props.orders.length? (
        <div>
          <p className="make_your_first_order">Сделайте свой первый заказ!</p>
        </div>
      ):""}

      <Footer onDisplayActiv={displayActiv} onPay={StartPay} clearCart={props.clearCart}/>

      <Modal active={modalActive} setActive={setModalActive} to_promo_code={true}>
        <span className="text_promo_code">Введите промокод</span>
        <div className="Pin home-container">
          <PinInput
            length={6}
            //focus
            ref={(p) => (pin = p)}
            type="numeric"
            inputMode="number"
            placeholder="'"
            onChange={onChangePin}
            // onComplete={onSubmitHandler}
            onComplete={(value) => {
              handleOnCompleteInput(value);
            }}
          />
          {message && (
            <p>{message}</p>
          )}          
          <Keyboard
            keyboardRef={r => (keyboard.current = r)}
            theme={
              "hg-theme-default hg-theme-numeric hg-layout-numeric numeric-theme"
            }
            layout={{
              default: ["1 2 3", "4 5 6", "7 8 9", "{clear} 0 {cancel}"]
            }}
            mergeDisplay
            display={{
              "{clear}": `<img src='${Arrow}'/>`,
              "{cancel}": "Отмена"
            }}
            maxLength={6}
            onChange={(input) => onChange(input)}
            onKeyPress={(button) => onKeyPress(button)}
            onComplete={onSubmitHandler}
          />
        </div>
      </Modal>
      <Modal active={modalOpen} setActive={setModalOpen}>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
       <h5>Произошла ошибка</h5>
       <div>
 </div>
       <div style={{ fontSize: "14px" }}> попробуйте позже.</div>
     </div>
        <button className='close_location' onClick={handleCloseClick}>Закрыть</button>
      </Modal>
    </main>
  )
}

export { CartPage }