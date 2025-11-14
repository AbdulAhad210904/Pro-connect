import { combineReducers } from 'redux';
import projectsReducer from './posted-projects/projectSlice';
import craftsmanProfileReducer from './craftsmanProfile/craftsmanProfileSlice';

// import userReducer from './user/userSlice';
import forumReducer from './forum-posts/forumSlice';
import bugsReducer from './bug-reports/bugSlice';
import featureRequestReducer from './feature-requests/requestsSlice';
import newsReducer from './news-updates/newsSlice';
import feedbackReducer from './user-feedback/feedbackSlice';

const rootReducer = combineReducers({
    projects: projectsReducer,
    craftsmanProfile:craftsmanProfileReducer,
    // users: userReducer,
    posts: forumReducer,
    bugs:bugsReducer,
    feedbacks: feedbackReducer,
    featureRequest: featureRequestReducer,
    news: newsReducer,
    feedbacks: feedbackReducer,
});

export default rootReducer;
