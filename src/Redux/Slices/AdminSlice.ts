import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Admin {
    username: string;
    token: string;
}

interface AdminState {
    admin: Admin | null;
}

const initialState: AdminState = {
    admin: null,
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        Add_Admin: (state, action: PayloadAction<Admin>) => {
            state.admin = action.payload;
        },
        ClearAdmin: (state) => {
            state.admin = null;
        },
    },
});

export const { Add_Admin, ClearAdmin } = adminSlice.actions;

export type RootState = {
    admin: AdminState;
};

export const selectAdminUsername = (state: RootState) => state.admin?.admin?.username

export const selectAdminToken = (state: RootState) => state.admin?.admin?.token;


export default adminSlice.reducer;