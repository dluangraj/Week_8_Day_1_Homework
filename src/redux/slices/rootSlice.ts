import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        make: 'Nissan',
        model: "Cube",
        year: "2022",
        color: 'Red',
        price: '20000',
    },
    reducers: {
        chooseMake: (state, action) => { state.make = action.payload},
        chooseModel: (state, action) => { state.model = action.payload},
        chooseYear: (state, action) => { state.year = action.payload},
        chooseColor: (state, action) => { state.color = action.payload},
        choosePrice: (state, action) => { state.price = action.payload}
    }
})
// export reducers
export const reducer = rootSlice.reducer;
export const { chooseMake, chooseModel, chooseYear, chooseColor, choosePrice } = rootSlice.actions;