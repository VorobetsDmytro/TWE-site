import { NewsCard, CurrentNewsCards, NewsBlockRate, NewsBlock } from "./news.state.interface";

export enum NewsActionTypes {
    SET_NEWS_CARDS        = 'SET_NEWS_CARDS',
    SET_CURRENT_NEWS_CARD = 'SET_CURRENT_NEWS_CARD',
    UPDATE_NEWS_BLOCK = 'UPDATE_NEWS_BLOCK',
    UPDATE_NEWS_CARD_IMAGE = 'UPDATE_NEWS_CARD_IMAGE',
    UPDATE_NEWS_BLOCK_IMAGE = 'UPDATE_NEWS_BLOCK_IMAGE',
    ADD_NEWS_BLOCK = 'ADD_NEWS_BLOCK',
    REMOVE_NEWS_BLOCK = 'REMOVE_NEWS_BLOCK'
}

export interface SetNewsCardsAction {
    type: NewsActionTypes.SET_NEWS_CARDS;
    payload: CurrentNewsCards;
}

export interface SetCurrentNewsCardAction {
    type: NewsActionTypes.SET_CURRENT_NEWS_CARD,
    payload: NewsCard;
}

export interface UpdateNewsBlockAction {
    type: NewsActionTypes.UPDATE_NEWS_BLOCK,
    payload: NewsBlockRate
}

export interface UpdateNewsCardImageAction {
    type: NewsActionTypes.UPDATE_NEWS_CARD_IMAGE,
    payload: NewsCard
}

export interface UpdateNewsBlockImageAction {
    type: NewsActionTypes.UPDATE_NEWS_BLOCK_IMAGE,
    payload: NewsBlock
}

export interface AddNewsBlockAction {
    type: NewsActionTypes.ADD_NEWS_BLOCK,
    payload: NewsBlock
}

export interface RemoveNewsBlockAction {
    type: NewsActionTypes.REMOVE_NEWS_BLOCK,
    payload: string
}

export type NewsAction = SetNewsCardsAction
                       | SetCurrentNewsCardAction
                       | UpdateNewsBlockAction
                       | UpdateNewsCardImageAction
                       | AddNewsBlockAction
                       | UpdateNewsBlockImageAction
                       | RemoveNewsBlockAction;