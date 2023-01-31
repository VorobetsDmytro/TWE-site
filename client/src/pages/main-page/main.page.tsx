import { mainPageTextRegion } from './main-page.text-region';
import { useTypedSelector } from '../../hooks/type-selector';

import style from './main-page.style.module.scss'
import TWEPicture from '../../images/TWE-main-image.png'
import { useFile } from '../../actions/file/file.actions';

export const MainPage = () => {
    const { globalRegion } = useTypedSelector(state => state.globalRegionReducer);
    const mainText = mainPageTextRegion(globalRegion);
    const { tweDownload } = useFile();

    const onDownload = async () => {
        await tweDownload();
    }

    return (
        <div className={style.main}>
            <div className={style.main_header}>
                <div className={style.main_image} style={{backgroundImage: `url(${TWEPicture})`}}></div>
                <div className={style.main_container}>
                    <div className={style.main_info}>
                        <h1 className={style.main_title}>THE <span className={style.main_worst_word}>WORST</span> ENGINE</h1>
                        <p className={style.main_body}>{mainText.theWorstExpereience}</p>
                        <p className={style.main_body}>{mainText.justTryItNow}</p>
                        <button className={style.main_download_btn} onClick={() => onDownload()}>{mainText.download}</button>
                    </div>
                </div>
            </div>
        </div>
    )
};