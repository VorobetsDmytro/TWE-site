import { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/type-selector";
import { useDispatch } from "react-redux";
import { useNews } from "../../actions/news/news.actions";
import { NewsCardComponent } from "../../components/news-card/news-card.component";
import { NavLink, useSearchParams } from "react-router-dom";
import { PaginationListComponent } from "../../components/pagination-list/pagination-list.component";
import { RoleTypes } from "../../store/user/user.state.interface";
import { newsPageTextRegion } from "./news-page.text-region";
import { AddNewsCardComponent } from "../../components/add-news-card/add-news-card.component";

import style from "./news.page.style.module.scss";

export const NewsPage = () => {
    const { isAuth, user } = useTypedSelector(state => state.userReducer);
    const { currentNewsCards } = useTypedSelector(state => state.newsReducer);
    const { globalRegion } = useTypedSelector(state => state.globalRegionReducer);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [addNewsCardState, setAddNewsCardState] = useState<boolean>(false);
    const { ready, getNewsCards } = useNews();
    const [searchParams] = useSearchParams();
    const dispatch: any = useDispatch();
    const isAdmin = isAuth && user.role && user.role.value === RoleTypes.ADMIN;
    const newsPageText = newsPageTextRegion(globalRegion);

    useEffect(() => {
        window.scrollTo(0, 0);
        const pageNumber = searchParams.get('page');
        setCurrentPage(pageNumber && +pageNumber > 0 ? +pageNumber : 1);
        dispatch(getNewsCards(globalRegion, 9, pageNumber ? (+pageNumber - 1) * 9 : 0));
    }, [dispatch, getNewsCards, globalRegion, searchParams]);

    if(addNewsCardState) 
        return <AddNewsCardComponent currentGlobalRegionType={globalRegion} setShow={setAddNewsCardState} />
    if(!ready)
        return <div></div>;
    return(
        <div className={style.news_page}>
            {isAdmin && 
                <div className={style.news_page_admin}>
                    <button className={style.news_page_add_btn} onClick={() => setAddNewsCardState(true)}>{newsPageText.addNewsCard}</button>
                </div>
            }
            {currentNewsCards.newsCards.length > 0
            ?
                <div className={style.news_page_container}>
                    <div className={style.news_page_body}>
                        {
                            currentNewsCards.newsCards.map((newsCard) => {
                                return <NavLink key={newsCard.id} to={`/news/${newsCard.id}`}><NewsCardComponent newsCard={newsCard}/></NavLink>
                            })
                        }
                    </div>
                </div>
            :
                <div className={style.news_page_empty}>
                    <h1 className={style.news_page_empty_title}>{newsPageText.emptyTitle}</h1>
                </div> 
            }
            {currentNewsCards.newsCards.length > 0 && 
                <div className={style.news_page_pagination_list}>
                    <PaginationListComponent queryParamsName="page" currentPage={currentPage} limit={9} total={currentNewsCards.total} /> 
                </div>
            }
        </div>
    );
}