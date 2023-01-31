import { FC, useState } from 'react'
import { NewsBlock } from "../../store/news/news.state.interface"
import { useDispatch } from 'react-redux';
import { useNewsBlock } from '../../actions/news-block/news-block.actions';
import { useTypedSelector } from '../../hooks/type-selector';
import { editNewsBlockImageTextRegion } from './edit-news-block-image.text-region';

import style from './edit-news-block-image.style.module.scss';

interface IEditNewsBlockImageComponent {
    newsBlock: NewsBlock;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditNewsBlockImageComponent: FC<IEditNewsBlockImageComponent> = ({newsBlock, setShow}) => {
    const { updateNewsBlockImage } = useNewsBlock();
    const { globalRegion } = useTypedSelector(state => state.globalRegionReducer);
    const dispatch: any = useDispatch();
    const [image, setImage] = useState<File | null>();
    const editNewsBlockText = editNewsBlockImageTextRegion(globalRegion);

    const onSubmit = () => {
        if(!image) {
            alert('The image is required.');
            return;
        }
        dispatch(updateNewsBlockImage({image}, newsBlock.id));
        setShow(false);
    };

    return(
        <div className={style.edit_news_block_image}>
            <div className={style.edit_news_block_image_container}>
                <div className={style.edit_news_block_image_body}>
                    <h1 className={style.edit_news_block_image_title}>{editNewsBlockText.blockTitle}</h1>
                    <div className={style.edit_news_block_image_input_field}>
                        <label className={style.edit_news_block_image_input_file} htmlFor='img'>{editNewsBlockText.image}</label>
                        <input id='img' className={style.edit_news_block_image_input} type="file" onChange={e => setImage(e.target.files ? e.target.files[0] : null)} style={{display: 'none'}}/>
                        <button className={style.edit_news_block_image_submit_btn} onClick={() => onSubmit()}>{editNewsBlockText.submit}</button>
                        <button className={style.edit_news_block_image_back_btn} onClick={() => setShow(false)}>&#8592; {editNewsBlockText.back}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}