import { createSlice } from "@reduxjs/toolkit";

const cartInitialState={
    items:[],
    totalNoOfItems:0,       //totalQuantity
    changed:false,
}

const cartSlice=createSlice({
    name:'cart',
    initialState:cartInitialState,
    reducers:{
        replaceCart(state,action){
            state.totalNoOfItems=action.payload.totalQuantity;
            state.items=action.payload.items;
        },
        addItemToCart(state,action){
            const newItem=action.payload  ;
            const existingItem   =state.items.find(item=>item.id === newItem.id);
            state.totalNoOfItems++;
            state.changed=true;
            if(!existingItem){

                state.items.push({  //THIS IS POSSIBLE , THE REASON IS SAME BECAUSE IT UPDATES PREV STATE IN IMMUTABLE WAY
                        id:newItem.id,
                        quantity:1,
                        price:newItem.price,
                        name:newItem.title,
                        totalPrice:newItem.price
                })          

            }
            else{
                existingItem.quantity=existingItem.quantity+1;
                existingItem.totalPrice=existingItem.totalPrice+newItem.price;
            }
        },
        removeItemFromCart(state,action){
            const id=action.payload;
            const existingItem =state.items.find(item=>item.id === id);
            state.totalNoOfItems--;
            state.changed=true;
            if(existingItem.quantity===1){
                state.items=state.items.filter(item=>item.id !==id)     // returns a new array of all items with ids are kept whose id are not matched.
            }
            else{
                existingItem.quantity--;
                existingItem.totalPrice=existingItem.totalPrice-existingItem.price;
            }

        }
    }
})




export const cartActions=cartSlice.actions;
export default cartSlice.reducer