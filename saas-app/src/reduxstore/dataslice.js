import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../links.js";

export const getDesignerData = createAsyncThunk("Designers", async () => {
  const designerid = localStorage.getItem('designerid');
  const response = await fetch(`${baseURL}/onedesignerdetails/${designerid}`, { credentials: 'include' });
  const data = await response.json();
  return data;
});

export const getDesignerProducts = createAsyncThunk("Products", async () => {
  const designerid = localStorage.getItem('designerid');
  const response = await fetch(`${baseURL}/productdetails/${designerid}`, { credentials: 'include' });
  const data = await response.json();
  return data;
});

export const getDesignerOrders = createAsyncThunk("Orders", async () => {
  const designerid = localStorage.getItem('designerid');
  const response = await fetch(`${baseURL}/orderdetails/${designerid}`, { credentials: 'include' });
  const data = await response.json();
  return data;
});

export const dataslice = createSlice({
  name: "designerdb",
  initialState: {
    designer: [],
    products: [],
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {}, // You can add reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(getDesignerData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDesignerData.fulfilled, (state, action) => {
        state.loading = false;
        state.designer = action.payload;
      })
      .addCase(getDesignerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getDesignerProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDesignerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getDesignerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getDesignerOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDesignerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getDesignerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataslice.reducer;
