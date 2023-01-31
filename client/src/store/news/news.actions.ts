import { NewsAction, NewsActionTypes } from "./news.action.interface";
import { CurrentNewsCards, NewsBlock, NewsBlockRate, NewsCard } from "./news.state.interface";

export const setNewsCardsAction = (payload: CurrentNewsCards): NewsAction => ({type: NewsActionTypes.SET_NEWS_CARDS, payload});
export const setCurrentNewsCard = (payload: NewsCard): NewsAction => ({type: NewsActionTypes.SET_CURRENT_NEWS_CARD, payload});
export const updateNewsBlockAction = (payload: NewsBlockRate): NewsAction => ({type: NewsActionTypes.UPDATE_NEWS_BLOCK, payload});
export const updateNewsCardImageAction = (payload: NewsCard): NewsAction => ({type: NewsActionTypes.UPDATE_NEWS_CARD_IMAGE, payload});
export const updateNewsBlockImageAction = (payload: NewsBlock): NewsAction => ({type: NewsActionTypes.UPDATE_NEWS_BLOCK_IMAGE, payload});
export const addNewsBlockAction = (payload: NewsBlock): NewsAction => ({type: NewsActionTypes.ADD_NEWS_BLOCK, payload});
export const removeNewsBlockAction = (payload: string): NewsAction => ({type: NewsActionTypes.REMOVE_NEWS_BLOCK, payload});