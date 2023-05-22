import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { isEmail, isMobilePhone } from "validator";
import Eye from '../svg/view1.svg';
import Modal from "../components/Modal"

import AuthService from "../services/auth.service";


const RegisterPage = () => {
    const navigate = useNavigate();
    const [modalActive, setModalActive] = useState(false);
    const [message, setMessage] = useState(null);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [smscode, setSmscode] = useState('');
    const [smsSended, setSmsSended] = useState(false);

    const required = value => {
    if (!value) {
        return (
        <div className="alert alert-danger" role="alert">
            This field is required!
        </div>
        );
    }
};
    
    const vphone = value => {
    if (!isMobilePhone(value)) {
        return (
        <div className="alert alert-danger" role="alert">
            This is not a valid phone.
        </div>
        );
    }
};
    
    const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
        <div className="alert alert-danger" role="alert">
            The username must be between 3 and 20 characters.
        </div>
        );
    }
};
    
    const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
        <div className="alert alert-danger" role="alert">
            The password must be between 6 and 40 characters.
        </div>
        );
    }
};
    
    const handleSendSMS = () => {
    console.log(phone);
    AuthService.sendSMS(phone).then(
        response => {
        console.log('all ok');
        // setPhone(phone);
        setSmsSended(true);
        },
        error => {
        console.log(error.response.data);
        setMessage(error.response.data.message);
        setModalActive(true);
        }
        );
      }

    const handleRegister = () => {
        AuthService.register(phone, password, username, 1, smscode).then(
            response => {
            console.log(response);
            navigate('/login', {replace: true})
            },
            error => {
            console.log(error.response.data);
            setMessage(error.response.data);
            setModalActive(true);
        }
    );
}

  
  useEffect(() => {
    console.log('start register');
  }, [])

  return(
    <main className="card container">
      {!smsSended && (
        <div>
          <span className="text_before_authorization">Введите данные для регистрации</span>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Ваше имя"
              value={username}
              onChange={e => setUsername(e.target.value)}
              validations={[required, vusername]}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="phone"
              placeholder="+7(___)___-__-__"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              validations={[required, vphone]}
            />
          </div>

          <div className="form-group for_eye">
            <img id="eye" src={Eye} alt="" />
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Ваш пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              validations={[required, vpassword]}
            />
          </div>
 
          <div className="form-group">
            <button className="btn btn-primary btn-block" onClick={handleSendSMS}>Войти</button>
          </div>
          <span className="confirm_to_accept">Продолжая, вы <a href="#">соглашаетесь со сбором и обработкой<br/> персональных данных и пользовательским соглашением</a></span>
        </div>
      )}

      {smsSended && (
        <div className='sms_confirm container_for_text_before_authorization'>
        <span className="text_before_authorization">На Ваш номер отправлен код <br />для подтверждения регистрации</span>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="sms"
            onChange={e => setSmscode(e.target.value)}
           />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block" onClick={handleRegister}>Подтвердить</button>
        </div>
      </div> 
      )}
 
      <Modal active={modalActive} setActive={setModalActive} to_error={true}>
        {/* <div>
          <p>{message}</p>
        </div>
        <button onClick={() => setModalActive(false)}>Закрыть</button> */}
          <div className="alert alert-danger" role="alert">
            <span>{message}</span>
            <span className="please_repeat">Пожалуйста, повторите попытку</span>
            <button onClick={() => setModalActive(false)}><span>Закрыть</span></button>
          </div>
      </Modal>
      <div className="lower_block">
        {/* <button className="btn-block" onClick={this.handleRecovery}> */}
        <button className="btn-block">
            <span>Назад</span>
        </button>
        {/* <button className="btn-block" onClick={this.handleRegister}> */}
        <button className="btn-block">
            <span>Авторизация</span>
        </button>
      </div>
    </main>
  )
}

export { RegisterPage }
