import { UIActions } from "./ui-slice";
// import { useDispatch } from "react-redux";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {

  return async (dispatch) => {

    const fetchData = async () => {

      const response = await fetch(
        "https://rest-react-3af2d-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("COULD NOT FETCH CART DATA");
      }
      const data = await response.json(); //we dont need to convert this data into object because we are expecting object in the frontend as well
      return data;
    };

    
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        UIActions.showNotification({
          status: "error",
          title: "Error!!",
          message: "Fetching Cart data error",
        })
      );
    }

  };
  
};

export const sendCartData = (cart) => {
  // one function

  return async (dispatch) => {
    //callinga another function that would return actions

    dispatch(
      UIActions.showNotification({
        status: "pending",
        title: "SENDING...",
        message: "Sending cart data!",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://rest-react-3af2d-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT", //THIS IS SIMILAR TO PUT MAGR IT OVERWRITE STHE DATA THAATS BEEN SENT OT FIREBASE
          body: JSON.stringify({
              items:cart.items , 
              totalQuantity:cart.totalNoOfItems
          }),
        }
      );
      if (!response.ok) {
        throw new Error("cart data send failed!");
      }
    };
    try {
      await sendRequest(); //await lagaya because sendRequest is an async function that would ret a promise

      dispatch(
        UIActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart data send successfully",
        })
      );
    } catch (err) {
      dispatch(
        UIActions.showNotification({
          status: "error",
          title: "Error!!",
          message: "Cart data error",
        })
      );
    }
  };
};
