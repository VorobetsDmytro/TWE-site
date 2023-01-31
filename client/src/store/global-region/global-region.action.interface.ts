import { GlobalRegionTypes } from "./global-region.state.interface";

export enum GlobalRegionActionTypes {
    SET_GLOBAL_REGION = 'SET_GLOBAL_REGION'
}

export interface SetGlobalRegionAction {
    type: GlobalRegionActionTypes.SET_GLOBAL_REGION;
    payload: GlobalRegionTypes;
}

export type GlobalRegionAction = SetGlobalRegionAction;