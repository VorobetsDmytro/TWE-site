import { GlobalRegionAction, GlobalRegionActionTypes } from "./global-region.action.interface";
import { GlobalRegionState, GlobalRegionTypes } from "./global-region.state.interface";

const defaultState: GlobalRegionState = {
    globalRegion: GlobalRegionTypes.US
};

export const globalRegionReducer = (state = defaultState, action: GlobalRegionAction): GlobalRegionState => {
    switch(action.type) {
        case GlobalRegionActionTypes.SET_GLOBAL_REGION:
            return {
                ...state,
                globalRegion: action.payload
            }
        default:
            return state;
    }
};