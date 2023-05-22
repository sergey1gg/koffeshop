import React, { Component } from 'react'
import { Link } from "react-router-dom";

export class Category extends Component {
  render() {
    return (
        <Link to={`/products/${this.props.category.id}`}>
             <div className='category'>
                <img src={this.props.category.picture + ".jpg"}></img>
                <h2 className="img-block-title">{this.props.category.name}</h2>
                <h3 className="img-block-subtitle">{this.props.category.note}</h3>
            </div>
        </Link>
    )
  }
}

export default Category