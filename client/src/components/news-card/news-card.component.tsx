import { FC } from "react";
import { NewsCard } from "../../store/news/news.state.interface";
import { BACK_URL } from "../../main.variables";

import style from "./news-card.style.module.scss";

interface INewsCardComponent {
    newsCard: NewsCard;
}

export const NewsCardComponent: FC<INewsCardComponent> = ({newsCard}) => {
    if(newsCard.newsTexts.length === 0)
        return <></>
    return(
        <div className={style.news_card}>
            <div className={style.news_card_image}>
                <img width={200} src={`${BACK_URL}/${newsCard.imgPath}`} alt="NewsCardImg" />
            </div>
            <div>
                <h1 className={style.news_card_title}>{newsCard.newsTexts[0].title}</h1>
            </div>
            <p>{newsCard.newsTexts[0].body}</p>
        </div>
    );
};