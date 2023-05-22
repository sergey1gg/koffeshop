import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { HistoryItem } from "../components/HistoryItem";
import UserService from "../services/user.service"
import Eye from '../svg/view1.svg';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      history: null
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/menu" });
    this.setState({ currentUser: currentUser, userReady: true })

    UserService.getHistoryOrders().then(
      response => {
        if (response.data.orders.length > 0) {
          this.setState({history: response.data.orders});
        }
      },
      error => {
        console.log('error');
      }
    );


  }

  handleLogout(){
    this.props.logOut();
    this.setState({ redirect: "/menu" });
  }

  handleMenu(){
    this.setState({ redirect: "/menu" });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="card container profile_main_div">
        {(this.state.userReady) ?
          <div>
            <div className="form-group">
              <input type="text" value={currentUser.name} readOnly />
            </div>
            <div className="form-group">
              <input type="tel" value='+7(967)067-89-88' readOnly />
            </div>
            <div className="form-group for_eye">
              <img id="eye" src={Eye} alt="" />
              <input type="password" value='sdrtrtr23' readOnly />
            </div>

            {this.state.history && (
              <div className='history_list'>
                {this.state.history.map((el,index)=> (
                  <HistoryItem key={index} order={el} />
                  ))}
              </div>
            )}

            {!this.state.history && (
              <div className='history_empty'>
                
              </div>
            )}        
          <div className="lower_block">
            <button className="btn-block" onClick={this.handleMenu}>
              <span>Меню</span>
            </button>
            <button  onClick={this.handleLogout} className="btn-block">
              <span>Выйти</span>
            </button>
          </div>
        </div>: null}
      </div>
    );
  }
}