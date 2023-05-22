import React from 'react'
import "../css/modal.css"


const Modal = ({active, setActive, children, to_promo_code, to_error}) => {
  return(
    <div className={active ? "modal active" : "modal"} onClick={()=> setActive(false)}>
      <div className={active ? (to_promo_code ? "modal-content active to_promo_code": (to_error ? "modal-content active to_error" : "modal-content active")) : "modal-content"} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )

}

export default Modal;