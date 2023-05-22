import React, {  useState, useEffect } from 'react'

const PaymentWait = (props) => {

  const [seconds, setSeconds] = useState(60);

  const handleCancel = (e) => {
    console.log('handleCancel');
    // props.canselPayment();
  }

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      handleCancel();
    }
  });

  return(
    <div className="payment_container">
        <img src="./img/pay.png" alt="pay"/>
        <span>Произведите оплату <br />в терминале</span>
        <span className='another_color'>И мы приступим к выполнению <br />Вашего заказа</span>
        <div className="lower_block">
          <span className='another_color'>{seconds}</span>
        </div>
    </div>

  )

}

export default PaymentWait 