import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the user object
interface User {
    email: string;
    token: string;
}

// Define the type for the state
interface UserState {
    user: User | null;
}

// Initial state with the type UserState
const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        Add_User: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        ClearUser: (state) => {
            state.user = null;
        },
    },
});

export const { Add_User, ClearUser } = userSlice.actions;

// Define RootState type to match your store setup
export type RootState = ReturnType<typeof userSlice.reducer>;

// Selectors with proper type annotation
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
