import { createSlice, type Dispatch } from "@reduxjs/toolkit";
import { IProduct } from "./products";
import { RootState } from "./store";


interface ICart {
    id: number;
    products: IProduct[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number; 
}

interface ICartStore {
    entity: ICart | null,
    isLoading: boolean,
    error: string | null,
}

const initialState: ICartStore = {
    entity: null,
    isLoading: false,
    error: null,
}

export const cartsSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        cartsRequested: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        cartsReceived: (state, action) => {
            state.entity = action.payload;
            state.isLoading = false;
        },
        cartsFailled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearCart: (state) => {
            if(state.entity) state.entity.products = []
        },
        removeFromCart: (state, actions) => {
            if(state.entity) {
                const productId = actions.payload
                const product = state.entity.products.find((prod) => prod.id === productId)

                if (product) {
                    state.entity.products = state.entity.products.filter((prod) => prod.id !== productId);
                    state.entity.total -= product.total
                    state.entity.discountedTotal -= product.discountedTotal
                    state.entity.totalProducts -= 1
                    state.entity.totalQuantity -= product.quantity

                    if(!state.entity.products.length) {
                        state.entity.total = 0
                        state.entity.discountedTotal = 0
                    }
                }
            }
        },
        addToCart: (state, action) => {
            const {
                id,
                title,
                description,
                price,
                quantity = 1,
                discountPercentage,
                thumbnail
            } = action.payload;

            // Если корзина пуста, создаём новую
            if(!state.entity) {
                state.entity = {
                    id: 1,
                    products: [],
                    total: 0,
                    discountedTotal: 0,
                    userId: 1,
                    totalProducts: 0,
                    totalQuantity: 0
                }
            }

            // Проверяем, есть ли товар в корзине
            const existingProduct = state.entity.products.find(
                (prod) => prod.id === id
            );

            if(existingProduct) {
                existingProduct.quantity += quantity;
                existingProduct.total = 
                    existingProduct.price * existingProduct.quantity;
                existingProduct.discountedTotal = 
                    existingProduct.total * 
                    (1 - existingProduct.discountPercentage / 100);
            } else {
                const total = price * quantity;
                const discountedTotal = total *  (1 - discountPercentage / 100);
                state.entity.products.push({
                    id,
                    title,
                    price,
                    quantity,
                    total,
                    discountPercentage,
                    discountedTotal,
                    thumbnail,
                    description
                })
                state.entity.totalProducts += 1
            }

            // Обновляем общие значения корзины
            state.entity.total += price * quantity;
            state.entity.discountedTotal +=
                price * (1 - discountPercentage / 100);
            state.entity.totalQuantity += quantity;
        }
    }
})

const {reducer: cartReducer, actions} = cartsSlice;
export const {cartsRequested, cartsReceived, cartsFailled, clearCart, removeFromCart, addToCart} = actions;

export const loadCart = () => async (dispatch: Dispatch) => {
        dispatch(cartsRequested());
} 

export const getCart = (state: RootState) => state.cart.entity;
export const getCartLoading = (state: RootState) => state.cart.isLoading;

export default cartReducer