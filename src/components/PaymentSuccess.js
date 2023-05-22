import React, {  useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

const PaymentWait = (props) => {
  const [seconds, setSeconds] = useState(15);
  const navigate = useNavigate();
  // const qr_code_url = 'https://cheques-lk.orangedata.ru/710704870704/202302070350001'
  const qr_code_url = props.rqCode
  console.log(qr_code_url)


  const handleContinue = (e) => {
    console.log('handleRecovery');
    props.canselPayment();
    
  }

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      handleContinue();
    }
  });

  //<img src={pay_success_svg} alt="pay"/>

  return(
    <div className="payment_container pay_success">
        
        <span>Ваш номер заказа</span>
        <span className='another_color'>Сфотографируйте чтобы не забыть<br />Номер отобразится на табло</span>
        <span className='order_num'>{props.orderId}</span>
        <div className="qr_block">
            {qr_code_url ? <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={qr_code_url}
            viewBox={`0 0 256 256`}
            /> : null}
        </div>
        <div className="lower_block">
            <button className="btn-block btn-simple_skip button_success" onClick={handleContinue}>
                <span>Заказать ещё</span>
            </button>
        </div>
    </div>
  )

}

export default PaymentWait 