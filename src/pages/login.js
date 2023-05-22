import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Modal from "../components/Modal"
import AuthService from "../services/auth.service";

import { withRouter } from '../common/with-router';
import "../css/authorization.css"
import Eye from '../svg/view1.svg';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleRecovery = this.handleRecovery.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.setModalActive = this.setModalActive.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    	modalActive: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.logIn();
          this.props.router.navigate('/', {replace: true});
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
			this.setModalActive(true);
    } else {
      this.setState({
        loading: false
      });
    }
  }

  handleRegister(e){
    console.log('Register');
    this.props.router.navigate('/register', {replace: true});
  }

  handleRecovery(e){
    console.log('Recovery');
    this.props.router.navigate('/recovery', {replace: true});
  }
	handleCloseClick(){
		this.setModalActive(false);
	}
	
	setModalActive(x){
		this.setState({modalActive: x});
	}
	

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <div className="container_for_text_before_authorization">
            <span className="text_before_authorization">Для оформления заказа нужно</span>
            <br/>
            <span className="text_before_authorization">авторизоваться</span>
          </div>
          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              {/* <label htmlFor="username"></label> */}
              <Input
                type="text"
                className="form-control"
                name="username"
                placeholder="+7(___)___-__-__"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group for_eye">
                <img id="eye" src={Eye} alt="" />
              {/* <label htmlFor="password"></label> */}
              <Input
                type="password"
                className="form-control"
                name="password"
                placeholder="Ваш пароль"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button className="btn-block" disabled={this.state.loading}>
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Войти</span>
              </button>
            </div>
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
            <span className="confirm_to_accept">Продолжая, вы <a href="#">соглашаетесь со сбором и обработкой<br/> персональных данных и пользовательским соглашением</a></span>
            <div className="lower_block">
              <button className="btn-block" onClick={this.handleRecovery}>
                <span>Забыли пароль?</span>
              </button>
              <button className="btn-block" onClick={this.handleRegister}>
                <span>Регистрация</span>
              </button>
            </div>
          </Form>
        </div>
				<Modal active={this.state.modalActive} setActive={this.setModalActive}>
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              <span>{this.state.message}</span>
              <span className="please_repeat">Пожалуйста, повторите попытку</span>
              <button onClick={this.handleCloseClick}><span>Закрыть</span></button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Login);