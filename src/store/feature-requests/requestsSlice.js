import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    requests: [],
    loading: false,
    error: null,
};

const featureRequestSlice = createSlice({
    name: 'featureRequest',
    initialState,
    reducers: {
        fetchRequestsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchRequestsSuccess: (state, action) => {
            state.loading = false;
            state.requests = action.payload;
        },
        fetchRequestsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createRequestStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        createRequestSuccess: (state, action) => {
            state.loading = false;
            state.requests.push(action.payload);
        },
        createRequestFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        upvoteRequestSuccess: (state, action) => {
            const updatedRequest = action.payload;
            const index = state.requests.findIndex((req) => req._id === updatedRequest._id);
            if (index !== -1) {
                state.requests[index] = updatedRequest;
            }
        },
        downvoteRequestSuccess: (state, action) => {
            const updatedRequest = action.payload;
            const index = state.requests.findIndex((req) => req._id === updatedRequest._id);
            if (index !== -1) {
                state.requests[index] = updatedRequest;
            }
        },
    },
});

export const {
    fetchRequestsStart,
    fetchRequestsSuccess,
    fetchRequestsFailure,
    createRequestStart,
    createRequestSuccess,
    createRequestFailure,
    upvoteRequestSuccess,
    downvoteRequestSuccess,
} = featureRequestSlice.actions;

export default featureRequestSlice.reducer;
