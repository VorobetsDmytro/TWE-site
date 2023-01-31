export interface NewsText {
    id: string;
    title: string;
    body: string;
    newsCardId: string;
    newsBlockId: string;
    globalRegionId: string;
}

export interface NewsCard {
    id: string;
    newsTexts: NewsText[];
    newsBlocks: NewsBlock[];
    imgPath: string;
}

export interface UserBlockRate {
    newsBlockRateId: string;
    userId: string;
    isLike: boolean;
}

export interface NewsBlockRate {
    id: string;
    likes: number;
    dislikes: number;
    newsBlockId: string;
    userBlockRates: UserBlockRate[];
}

export interface NewsBlock {
    id: string;
    newsTexts: NewsText[];
    imgPath: string;
    newsCardId: string;
    createdById: string;
    newsBlockRate: NewsBlockRate;
}

export interface CurrentNewsCards {
    newsCards: NewsCard[];
    total: number;
}

export interface NewsState {
    currentNewsCards: CurrentNewsCards;
    currentNewsCard: NewsCard | null;
}