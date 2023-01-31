import { FC, useState } from "react";
import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";
import { useNews } from "../../actions/news/news.actions";
import { addNewsCardTextRegion } from "./add-news-card.text-region";

import style from './add-news-card.style.module.scss'

interface IAddNewsCardComponent {
    currentGlobalRegionType: GlobalRegionTypes;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddNewsCardComponent: FC<IAddNewsCardComponent> = ({setShow, currentGlobalRegionType}) => {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [globalRegionType, setGlobalRegionType] = useState<GlobalRegionTypes>(currentGlobalRegionType);
    const [image, setImage] = useState<File | null>();
    const { addNewsCard } = useNews();
    const addNewsCardText = addNewsCardTextRegion(currentGlobalRegionType);

    const onSubmit = async () => {
        if(!title || !body || !globalRegionType || !image) {
            alert('The all fields are required.');
            return;
        }
        const refresh = await addNewsCard({title, body, globalRegionName: globalRegionType, image});
        if(!refresh)
            return;
        setShow(false);
        window.location.reload();
    };

    return(
        <div className={style.add_news_card}>
            <div className={style.add_news_card_container}>
                <div className={style.add_news_card_body}>
                    <h1 className={style.add_news_card_title}>{addNewsCardText.blockTitle}</h1>
                    <div className={style.add_news_card_input_field}>
                        <select className={style.add_news_card_select} value={globalRegionType} onChange={e => setGlobalRegionType(e.target.value as GlobalRegionTypes)}>
                            {
                                Object.keys(GlobalRegionTypes).map((globalRegion, index) => {
                                    return <option key={index + Math.random()} value={globalRegion}>{globalRegion}</option>;
                                })
                            }
                        </select>
                        <input className={style.add_news_card_input} value={title} onChange={e => setTitle(e.target.value)}  type="text" placeholder={addNewsCardText.title} />
                        <input className={style.add_news_card_input} value={body} onChange={e => setBody(e.target.value)}  type="text" placeholder={addNewsCardText.body} />
                        <label className={style.add_news_card_input_file} htmlFor='img'>{addNewsCardText.image}</label>
                        <input id='img' className={style.add_news_card_input} type="file" onChange={e => setImage(e.target.files ? e.target.files[0] : null)} style={{display: 'none'}}/>
                        <button className={style.add_news_card_submit_btn} onClick={() => onSubmit()}>{addNewsCardText.submit}</button>
                        <button className={style.add_news_card_back_btn} onClick={() => setShow(false)}>&#8592; {addNewsCardText.back}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}