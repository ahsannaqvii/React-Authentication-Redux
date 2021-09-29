import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { React, useEffect , Fragment} from "react";
import  {UIActions}  from "./components/store/ui-slice";
import Notification from "./components/UI/Notification";
import {sendCartData } from './store/cart-slice'


let isInitial=true;
function App() {
  const showCart = useSelector((state) => state.ui.cartisVisible);
  const notify = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  

  useEffect(() => {
    //THIS IS HOW YOU CAN USE SIDE EFFECT CODE WHILE USING REDUCERS
  

    const sendCartData = async () => { 
      dispatch(
        UIActions.showNotification({
          status: "pending",
          title: "SENDING...",
          message: "Sending cart data!",
        })
      ); 
      const response = await fetch(
        "https://rest-react-3af2d-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT", //THIS IS SIMILAR TO PUT MAGR IT OVERWRITE STHE DATA THAATS BEEN SENT OT FIREBASE
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("cart data send failed!");
      }
      // const responseData = await response.json();
      dispatch(
        UIActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart data send successfully",
        })
      );
    };
    if(isInitial){
      isInitial=false;
      return;
    }
    sendCartData().catch((error) => {
      dispatch(
        UIActions.showNotification({
          status: "error",
          title: "Error!!",
          message: "Cart data error",
        })
      );
    });
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
