import React, { useCallback, useState } from 'react'
//import {useNavigate} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Eye from '../svg/view1.svg';


const RecPassword = (props) => {

  const [cmcCode, setSmsCode] = useState('');
  const [password, setPassword] = useState('');

  const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  }

  const onChangePasswd = (e) => {
    setPassword(e.target.value);
  }

  const onChangeRepeatPasswd = (e) => {
    if (e.target.value === password) { 
      console.log('password is same')
    } else {
      console.log('password is not same!!!!')
    }
}

  const handleRecovery = (e) => {
    console.log('handleRecovery');
    e.preventDefault();
    props.setPasswd(password);
  }

  //const navigate = useNavigate();
  //const handleOnClick = useCallback(() => navigate('/products', {replace: true, state: props.category.id}), [navigate]);
  //const prodOnClick = () => navigate('/products', {replace: true, state: props.category.id});
  return(
    <div className="card card-container forgot_the_number">
      <div className="container_for_text_before_authorization">
        <span className='text_before_authorization'>Придумайте новый пароль</span>
      </div>
      <Form
        onSubmit={handleRecovery}
      >
        <div className="form-group for_eye">
          <img id="eye" src={Eye} alt="" />
          <Input
            type="password"
            className="form-control"
            name="passwd"
            placeholder="Ваш пароль"
            onChange={onChangePasswd}
            validations={[required]}
          />
        </div>
        <div className="form-group for_eye">
          <img id="eye" src={Eye} alt="" />
          <Input
            type="password"
            className="form-control"
            name="second_passwd"
            placeholder="Повторите пароль"
            onChange={onChangeRepeatPasswd}
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <button className="btn-block" >
            <span className='send_code'>Далее</span>
          </button>
        </div>
      </Form>
    </div>

  )

}

export default RecPassword 