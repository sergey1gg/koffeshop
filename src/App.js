import React, { Component } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { withRouter } from './common/with-router';

import AuthService from "./services/auth.service";

import Header from  "./components/Header"


import { RecoveryPage } from "./pages/recovery";
import { MenuPage } from "./pages/menu";
import {AdditionPage} from "./pages/addition";
import { ProductsPage } from "./pages/products";
import { CartPage } from "./pages/cart";
import { PayPage } from "./pages/pay";
import LoginPage from "./pages/login";
import { RegisterPage } from "./pages/register";
import ProfilePage from "./pages/profile";
import PrintPage from "./pages/print";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import Restriction from "./components/Restriction";

class App extends Component {
  timer;
  
  constructor(props) {
    super(props);

    this.currentPathname = null;
    this.currentSearch = null;
    
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      lockSettings: false,
      kioskDesc: undefined,
      countryId: 1,
      kioskId: undefined,
      lastItem: 2,
      category: undefined,
      product: 0,
      orders: [],
      categories: [],
      orderId: 0,
    };

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.setKioskId = this.setKioskId.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.setOrderId = this.setOrderId.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.additionToOrder = this.additionToOrder.bind(this);
    this.storCategories = this.storCategories.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
  }

  componentDidMount() {
    this.logIn();

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    console.log('logout');
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  logIn() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  setKioskId(id) {
    this.setState({
      kioskId: id,
    });
  }

  addToOrder(item, type =null ) {
    let change_item = item
    if (type != null) {
      change_item.parentId = ''
    }

    this.setState({product: change_item.id});
    
    let order_id = this.state.orders.length;
    change_item.id = order_id + 1;
    console.log(change_item);
    this.setState({orders: [...this.state.orders, change_item]})
  }

  clearCart() {
    console.log('clear cart');
    this.setState({orders: []});
    // this.props.history.replace('/')
    // const location = useLocation();
    // console.log(location.pathname);
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function() {
      window.history.pushState(null, "", window.location.href);
    }
  }


  storCategories(categories){
    console.log('storCategories!!!!!');
    this.setState({categories: categories});
  }

  additionToOrder(item) {
    let orders_copy = [...this.state.orders];
    let parant_id = this.state.orders.length;

    this.state.orders.map(function(el, i){
      if (el.id == parant_id ) {
        let order = el;
        order.additionals = [...order.additionals, item];
        orders_copy[i] = order;
      }      
    })

    this.setState({orders: orders_copy});
  }

  deleteOrder(id) {
    this.setState({orders: this.state.orders.filter(el => el.id !== id)})
  }

  setOrderId(id) {
    this.setState({orderId: id});
  }

  setCategory(id) {
    this.setState({category: id});
  }

  _onTouchStart(e) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.props.router.navigate('/', {replace: true});
      //window.location.reload();
      this.clearCart();
    }, 60000);
  }

  render() {
    
    return (
      <div className="wrapper" onTouchStart={this._onTouchStart} scroll="no">
        <Header user={this.state.currentUser} lock={this.state.lockSettings} country={this.state.countryId} orders={this.state.orders} 
                logOut={this.logOut} setKioskId={this.setKioskId} />
        
        <Routes>
          <Route path="/" element={<MenuPage kioskId={this.state.kioskId} storCategories={this.storCategories} orders={this.state.orders} setCategory={this.setCategory} />} /> 
          <Route path="/menu" element={<MenuPage kioskId={this.state.kioskId} onCategories={this.storCategories} orders={this.state.orders} setCategory={this.setCategory} />} />
          <Route path="/products" element={<ProductsPage category={this.state.category} categories={this.state.categories} onAdd={this.addToOrder} />} />
          <Route path="/additional"  element={<AdditionPage onAdd={this.additionToOrder} product={this.state.product} lastItemOrders={this.state.orders.lenght}/>} />
          <Route path="/cart" element={<CartPage kioskId={this.state.kioskId} orders={this.state.orders} onDelete={this.deleteOrder} setOrderId={this.setOrderId} clearCart={this.clearCart} />} />
          <Route path="/pay" element={<PayPage orderId={this.state.orderId} clearCart={this.clearCart} user={this.state.currentUser}/>} />
          <Route path="/login" element={<LoginPage  logIn={this.logIn} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recovery" element={<RecoveryPage />} />
          <Route path="/profile" element={<ProfilePage logOut={this.logOut}/>} />
          <Route path="/print" element={<PrintPage />} />
        </Routes>
      </div>
    );
  }
}

export default withRouter(App);
//export default App;
