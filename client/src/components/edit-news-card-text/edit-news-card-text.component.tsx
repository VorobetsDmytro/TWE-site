import { FC, useState } from "react";
import { NewsCard } from "../../store/news/news.state.interface";
import { useNewsText } from "../../actions/news-text/news-text.actions";
import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";
import { PopupOkCancel } from "../popup-ok-cancel/popup-ok-cancel.component";
import { editNewsCardTextTextRegion } from "./edit-news-card-text.text-region";

import style from './edit-news-card-text.style.module.scss'

interface IEditNewsCardTextComponent {
    newsCard: NewsCard;
    currentGlobalRegionType: GlobalRegionTypes;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditNewsCardTextComponent: FC<IEditNewsCardTextComponent> = ({newsCard, setShow, currentGlobalRegionType}) => {
    const [title, setTitle] = useState<string>(newsCard.newsTexts.length > 0 ? newsCard.newsTexts[0].title : 'Error');
    const [body, setBody] = useState<string>(newsCard.newsTexts.length > 0 ? newsCard.newsTexts[0].body : 'Error');
    const [globalRegionType, setGlobalRegionType] = useState<GlobalRegionTypes>(currentGlobalRegionType);
    const [showRemovePopup, setShowRemovePopup] = useState<boolean>(false);
    const { updateNewsText, removeNewsText } = useNewsText();
    const editNewsCardTextText = editNewsCardTextTextRegion(currentGlobalRegionType);

    const onSubmit = async () => {
        if(newsCard.newsTexts.length <= 0)
            return;
        const refresh = await updateNewsText({title, body, globalRegionName: globalRegionType}, newsCard.newsTexts[0].id);
        if(!refresh)
            return;
        setShow(false);
        window.location.reload();
    };

    const onRemove = async () => {
        if(newsCard.newsTexts.length <= 0)
            return;
        const refresh = await removeNewsText(newsCard.newsTexts[0].id);
        if(!refresh)
            return;
        setShow(false);
        window.location.reload();
    }

    return(
        <>
        <div className={style.edit_news_card_text}>
            <div className={style.edit_news_card_text_container}>
                <div className={style.edit_news_card_text_body}>
                    <h1 className={style.edit_news_card_text_title}>{editNewsCardTextText.blockTitle}</h1>
                    <div className={style.edit_news_card_text_input_field}>
                        <select className={style.edit_news_card_text_select} value={globalRegionType} onChange={e => setGlobalRegionType(e.target.value as GlobalRegionTypes)}>
                            {
                                Object.keys(GlobalRegionTypes).map((globalRegion, index) => {
                                    return <option key={index + Math.random()} value={globalRegion}>{globalRegion}</option>;
                                })
                            }
                        </select>
                        <input className={style.edit_news_card_text_input} value={title} onChange={e => setTitle(e.target.value)}  type="text" placeholder={editNewsCardTextText.title} />
                        <input className={style.edit_news_card_text_input} value={body} onChange={e => setBody(e.target.value)}  type="text" placeholder={editNewsCardTextText.body} />
                        <button className={style.edit_news_card_text_submit_btn} onClick={() => onSubmit()}>{editNewsCardTextText.submit}</button>
                        <button className={style.edit_news_card_text_remove_btn} onClick={() => setShowRemovePopup(true)}>{editNewsCardTextText.remove}</button>
                        <button className={style.edit_news_card_text_back_btn} onClick={() => setShow(false)}>&#8592; {editNewsCardTextText.back}</button>
                    </div>
                </div>
            </div>
        </div>
        {showRemovePopup && <PopupOkCancel text={editNewsCardTextText.popupRemove} onOk={onRemove} close={() => setShowRemovePopup(false)}/>} 
        </>
    )
}
