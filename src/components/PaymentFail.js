import React, {  useState, useEffect } from 'react'

const PaymentFail = (props) => {

  const [seconds, setSeconds] = useState(10);

  const handleCancel = (e) => {
    console.log('handleCancel');
    props.canselPayment();
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
        <img src="./img/pay_fail.png" alt="pay"/>
        <span>Что-то пошло не так </span>
        <br />
        <span className='another_color'>{seconds}</span>
        <div className="lower_block">
          <button className='btn-block btn-simple_skip' onClick={handleCancel}>
            <span>Попробовать еще раз</span>
          </button>
        </div>
    </div>
  )

}

export default PaymentFail 