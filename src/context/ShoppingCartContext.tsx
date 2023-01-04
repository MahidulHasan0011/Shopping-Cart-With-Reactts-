import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../component/ShoppingCart";
import { useLocalStorage } from "../hooks/UseLocalStorage";


type ShoppingCartProviderProps = {
    children:ReactNode
}
type CartItem={
    id:number
    quantity:number
}

type ShoppingCartContext = {
 openCart:() => void
 closeCart:() => void
 getItemQuantity: (id:number) => number
 IncreaseItemQuantity: (id:number) => void
 DecrementItemQuantity: (id:number) => void
 RemoveItemQuantity: (id:number) => void
 cartQuantity:number
 cartItem:CartItem[]
}

const ShoppingCartContext=createContext({} as ShoppingCartContext) 

export function useShoppingCart(){
    return useContext (ShoppingCartContext)
}

export function ShoppingCartProvider({children}:ShoppingCartProviderProps){
    const [isOpen,setIsOpen]=useState(false)

    const [cartItem,setCartItem]=useLocalStorage<CartItem[]>("Shopping-Cart",[])

    const cartQuantity = cartItem.reduce((quantity,item)=>item.quantity+quantity,0)

    const openCart= () =>setIsOpen(true)
    const closeCart= () =>setIsOpen(false)

    function getItemQuantity(id:number){
        return cartItem.find(item=>item.id === id)?.quantity || 0
    }

   function IncreaseItemQuantity(id:number){
    setCartItem(currtItems => {
      if(currtItems.find(item => item.id === id)== null){
        return [...currtItems, {id,quantity:1}]
      }
      else{
        return cartItem.map(item=>{
            if(item.id === id){
                return{...item,quantity:item.quantity+1}
            }
            else{
                return item
            }
        })
      }
    })
   }

   function DecrementItemQuantity(id:number){
    setCartItem(currtItems => {
      if(currtItems.find(item => item.id === id)?. quantity === 1){
        return currtItems.filter(item=>item.id !== id)
      }
      else{
        return cartItem.map(item=>{
            if(item.id === id){
                return{...item,quantity:item.quantity-1}
            }
            else{
                return item
            }
        })
      }
    })
   }

   function RemoveItemQuantity(id:number){
    setCartItem(currtItems => {
     return currtItems.filter(item=>item.id!==id)
    })
   }

    return(
        <ShoppingCartContext.Provider value={{closeCart,openCart,getItemQuantity,IncreaseItemQuantity,DecrementItemQuantity,RemoveItemQuantity,cartItem,cartQuantity}}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )

}