import { FaShoppingCart } from "react-icons/fa"
import { useNavigate } from "react-router-dom";


export default function Footer(props) {

  const navigate = useNavigate();

  const handleSkip = () => {
    console.log('button skip');
    navigate('/cart');
  };

  return (
    <div className="lower_block">
        <button className='btn-block btn-simple_skip' onClick={handleSkip}>Пропустить</button>
    </div>
  )
}
