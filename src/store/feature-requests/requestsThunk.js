import axiosInstance from "../../utils/axios";
import {
    fetchRequestsStart,
    fetchRequestsSuccess,
    fetchRequestsFailure,
    createRequestStart,
    createRequestSuccess,
    createRequestFailure,
    upvoteRequestSuccess,
    downvoteRequestSuccess,
} from './requestsSlice';

// Fetch all feature requests
export const fetchFeatureRequests = () => async (dispatch) => {
    dispatch(fetchRequestsStart());
    try {
        const response = await axiosInstance.get('/api/requests'); // Adjust API URL if needed
        dispatch(fetchRequestsSuccess(response.data));
    } catch (error) {
        dispatch(fetchRequestsFailure(error.response?.data?.message || error.message));
    }
};

// Create a new feature request
export const createFeatureRequest = (requestData) => async (dispatch) => {
    dispatch(createRequestStart());
    try {
        const response = await axiosInstance.post('/api/requests', requestData);
        dispatch(createRequestSuccess(response.data.request));
    } catch (error) {
        dispatch(createRequestFailure(error.response?.data?.message || error.message));
    }
};

// Upvote a feature request
export const upvoteFeatureRequest = (requestId) => async (dispatch) => {
    try {
        const response = await axiosInstance.post(
            `/api/requests/${requestId}/upvote`
        );
        dispatch(upvoteRequestSuccess(response.data.request));
    } catch (error) {
        console.error('Failed to upvote request:', error);
    }
};

// Downvote a feature request
export const downvoteFeatureRequest = (requestId) => async (dispatch) => {
    try {
        const response = await axiosInstance.post(
            `/api/requests/${requestId}/downvote`
        );
        dispatch(downvoteRequestSuccess(response.data.request));
    } catch (error) {
        console.error('Failed to downvote request:', error);
    }
};
