import { FC, useState } from "react";
import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";
import { NewsBlock } from "../../store/news/news.state.interface";
import { useNewsText } from "../../actions/news-text/news-text.actions";

import style from './add-news-block-text.style.module.scss'
import { addNewsBlockTextTextRegion } from "./add-news-block-text.text-region";

interface IAddNewsBlockTextComponent {
    newsBlock: NewsBlock;
    currentGlobalRegionType: GlobalRegionTypes;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddNewsBlockTextComponent: FC<IAddNewsBlockTextComponent> = ({newsBlock, setShow, currentGlobalRegionType}) => {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [globalRegionType, setGlobalRegionType] = useState<GlobalRegionTypes>(currentGlobalRegionType);
    const { addTextToNewsBlock } = useNewsText();
    const addNewsBlockTextText = addNewsBlockTextTextRegion(currentGlobalRegionType);

    const onSubmit = async () => {
        const refresh = await addTextToNewsBlock({title, body, globalRegionName: globalRegionType, newsBlockId: newsBlock.id});
        if(!refresh)
            return;
        setShow(false);
        window.location.reload();
    };

    return(
        <div className={style.add_news_block_text}>
            <div className={style.add_news_block_text_container}>
                <div className={style.add_news_block_text_body}>
                    <h1 className={style.add_news_block_text_title}>{addNewsBlockTextText.blockTitle}</h1>
                    <div className={style.add_news_block_text_input_field}>
                        <select className={style.add_news_block_text_select} value={globalRegionType} onChange={e => setGlobalRegionType(e.target.value as GlobalRegionTypes)}>
                            {
                                Object.keys(GlobalRegionTypes).map((globalRegion, index) => {
                                    return <option key={index + Math.random()} value={globalRegion}>{globalRegion}</option>;
                                })
                            }
                        </select>
                        <input className={style.add_news_block_text_input} value={title} onChange={e => setTitle(e.target.value)}  type="text" placeholder={addNewsBlockTextText.title} />
                        <input className={style.add_news_block_text_input} value={body} onChange={e => setBody(e.target.value)}  type="text" placeholder={addNewsBlockTextText.body} />
                        <button className={style.add_news_block_text_submit_btn} onClick={() => onSubmit()}>{addNewsBlockTextText.submit}</button>
                        <button className={style.add_news_block_text_back_btn} onClick={() => setShow(false)}>&#8592; {addNewsBlockTextText.back}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}