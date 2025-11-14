import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserProjects,
  fetchProjectById,
  createProject,
  updateProject,
  deleteProject,
  assignProjectToCraftsman,
  completeProject,
  fetchCraftsmanViewProjects,
  applyToProject,
  fetchCraftsmanAppliedProjects,
  fetchCraftsmanCurrentProjects,
  fetchCraftsmanProjectHistory
} from "./projectThunk";

const initialState = {
  userProjects: [],        // Projects specific to the user
  craftsmanProjects: [],   // All Projects for craftsman view on home
  project: null,           // Selected project
  appliedProjects: [],     // Projects the craftsman has applied to
  currentProjects: [],     // Current projects for the craftsman
  projectHistory: [],      // Completed projects for the craftsman
  loading: false,          // Loading state
  error: null,             // Error state
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // Additional reducers can be added here
  },
  extraReducers: (builder) => {
    builder
      // Fetch user-specific projects
      .addCase(fetchUserProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.userProjects = action.payload;
      })
      .addCase(fetchUserProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch a single project by ID
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create a new project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.userProjects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update a project
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.userProjects.findIndex(
          (project) => project._id === action.payload._id
        );
        if (index !== -1) {
          state.userProjects[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete a project
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.userProjects = state.userProjects.filter(
          (project) => project._id !== action.payload._id
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Assign project to craftsman
      .addCase(assignProjectToCraftsman.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignProjectToCraftsman.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.userProjects.findIndex(
          (project) => project._id === action.payload._id
        );
        if (index !== -1) {
          state.userProjects[index] = action.payload;
        }
      })
      .addCase(assignProjectToCraftsman.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Complete a project
      .addCase(completeProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.userProjects.findIndex(
          (project) => project._id === action.payload._id
        );
        if (index !== -1) {
          state.userProjects[index] = action.payload;
        }
      })
      .addCase(completeProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch projects for craftsman view
      .addCase(fetchCraftsmanViewProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCraftsmanViewProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.craftsmanProjects = action.payload;
      })
      .addCase(fetchCraftsmanViewProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Apply to a project (for craftsman)
      .addCase(applyToProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyToProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.craftsmanProjects.findIndex(
          (project) => project._id === action.payload._id
        );
        if (index !== -1) {
          state.craftsmanProjects[index] = action.payload;
        }
      })
      .addCase(applyToProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch craftsman's applied projects
      .addCase(fetchCraftsmanAppliedProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCraftsmanAppliedProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.appliedProjects = action.payload;
      })
      .addCase(fetchCraftsmanAppliedProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch craftsman's current projects
      .addCase(fetchCraftsmanCurrentProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCraftsmanCurrentProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProjects = action.payload;
      })
      .addCase(fetchCraftsmanCurrentProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch craftsman's project history
      .addCase(fetchCraftsmanProjectHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCraftsmanProjectHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.projectHistory = action.payload;
      })
      .addCase(fetchCraftsmanProjectHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;