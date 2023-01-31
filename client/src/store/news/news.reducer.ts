import { NewsAction, NewsActionTypes } from "./news.action.interface";
import { NewsState } from "./news.state.interface";

const defaultState: NewsState = {
    currentNewsCards: {
        newsCards: [],
        total: 0
    },
    currentNewsCard: null
};

export const newsReducer = (state = defaultState, action: NewsAction): NewsState => {
    switch(action.type) {
        case NewsActionTypes.SET_NEWS_CARDS:
            return {
                ...state,
                currentNewsCards: {
                    newsCards: action.payload.newsCards,
                    total: action.payload.total
                }
            };
        case NewsActionTypes.SET_CURRENT_NEWS_CARD:
            return {
                ...state,
                currentNewsCard: action.payload
            }
        case NewsActionTypes.UPDATE_NEWS_BLOCK: 
            if(!state.currentNewsCard || !state.currentNewsCard.newsBlocks)
                return state;
            const newsBlocks = state.currentNewsCard.newsBlocks.map((newsBlock) => {
                if(newsBlock.newsBlockRate.id === action.payload.id)
                    return {
                        ...newsBlock,
                        newsBlockRate: action.payload
                    }
                return newsBlock;
            });
            return {
                ...state,
                currentNewsCard: {
                    ...state.currentNewsCard,
                    newsBlocks
                }
            };
        case NewsActionTypes.UPDATE_NEWS_CARD_IMAGE:
            if(!state.currentNewsCard)
                return state;
            return {
                ...state,
                currentNewsCard: {
                    ...state.currentNewsCard,
                    imgPath: action.payload.imgPath
                }
            }
        case NewsActionTypes.UPDATE_NEWS_BLOCK_IMAGE: 
            if(!state.currentNewsCard)
                return state;
            return {
                ...state,
                currentNewsCard: {
                    ...state.currentNewsCard,
                    newsBlocks: state.currentNewsCard.newsBlocks.map((newsBlock) => {
                        return action.payload.id === newsBlock.id
                        ?
                            {
                                ...newsBlock,
                                imgPath: action.payload.imgPath
                            }
                        :
                        newsBlock
                    })
                }
            }
        case NewsActionTypes.ADD_NEWS_BLOCK: 
            if(!state.currentNewsCard)
                return state;
            return {
                ...state,
                currentNewsCard: {
                    ...state.currentNewsCard,
                    newsBlocks: [
                        ...state.currentNewsCard.newsBlocks,
                        action.payload
                    ]
                }
            }
        case NewsActionTypes.REMOVE_NEWS_BLOCK:
            if(!state.currentNewsCard || state.currentNewsCard.newsBlocks.length === 0)
                return state;
            return {
                ...state,
                currentNewsCard: {
                    ...state.currentNewsCard,
                    newsBlocks: state.currentNewsCard.newsBlocks.filter((newsBlock) => {
                        return newsBlock.id !== action.payload;
                    })
                }
            }
        default:
            return state;
    }
};