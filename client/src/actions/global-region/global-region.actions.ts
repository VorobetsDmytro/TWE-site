import { useCallback } from "react";
import { setGlobalRegionAction } from "../../store/global-region/global-region.actions";
import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";

export const useGlobalRegion = () => {
    const getCurrentGlobalRegion = useCallback(() => {
        return (dispatch: any) => {
            let globalRegionStr = localStorage.getItem('globalRegion');
            if(!globalRegionStr) {
                localStorage.setItem('globalRegion', 'US');
                globalRegionStr = 'US';
            }
            const globalRegion: GlobalRegionTypes = globalRegionStr as GlobalRegionTypes;
            dispatch(setGlobalRegionAction(globalRegion));
        }   
    }, []);

    const setCurrentGlobalRegion = (globalRegion: GlobalRegionTypes) => {
        return (dispatch: any) => {
            localStorage.setItem('globalRegion', globalRegion);
            dispatch(setGlobalRegionAction(globalRegion));
        }
    };

    return {
        getCurrentGlobalRegion,
        setCurrentGlobalRegion
    }
};