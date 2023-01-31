import { FC, useEffect, useState } from "react";
import { NewsBlock } from "../../store/news/news.state.interface"
import { BACK_URL } from "../../main.variables";
import { useTypedSelector } from "../../hooks/type-selector";
import { useDispatch } from "react-redux";
import { useUserBlockRate } from "../../actions/user-block-rate/user-block-rate.actions"
import { ReactComponent as LikeSvg } from '../../images/like-icon.svg';
import { ReactComponent as DislikeSvg } from '../../images/dislike-icon.svg';
import { RoleTypes } from "../../store/user/user.state.interface";
import { EditNewsBlockImageComponent } from "../edit-news-block-image/edit-news-block-image.component";
import { EditNewsBlockTextComponent } from "../edit-news-block-text/edit-news-block-text.component";
import { AddNewsBlockTextComponent } from "../add-news-block-text/add-news-block-text.style.component";
import { PopupOkCancel } from "../popup-ok-cancel/popup-ok-cancel.component";
import { useNewsBlock } from "../../actions/news-block/news-block.actions";
import { addNewsBlockTextRegion } from "./news-block.text-region";

import style from './news-block.style.module.scss'

interface INewsBlockComponent {
    newsBlock: NewsBlock;
}

export const NewsBlockComponent: FC<INewsBlockComponent> = ({newsBlock}) => {
    const { rateNewsBlock } = useUserBlockRate();
    const { removeNewsBlock } = useNewsBlock();
    const { isAuth, user } = useTypedSelector(state => state.userReducer);
    const { globalRegion } = useTypedSelector(state => state.globalRegionReducer);
    const [userHasRateOnThis, setUserHasRateOnThis] = useState<boolean>(false);
    const [editImageState, setEditImageState] = useState<boolean>(false);
    const [editTextState, setEditTextState] = useState<boolean>(false);
    const [addTextState, setAddTextState] = useState<boolean>(false);
    const [showRemovePopup, setShowRemovePopup] = useState<boolean>(false);
    const dispatch: any = useDispatch();
    const isAdmin = isAuth && user.role && user.role.value === RoleTypes.ADMIN;
    const newsBlockText = addNewsBlockTextRegion(globalRegion);
    let imgPath = `${BACK_URL}/${newsBlock.imgPath}`;
    imgPath = imgPath.replaceAll('\\', '/');

    const onRemove = () => {
        dispatch(removeNewsBlock(newsBlock.id));
    }

    const onRateClick = (isLike: boolean) => {
        dispatch(rateNewsBlock({newsBlockRateId: newsBlock.newsBlockRate.id, isLike}));
    }

    useEffect(() => {
        setUserHasRateOnThis(newsBlock.newsBlockRate.userBlockRates && newsBlock.newsBlockRate.userBlockRates.length > 0 && newsBlock.newsBlockRate.userBlockRates[0].userId === user.id);
    }, [newsBlock.newsBlockRate.userBlockRates, user.id, userHasRateOnThis]);

    if(editImageState)
        return <EditNewsBlockImageComponent setShow={setEditImageState} newsBlock={newsBlock} />
    if(editTextState)
        return <EditNewsBlockTextComponent setShow={setEditTextState} newsBlock={newsBlock} currentGlobalRegionType={globalRegion} />
    if(addTextState)
        return <AddNewsBlockTextComponent setShow={setAddTextState} newsBlock={newsBlock} currentGlobalRegionType={globalRegion} />
    if(newsBlock.newsTexts.length === 0)
        return <></>
    return (
        <>
        <div className={style.news_block}>
            <div className={style.news_block_image}>
                <img src={`${imgPath}`} alt="NewsBlockImg" />
            </div>
            <div className={style.news_block_container}>
                <div className={style.news_block_info}>
                    <h1 className={style.news_block_title}>{newsBlock.newsTexts[0].title}</h1>
                    <p className={style.news_block_body}>{newsBlock.newsTexts[0].body}</p>
                    <div className={style.news_block_rate}>
                        {userHasRateOnThis && newsBlock.newsBlockRate.userBlockRates[0].isLike
                        ?
                            <div onClick={isAuth ? () => onRateClick(true) : () => {}} style={{cursor: isAuth ? 'pointer' : 'default'}} className={style.news_block_rate_item_picked}>
                                <LikeSvg />
                                <span>{newsBlock.newsBlockRate.likes}</span>
                            </div>
                        :
                            <div onClick={isAuth ? () => onRateClick(true) : () => {}} style={{cursor: isAuth ? 'pointer' : 'default'}} className={style.news_block_rate_item}>
                                <LikeSvg />
                                <span>{newsBlock.newsBlockRate.likes}</span>
                            </div>
                        }
                        {userHasRateOnThis && !newsBlock.newsBlockRate.userBlockRates[0].isLike
                        ?
                            <div onClick={isAuth ? () => onRateClick(false) : () => {}} style={{cursor: isAuth ? 'pointer' : 'default'}} className={style.news_block_rate_item_picked}>
                                <DislikeSvg />
                                <span>{newsBlock.newsBlockRate.dislikes}</span>
                            </div>
                        :
                            <div onClick={isAuth ? () => onRateClick(false) : () => {}} style={{cursor: isAuth ? 'pointer' : 'default'}} className={style.news_block_rate_item}>
                                <DislikeSvg />
                                <span>{newsBlock.newsBlockRate.dislikes}</span>
                            </div>
                        }
                    </div>
                </div>
                {isAdmin &&
                    <div className={style.news_block_admin}>
                        <div className={style.news_block_admin_body}>
                            <div>
                                <button className={style.news_block_admin_btn} onClick={() => setEditImageState(true)}>{newsBlockText.editBlockImage}</button>
                                <button className={style.news_block_admin_btn} onClick={() => setEditTextState(true)}>{newsBlockText.editBlockText}</button>
                                <button className={style.news_block_admin_btn} onClick={() => setAddTextState(true)}>{newsBlockText.addNewsText}</button>
                            </div>
                            <div>
                                <button className={style.news_block_remove_btn} onClick={() => setShowRemovePopup(true)}>{newsBlockText.removeNewsBlock}</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
        {showRemovePopup && <PopupOkCancel text={newsBlockText.popupRemove} onOk={onRemove} close={() => setShowRemovePopup(false)} />}
        </>
    )
}