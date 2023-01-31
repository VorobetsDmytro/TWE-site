import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../../hooks/type-selector";
import { useDispatch } from "react-redux";
import { useNews } from "../../actions/news/news.actions";
import { NewsCardOpenComponent } from "../../components/news-card-open/news-card-open.component";

export const NewsCardPage = () => {
    const { ready, getNewsCard } = useNews();
    const { currentNewsCard } = useTypedSelector(state => state.newsReducer);
    const { globalRegion } = useTypedSelector(state => state.globalRegionReducer);
    const dispatch: any = useDispatch();
    const { newsCardId } = useParams();

    useEffect(() => {
        if(newsCardId)
            dispatch(getNewsCard(newsCardId, globalRegion))
    }, [dispatch, globalRegion, newsCardId, getNewsCard]);

    if(!ready || !currentNewsCard)
        return <div></div>;
    return (
        <div>
            <NewsCardOpenComponent newsCard={currentNewsCard}/>
        </div>
    )
};