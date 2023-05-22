import React, { useCallback, useState } from 'react'
//import {useNavigate} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";


const RecPhone = (props) => {

  const [phone, setPhone] = useState('');

  const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  }

//   const onChangePhone = (e) => {
//     if (e.target.value.length < 13) {
//       let cleaned = ("" + e.target.value).replace(/\D/g, "");

//       let normValue = `(${cleaned.substring(0, 3)}${
//         cleaned.length > 3 ? ")" : ""
//       }${cleaned.substring(3, 6)}${
//         cleaned.length > 6 ? "-" : ""
//       }${cleaned.substring(6, 8)}${
//         cleaned.length > 8 ? "-" : ""
//       }${cleaned.substring(8, 11)}`;

//       setPhone(normValue);
//     }
//   }
    const onChangePhone = (e) => {
        setPhone(e.target.value);
    }

  const handleRecovery = (e) => {
    console.log('handleRecovery');
    e.preventDefault();
    console.log(phone);
    localStorage.setItem("phone", JSON.stringify(phone));
    props.smsRequest(phone);
  }

  //const navigate = useNavigate();
  //const handleOnClick = useCallback(() => navigate('/products', {replace: true, state: props.category.id}), [navigate]);
  //const prodOnClick = () => navigate('/products', {replace: true, state: props.category.id});
  return(
    <div className="card card-container forgot_the_number">
      <Form
        onSubmit={handleRecovery}
      >
        <div className="form-group">
          <label className='please_input_phone' htmlFor="username">
            <span>Введите номер для того, чтобы</span>
            <br />
            <span>восстановить доступ</span> 
          </label>
          <Input
            type="tel"
            className="form-control"
            name="phone"
            value={phone}
            placeholder="+7(___)___-__-__"
            onChange={onChangePhone}
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <button className="btn-block" >
            <span className='send_code'>Отправить код</span>
          </button>
        </div>
      </Form>
    </div>

  )

}

export default RecPhone 