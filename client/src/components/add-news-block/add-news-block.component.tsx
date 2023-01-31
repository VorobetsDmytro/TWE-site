import { FC, useState } from "react";
import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";
import { NewsCard } from "../../store/news/news.state.interface";
import { useNewsBlock } from "../../actions/news-block/news-block.actions";
import { useDispatch } from "react-redux";
import { addNewsBlockTextRegion } from "./add-news-block.text-region";

import style from './add-news-block.style.module.scss'

interface IAddNewsBlockComponent {
    newsCard: NewsCard;
    currentGlobalRegionType: GlobalRegionTypes;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddNewsBlockComponent: FC<IAddNewsBlockComponent> = ({newsCard, setShow, currentGlobalRegionType}) => {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [globalRegionType, setGlobalRegionType] = useState<GlobalRegionTypes>(currentGlobalRegionType);
    const [image, setImage] = useState<File | null>();
    const { addNewsBlock } = useNewsBlock();
    const addNewsBlockText = addNewsBlockTextRegion(currentGlobalRegionType);
    const dispatch: any = useDispatch();

    const onSubmit = async () => {
        if(!title || !body || !globalRegionType || !image) {
            alert('The all fields are required.');
            return;
        }
        const show = dispatch(addNewsBlock({title, body, globalRegionName: globalRegionType, image, newsCardId: newsCard.id}));
        if(!show)
            return;
        setShow(false);
    };

    return(
        <div className={style.add_news_block}>
            <div className={style.add_news_block_container}>
                <div className={style.add_news_block_body}>
                    <h1 className={style.add_news_block_title}>{addNewsBlockText.blockTitle}</h1>
                    <div className={style.add_news_block_input_field}>
                        <select className={style.add_news_block_select} value={globalRegionType} onChange={e => setGlobalRegionType(e.target.value as GlobalRegionTypes)}>
                            {
                                Object.keys(GlobalRegionTypes).map((globalRegion, index) => {
                                    return <option key={index + Math.random()} value={globalRegion}>{globalRegion}</option>;
                                })
                            }
                        </select>
                        <input className={style.add_news_block_input} value={title} onChange={e => setTitle(e.target.value)}  type="text" placeholder={addNewsBlockText.title} />
                        <input className={style.add_news_block_input} value={body} onChange={e => setBody(e.target.value)}  type="text" placeholder={addNewsBlockText.body} />
                        <label className={style.add_news_block_input_file} htmlFor='img'>{addNewsBlockText.image}</label>
                        <input id='img' className={style.add_news_block_input} type="file" onChange={e => setImage(e.target.files ? e.target.files[0] : null)} style={{display: 'none'}}/>
                        <button className={style.add_news_block_submit_btn} onClick={() => onSubmit()}>{addNewsBlockText.submit}</button>
                        <button className={style.add_news_block_back_btn} onClick={() => setShow(false)}>&#8592; {addNewsBlockText.back}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}