import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";
import Footer from  "../components/Footer2"
import Modal from "../components/Modal"
import RecPhone from "../components/RecoveryPhone"
import RecPassword from "../components/RecoveryPassword"
import RecCode from "../components/RecoveryCode"

const RecoveryPage = (props) => {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState('');
  const [displayActiv, setDisplayActiv] = useState('none');
  const [message, setMessage] = useState(null);
  
  const sendSmsCode = (phone) => {
    AuthService.sendSecondSMS(phone).then(
      response => {
        // console.log(response);
        // console.log(response.sms_code);
        setPhone(phone);
      },
      error => {
        console.log(error.response.data);
        setMessage(error.response.data);
        setModalActive(true);
      }
    );
  }
  
const changePassword = (code) => {
    AuthService.changePassword(phone, password, code).then(
        response => {
        console.log(response);
        navigate('/login', {replace: true});
        },
        error => {
        console.log(error.response.data);
        setMessage(error.response.data);
        setModalActive(true);
        }
    );
}


  return(
    <main className="card container">
      {!phone && (
        <RecPhone smsRequest={sendSmsCode}/>
      )}
      {phone && !password? (
				<RecPassword setPasswd={setPassword} />
      ):""}
      {phone && password? (
				<RecCode changePassword={changePassword} />
      ):""}
      {/* <Footer onDisplayActiv={displayActiv}/> */}
      <Modal active={modalActive} setActive={setModalActive}>
        <div>
          {message}
        </div>
      </Modal>
      <div className="lower_block">
        {/* <button className="btn-block" onClick={this.handleRecovery}> */}
        <button className="btn-block">
            <span>Авторизация</span>
        </button>
        {/* <button className="btn-block" onClick={this.handleRegister}> */}
        <button className="btn-block">
            <span>Регистация</span>
        </button>
      </div>
    </main>
  )
}

export { RecoveryPage }