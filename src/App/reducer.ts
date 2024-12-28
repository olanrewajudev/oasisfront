import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    user: Record<string, any>, 
    carts: any[], 
    admin: Record<string, any>,
    services: any[], 
    info: Record<string, any>,
    categories: any[],
}

const initialState: CounterState = {
    user: {},
    carts: [],
    admin: {},
    services: [],
    info: {},
    categories: [],
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        dispatchUser: (state, action: PayloadAction<Record<string, any>>) => {
            state.user = action.payload
        },
        dispatchCart: (state, action: PayloadAction<any[]>) => {
            state.carts = action.payload
        },
        dispatchAdmin: (state, action: PayloadAction<Record<string, any>>) => {
            state.admin = action.payload
        },
        dispatchServices: (state, action: PayloadAction<any[]>) => {
            state.services = action.payload
        },
        dispatchInfo: (state, action: PayloadAction<Record<string, any>>) => {
            state.info = action.payload
        },
        dispatchCategory: (state, action: PayloadAction<any[]>) => {
            state.categories = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { dispatchAdmin, dispatchUser, dispatchCart, dispatchServices, dispatchInfo, dispatchCategory } = counterSlice.actions

export default counterSlice.reducer
