import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Video {
    _id: string,
    title: string;
    description: string;
}

interface VideoState {
    video: Video | null;
}

const initialState: VideoState = {
    video: null,
};

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        Add_VideoDetails: (state, action: PayloadAction<Video>) => {
            state.video = action.payload;
        },
    },
});

export const { Add_VideoDetails } = videoSlice.actions;

export type RootState = ReturnType<typeof videoSlice.reducer>;

export const selectVideoDetails = (state: RootState) => state.video;

export default videoSlice.reducer;
