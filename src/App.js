import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { React, useEffect , Fragment} from "react";
import Notification from "./components/UI/Notification";
import { sendCartData , fetchCartData} from "./components/store/cart-actions-thunk";



let isInitial=true;
function App() {
  const showCart = useSelector((state) => state.ui.cartisVisible);
  const notify = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]); ///this effect willl only start wwhen our application starts 

  useEffect(() => { //for posting data 

    if(isInitial){

      isInitial=false;
      return;
    }
    if(cart.changed){
      dispatch(sendCartData(cart));     //THIS IS AN ACTION CREATOR  ; MORE LEANER CODE
    }
     
  }, [cart, dispatch]);


  return (
    <Fragment>
      {notify && <Notification status={notify.status } tiitle= { notify.title} message={notify.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
