import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { HistoryItem } from "../components/HistoryItem";
import UserService from "../services/user.service"
import SvgDrinkIsReady from '../svg/Illustration-02.svg';

export default class DrinkIsReadyPage extends Component {
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
        <div className="payment_container">
            <img src={SvgDrinkIsReady} alt="pay"/>
            <span>Напиток готов</span>
            <span className='another_color'>Хорошего дня</span>
            <div className="lower_block">
                <button className='btn-block btn-simple_skip'>
                <span>Заказать ещё</span>
                </button>
            </div>
        </div>
      );
    }
}