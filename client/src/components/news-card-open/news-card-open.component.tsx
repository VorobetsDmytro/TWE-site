import { FC, useState } from "react";
import { NewsCard } from "../../store/news/news.state.interface";
import { BACK_URL } from "../../main.variables";
import { NewsBlockComponent } from "../news-block/news-block.component";
import { useTypedSelector } from "../../hooks/type-selector";
import { RoleTypes } from "../../store/user/user.state.interface";
import { EditNewsCardImageComponent } from "../edit-news-card-image/edit-news-card-image.component";
import { EditNewsCardTextComponent } from "../edit-news-card-text/edit-news-card-text.component";
import { AddNewsCardTextComponent } from "../add-news-card-text/add-news-card-text.component";
import { AddNewsBlockComponent } from "../add-news-block/add-news-block.component";
import { PopupOkCancel } from "../popup-ok-cancel/popup-ok-cancel.component";
import { useNews } from "../../actions/news/news.actions";
import { useNavigate } from "react-router-dom";
import { newsCardOpenTextRegion } from "./news-card-open.text-region";

import style from './news-card-open.style.module.scss';

interface INewsCardOpenComponent {
    newsCard: NewsCard;
}

export const NewsCardOpenComponent: FC<INewsCardOpenComponent> = ({newsCard}) => {
    const { removeNewsCard } = useNews();
    const navigate = useNavigate();
    const { isAuth, user } = useTypedSelector(state => state.userReducer);
    const { globalRegion } = useTypedSelector(state => state.globalRegionReducer);
    const [editTextState, setEditTextState] = useState<boolean>(false);
    const [editImageState, setEditImageState] = useState<boolean>(false);
    const [addTextState, setAddTextState] = useState<boolean>(false);
    const [addBlockState, setAddBlockState] = useState<boolean>(false);
    const [showRemovePopup, setShowRemovePopup] = useState<boolean>(false);
    const isAdmin = isAuth && user.role && user.role.value === RoleTypes.ADMIN;
    const newsCardOpenText = newsCardOpenTextRegion(globalRegion);
    let imgPath = `${BACK_URL}/${newsCard.imgPath}`;
    imgPath = imgPath.replaceAll('\\', '/');

    const onRemove = async () => {
        const navigateToNews = await removeNewsCard(newsCard.id);
        if(!navigateToNews)
            return;
        navigate('/news');
    }

    if(editImageState)
        return <EditNewsCardImageComponent setShow={setEditImageState} newsCard={newsCard} />
    if(editTextState)
        return <EditNewsCardTextComponent setShow={setEditTextState} newsCard={newsCard} currentGlobalRegionType={globalRegion} />
    if(addTextState)
        return <AddNewsCardTextComponent setShow={setAddTextState} newsCard={newsCard} currentGlobalRegionType={globalRegion} />
    if(addBlockState)
        return <AddNewsBlockComponent setShow={setAddBlockState} newsCard={newsCard} currentGlobalRegionType={globalRegion} />
    if(newsCard.newsTexts.length === 0)
        return (
            <div className={style.news_card_open_empty}>
                <h1>{newsCardOpenText.emptyTitle}</h1>
                {isAdmin && <button className={style.news_card_open_admin_btn} onClick={() => setAddTextState(true)}>{newsCardOpenText.addNewsText}</button>}
            </div>
        )
    return (
        <>
        <div className={style.news_card_open}>
            <div className={style.news_card_open_header}>
                <div className={style.news_card_open_image} style={{backgroundImage: `url(${imgPath}`}}></div>
                <div className={style.news_card_open_container}>
                    <div className={style.news_card_open_info}>
                        <h1 className={style.news_card_open_title}>{newsCard.newsTexts[0].title}</h1>
                        <p className={style.news_card_open_body}>{newsCard.newsTexts[0].body}</p>
                    </div>
                </div>
                {isAdmin && 
                    <div className={style.news_card_open_admin}>
                        <div className={style.news_card_open_admin_body}>
                            <div className={style.news_card_open_admin_buttons}>
                                <button className={style.news_card_open_admin_btn} onClick={() => setEditImageState(true)}>{newsCardOpenText.editCardImage}</button>
                                <button className={style.news_card_open_admin_btn} onClick={() => setEditTextState(true)}>{newsCardOpenText.editCardText}</button>
                                <button className={style.news_card_open_admin_btn} onClick={() => setAddTextState(true)}>{newsCardOpenText.addNewsText}</button>
                                <button className={style.news_card_open_admin_btn} onClick={() => setAddBlockState(true)}>{newsCardOpenText.addNewBlock}</button>
                            </div>
                            <div className={style.news_card_open_admin_remove}>
                                <button className={style.news_card_open_remove_btn} onClick={() => setShowRemovePopup(true)}>{newsCardOpenText.removeNewsBlock}</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {newsCard.newsBlocks.map((newsBlock, index) => {
                return <NewsBlockComponent key={index + Math.random()} newsBlock={newsBlock} />
            })}
        </div>
        {showRemovePopup && <PopupOkCancel text={newsCardOpenText.popupRemove} onOk={onRemove} close={() => setShowRemovePopup(false)} />}
        </>
    );
}