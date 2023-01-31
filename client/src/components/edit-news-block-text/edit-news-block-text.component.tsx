import { FC, useState } from "react";
import { NewsBlock } from "../../store/news/news.state.interface";
import { useNewsText } from "../../actions/news-text/news-text.actions";
import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";
import { PopupOkCancel } from "../popup-ok-cancel/popup-ok-cancel.component";

import style from './edit-news-block-text.style.module.scss'
import { editNewsBlockTextTextRegion } from "./edit-news-block-text.text-region";

interface IEditNewsBlockTextComponent {
    newsBlock: NewsBlock;
    currentGlobalRegionType: GlobalRegionTypes;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditNewsBlockTextComponent: FC<IEditNewsBlockTextComponent> = ({newsBlock, setShow, currentGlobalRegionType}) => {
    const [title, setTitle] = useState<string>(newsBlock.newsTexts.length > 0 ? newsBlock.newsTexts[0].title : 'Error');
    const [body, setBody] = useState<string>(newsBlock.newsTexts.length > 0 ? newsBlock.newsTexts[0].body : 'Error');
    const [globalRegionType, setGlobalRegionType] = useState<GlobalRegionTypes>(currentGlobalRegionType);
    const [showRemovePopup, setShowRemovePopup] = useState<boolean>(false);
    const { updateNewsText, removeNewsText } = useNewsText();
    const editNewsBlockTextText = editNewsBlockTextTextRegion(currentGlobalRegionType);

    const onSubmit = async () => {
        if(newsBlock.newsTexts.length <= 0)
            return;
        const refresh = await updateNewsText({title, body, globalRegionName: globalRegionType}, newsBlock.newsTexts[0].id);
        if(!refresh)
            return;
        setShow(false);
        window.location.reload();
    };

    const onRemove = async () => {
        if(newsBlock.newsTexts.length <= 0)
            return;
        const refresh = await removeNewsText(newsBlock.newsTexts[0].id);
        if(!refresh)
            return;
        setShow(false);
        window.location.reload();
    }

    return(
        <>
        <div className={style.edit_news_block_text}>
            <div className={style.edit_news_block_text_container}>
                <div className={style.edit_news_block_text_body}>
                    <h1 className={style.edit_news_block_text_title}>{editNewsBlockTextText.blockTitle}</h1>
                    <div className={style.edit_news_block_text_input_field}>
                        <select className={style.edit_news_block_text_select} value={globalRegionType} onChange={e => setGlobalRegionType(e.target.value as GlobalRegionTypes)}>
                            {
                                Object.keys(GlobalRegionTypes).map((globalRegion, index) => {
                                    return <option key={index + Math.random()} value={globalRegion}>{globalRegion}</option>;
                                })
                            }
                        </select>
                        <input className={style.edit_news_block_text_input} value={title} onChange={e => setTitle(e.target.value)}  type="text" placeholder={editNewsBlockTextText.title} />
                        <input className={style.edit_news_block_text_input} value={body} onChange={e => setBody(e.target.value)}  type="text" placeholder={editNewsBlockTextText.body} />
                        <button className={style.edit_news_block_text_submit_btn} onClick={() => onSubmit()}>{editNewsBlockTextText.submit}</button>
                        <button className={style.edit_news_block_text_remove_btn} onClick={() => setShowRemovePopup(true)}>{editNewsBlockTextText.remove}</button>
                        <button className={style.edit_news_block_text_back_btn} onClick={() => setShow(false)}>&#8592; {editNewsBlockTextText.back}</button>
                    </div>
                </div>
            </div>
        </div>
        {showRemovePopup && <PopupOkCancel text={editNewsBlockTextText.popupRemove} onOk={onRemove} close={() => setShowRemovePopup(false)}/>} 
        </>
    )
}
