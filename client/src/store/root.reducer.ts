import { combineReducers } from "redux";
import { newsReducer } from "./news/news.reducer";
import { userReducer } from "./user/user.reducer";
import { globalRegionReducer } from "./global-region/global-region.reducer";

export const rootReducer = combineReducers({
    newsReducer: newsReducer,
    userReducer: userReducer,
    globalRegionReducer: globalRegionReducer
});

export type RootState = ReturnType<typeof rootReducer>;