import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";

import UserService from "../services/user.service"
import Footer from  "../components/Footer2"
import PaymentWait from "../components/PaymentWait"
import PaymentSuccess from "../components/PaymentSuccess"
import PaymentFail from "../components/PaymentFail"

const PayPage = (props) => {
  const orderId = props.orderId;
  const [tryAgain, setTryAgain] = useState(false);
  const [resultPay, setResultPay] = useState(null);
  const [message, setMessage] = useState(null);
  const [qrUrl, setQrUrl] = useState(null);
  const [isConnectionOpen, setConnectionOpen] = useState(false);
  const navigate = useNavigate();
  const timeout = 250;
  var connectInterval;

  const fr = new FileReader();

  const ws = useRef();

  const delay = ms => new Promise(res => setTimeout(res, ms));

  fr.onload = (e) => {
    console.log(e.target.result);
    let data = JSON.parse(e.target.result);
    console.log(data);
    if ('event' in data) {
      console.log('ws onmessage ############');
      sendConfirm();
      if (data.event == 'payed_status') {
        console.log(data);
        console.log(typeof data.status);
        if (data.status === true) {
          setQrUrl(data.qr_url);
          setResultPay(true);
        } else {
          setResultPay(false);
        }
      }
    }
  };


  const canselPayment = () => {
    console.log('canselPayment');
    props.clearCart();
    console.log("Cleaning up...");
    setTryAgain(false);
    ws.current.close();
    navigate('/');
  }

  const sendConfirm = () => {
      ws.current.send(
        JSON.stringify({
          event: 'confirm',
        })
      );
  };

  const check = () => {
    if (!ws || ws.current.readyState == WebSocket.CLOSED) {
      if (tryAgain) {
        connect(); //check if websocket instance is closed, if so call `connect` function.   
      }
    } 
  };

  const connect = () => {
    console.log(props.user.id);
    const ws_url = 'wss://app.robottod.ru:9007?token=' + props.user.id;
    ws.current = new WebSocket(ws_url);

    ws.current.onopen = () => {
      console.log("Connection opened");
      //setConnectionOpen(true);
      clearTimeout(connectInterval);
    };

    ws.current.onmessage = (event) => {
      console.log(event.data);
      fr.readAsText(event.data);
    };

    ws.current.onclose = (e) => {
      console.log(
          `Socket is closed. Reconnect will be attempted in ${Math.min(
              10000 / 1000,
              (timeout + timeout) / 1000
          )} second.`,
          e.reason
      );
      timeout = timeout + timeout; //increment retry interval
      connectInterval = setTimeout(check(), Math.min(10000, timeout)); //call check function after timeout
    };
  };

  useEffect(() => {
    setTryAgain(true);
    connect();
  }, [])

  return(
    <main>
        {
          {
            true: <PaymentSuccess canselPayment={canselPayment} orderId={orderId} rqCode={qrUrl}/>,
            false: <PaymentFail canselPayment={canselPayment} orderId={orderId} rqCode={qrUrl}/>,
            null: <PaymentWait canselPayment={canselPayment} />
          }[resultPay]
        }
    </main>
  )
}

export { PayPage }
