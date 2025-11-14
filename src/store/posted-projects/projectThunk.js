import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

// Fetch projects created by a specific individual user
export const fetchUserProjects = createAsyncThunk(
  "projects/fetchUserProjects",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/projects/users/${userId}/projects`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch a single project by its ID
export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/projects/getproject/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch all project applicants using /api/projects/getapplicants/:id
export const fetchProjectApplicants = createAsyncThunk(
  "projects/fetchProjectApplicants",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/projects/getapplicants/${projectId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a new project http://localhost:8000/api/projects/createproject
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData, { rejectWithValue }) => {
    try {
      console.log("projectData", projectData);
      const response = await axiosInstance.post("/api/projects/createproject", projectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update a project
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/api/projects/updateproject/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a project
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/projects/deleteproject/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Assign project to craftsman
export const assignProjectToCraftsman = createAsyncThunk(
  "projects/assignProjectToCraftsman",
  async (assignmentData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/projects/assign", assignmentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Complete a project
export const completeProject = createAsyncThunk(
  "projects/completeProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/projects/completeproject", { projectId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


//Craftsman thunk
// Fetch projects for craftsman view
export const fetchCraftsmanViewProjects = createAsyncThunk(
  "projects/fetchProjectsForCraftsman",
  //fetch all projects from db using this link api/projects/getprojects
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/projects/getprojects");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Apply to a project (for craftsman)
export const applyToProject = createAsyncThunk(
  "projects/applyToProject",
  async ({ id, applicationData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/projects/${id}/apply`, applicationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch craftsman's applied projects
export const fetchCraftsmanAppliedProjects = createAsyncThunk(
  "projects/fetchCraftsmanAppliedProjects",
  async (craftsmanId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/projects/craftsman/${craftsmanId}/appliedprojects`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch craftsman's current projects
export const fetchCraftsmanCurrentProjects = createAsyncThunk(
  "projects/fetchCraftsmanCurrentProjects",
  async (craftsmanId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/projects/craftsman/${craftsmanId}/currentprojects`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch craftsman's project history
export const fetchCraftsmanProjectHistory = createAsyncThunk(
  "projects/fetchCraftsmanProjectHistory",
  async (craftsmanId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/projects/craftsman/${craftsmanId}/projecthistory`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




