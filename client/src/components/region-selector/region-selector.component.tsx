import { FC } from "react";
import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";
import { useDispatch } from "react-redux";
import { useGlobalRegion } from "../../actions/global-region/global-region.actions";

import style from './region-selector.style.module.scss';

interface IRegionSelector {
    globalRegionName: string;
}

export const RegionSelectorComponent: FC<IRegionSelector> = ({globalRegionName}) => {
    const { setCurrentGlobalRegion } = useGlobalRegion();
    const dispatch: any = useDispatch();
    const optionSelect = (globalRegion: GlobalRegionTypes) => {
        dispatch(setCurrentGlobalRegion(globalRegion));
    };

    return(
        <select className={style.region_selector} value={globalRegionName} onChange={e => optionSelect(e.target.value as GlobalRegionTypes)}>
            {
                Object.keys(GlobalRegionTypes).map((globalRegion, index) => {
                    return <option key={index + Math.random()} value={globalRegion}>{globalRegion}</option>;
                })
            }
        </select>
    )
};