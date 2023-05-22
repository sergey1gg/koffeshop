import React, { useCallback, useState } from 'react'
//import {useNavigate} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";


const RecCode = (props) => {

  const [cmcCode, setSmsCode] = useState('');

  const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  }

  const onChangeCode = (e) => {
    setSmsCode(e.target.value);
  }

  const handleRecovery = (e) => {
    console.log('handleRecovery');
    e.preventDefault();
    props.changePassword(cmcCode);
  }

  //const navigate = useNavigate();
  //const handleOnClick = useCallback(() => navigate('/products', {replace: true, state: props.category.id}), [navigate]);
  //const prodOnClick = () => navigate('/products', {replace: true, state: props.category.id});
  return(
    <div className="card card-container forgot_the_number">
			<div className='container_for_text_before_authorization'>
				<span className='text_before_authorization'>Введите код для того, чтобы</span>
				<br />
				<span className='text_before_authorization'>восстановить доступ</span>
			</div>
      <Form
        onSubmit={handleRecovery}
      >
        <div className="form-group">
          <Input
            type="text"
            className="form-control"
            name="sms_code"
            placeholder="Ввести код"
            onChange={onChangeCode}
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <button className="btn-block" >
            <span className='send_code'>Восстановить доступ</span>
          </button>
        </div>
      </Form>
    </div>

  )

}

export default RecCode 