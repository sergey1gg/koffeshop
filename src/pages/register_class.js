import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail, isMobilePhone } from "validator";
import Modal from "../components/Modal"

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const phone = value => {
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
    console.log('vusername');
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

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.setModalActive = this.setModalActive.bind(this);
    this.handleSendSMS = this.handleSendSMS.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      phone: "",
      password: "",
      successful: false,
      message: "",
      modalActive: false,
      sms_code: undefined,
      smsSended: false,
    };
  }

  setModalActive(modalState){
    this.setState({
      modalActive: modalState
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeSmsCode(e) {
    this.setState({
      sms_code: e.target.value
    });
  }

  handleSendSMS(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.sendSMS(this.state.phone)
        .then(response => {
            console.log('all ok');
            this.setState({
              smsSended: true,
            });
        },
        error => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          this.setState({
            successful: false,
            message: resMessage,
            modalActive: true,
          });
        }
      );
    }
  }

  handleRegister(e) {
    e.preventDefault();
    AuthService.register(this.state.phone, this.state.password, this.state.username, 1, this.state.sms_code)
      .then(response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          this.setState({
            successful: false,
            message: resMessage,
            modalActive: true,
          });
        }
      );
  }


  render() {
    return (
      <div>
        {!this.state.smsSended && (
          <div className="register_container">
            <Form
              onSubmit={this.handleSendSMS}
              ref={c => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.onChangePhone}
                      validations={[required, phone]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </div>

                  <div className="form-group">
                    <button className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </div>
              )}
              
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        )}

        {this.state.smsSended && ( 
          <div className='sms_confirm'>
            <div className="form-group">
              <label>CMC код</label>
              <Input
                type="text"
                className="form-control"
                name="sms"
                onChange={this.onChangeSmsCode}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block" onClick={this.handleRegister}>Подтвердить</button>
            </div>
          </div> 
        )}
        <Modal active={this.state.modalActive} setActive={this.setModalActive}>
          <div>
              {this.state.message}
              <button onClick={() => this.setModalActive(false)}>Закрыть</button>
          </div>
        </Modal>
      </div>
    );
  }
}