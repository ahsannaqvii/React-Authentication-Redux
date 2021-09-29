import classes from './CartButton.module.css';

import { useDispatch , useSelector } from 'react-redux';
import { UIActions } from '../store/ui-slice';
const CartButton = (props) => {

  const dispatch = useDispatch();
  const cartQuantity = useSelector(state => state.cart.totalNoOfItems)


  const toggleHandler=()=>{
    dispatch(UIActions.toggle());

  }
  return (
    <button className={classes.button} onClick={toggleHandler} >
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
