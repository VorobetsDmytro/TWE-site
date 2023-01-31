import { FC, useState } from 'react'
import { NewsCard } from "../../store/news/news.state.interface"
import { useNews } from '../../actions/news/news.actions';
import { useDispatch } from 'react-redux';

import style from './edit-news-card-image.style.module.scss';
import { editNewsCardImageTextRegion } from './edit-news-card-image.text-region';
import { useTypedSelector } from '../../hooks/type-selector';

interface IEditNewsCardImageComponent {
    newsCard: NewsCard;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditNewsCardImageComponent: FC<IEditNewsCardImageComponent> = ({newsCard, setShow}) => {
    const { updateNewsCardImage } = useNews();
    const { globalRegion } = useTypedSelector(state => state.globalRegionReducer);
    const dispatch: any = useDispatch();
    const [image, setImage] = useState<File | null>();
    const editNewsCardImageText = editNewsCardImageTextRegion(globalRegion);

    const onSubmit = () => {
        if(!image) {
            alert('The image is required.');
            return;
        }
        dispatch(updateNewsCardImage({image}, newsCard.id));
        setShow(false);
    };

    return(
        <div className={style.edit_news_card_image}>
            <div className={style.edit_news_card_image_container}>
                <div className={style.edit_news_card_image_body}>
                    <h1 className={style.edit_news_card_image_title}>{editNewsCardImageText.blockTitle}</h1>
                    <div className={style.edit_news_card_image_input_field}>
                        <label className={style.edit_news_card_image_input_file} htmlFor='img'>{editNewsCardImageText.image}</label>
                        <input id='img' className={style.edit_news_card_image_input} type="file" onChange={e => setImage(e.target.files ? e.target.files[0] : null)} style={{display: 'none'}}/>
                        <button className={style.edit_news_card_image_submit_btn} onClick={() => onSubmit()}>{editNewsCardImageText.submit}</button>
                        <button className={style.edit_news_card_image_back_btn} onClick={() => setShow(false)}>&#8592; {editNewsCardImageText.back}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}