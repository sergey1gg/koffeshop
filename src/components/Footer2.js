import { FaShoppingCart } from "react-icons/fa"
import { useNavigate } from "react-router-dom";


export default function Footer(props) {

  const navigate = useNavigate();

  const handleBack = () => {
    // console.log('button clicked');
    props.clearCart();
    navigate('../', {replace: true});
  };

  const handlePay = () => {
    props.onPay();
  };

  return (
    <div className="lower_block widht_to_button">
        <button className='btn-block' onClick={handleBack}>Меню</button>
        <button className='btn-block btn-action' onClick={handlePay}>Оплатить</button>
    </div>
  )
}
