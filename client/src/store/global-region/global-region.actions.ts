import { GlobalRegionAction, GlobalRegionActionTypes } from "./global-region.action.interface";
import { GlobalRegionTypes } from "./global-region.state.interface";

export const setGlobalRegionAction = (payload: GlobalRegionTypes): GlobalRegionAction => ({type: GlobalRegionActionTypes.SET_GLOBAL_REGION, payload});