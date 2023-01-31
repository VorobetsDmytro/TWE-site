import { FC, useState } from "react";
import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";
import { NewsCard } from "../../store/news/news.state.interface";
import { useNewsText } from "../../actions/news-text/news-text.actions";
import { addNewsCardTextTextRegion } from "./add-news-card-text.text-region";

import style from './add-news-card-text.style.module.scss'

interface IAddNewsCardTextComponent {
    newsCard: NewsCard;
    currentGlobalRegionType: GlobalRegionTypes;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddNewsCardTextComponent: FC<IAddNewsCardTextComponent> = ({newsCard, setShow, currentGlobalRegionType}) => {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [globalRegionType, setGlobalRegionType] = useState<GlobalRegionTypes>(currentGlobalRegionType);
    const { addTextToNewsCard } = useNewsText();
    const addNewsCardText = addNewsCardTextTextRegion(currentGlobalRegionType);

    const onSubmit = async () => {
        const refresh = await addTextToNewsCard({title, body, globalRegionName: globalRegionType, newsCardId: newsCard.id});
        if(!refresh)
            return;
        setShow(false);
        window.location.reload();
    };

    return(
        <div className={style.add_news_card_text}>
            <div className={style.add_news_card_text_container}>
                <div className={style.add_news_card_text_body}>
                    <h1 className={style.add_news_card_text_title}>{addNewsCardText.blockTitle}</h1>
                    <div className={style.add_news_card_text_input_field}>
                        <select className={style.add_news_card_text_select} value={globalRegionType} onChange={e => setGlobalRegionType(e.target.value as GlobalRegionTypes)}>
                            {
                                Object.keys(GlobalRegionTypes).map((globalRegion, index) => {
                                    return <option key={index + Math.random()} value={globalRegion}>{globalRegion}</option>;
                                })
                            }
                        </select>
                        <input className={style.add_news_card_text_input} value={title} onChange={e => setTitle(e.target.value)}  type="text" placeholder={addNewsCardText.title} />
                        <input className={style.add_news_card_text_input} value={body} onChange={e => setBody(e.target.value)}  type="text" placeholder={addNewsCardText.body} />
                        <button className={style.add_news_card_text_submit_btn} onClick={() => onSubmit()}>{addNewsCardText.submit}</button>
                        <button className={style.add_news_card_text_back_btn} onClick={() => setShow(false)}>&#8592; {addNewsCardText.back}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}