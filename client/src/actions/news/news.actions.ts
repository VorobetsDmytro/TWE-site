import { useCallback, useState } from "react";
import { useHttp } from "../../hooks/http.hooks";
import { setCurrentNewsCard, setNewsCardsAction, updateNewsCardImageAction } from "../../store/news/news.actions";
import { BACK_URL } from "../../main.variables";
import { GlobalRegionTypes } from "../../store/global-region/global-region.state.interface";
import { UpdateNewsCardImageDto } from "./dto/update-news-card-image.dto";
import { AddNewsCardDto } from "./dto/add-news-card.dto";

export const useNews = () => {
    const [ready, setReady] = useState(false);
    const { request } = useHttp();

    const addNewsCard = async (dto: AddNewsCardDto) => {
        try {
            let formData: FormData = new FormData();
            formData.append('globalRegionName', dto.globalRegionName);
            formData.append('title', dto.title);
            formData.append('body', dto.body);
            formData.append('image', dto.image);
            const response = await request(`${BACK_URL}/news-card`, 'POST', formData, {Authorization: `Bearer ${localStorage.getItem('token')}`});
            if(response instanceof Error)
                throw response;
            return true;
        } catch (error) {
            alert(error);
            return false;
        }
    }

    const getNewsCards = useCallback((globalRegion: GlobalRegionTypes, limit: number, offset: number) => {
        return async (dispatch: any) => {
            try {
                setReady(false);
                const response = await request(`${BACK_URL}/news-card?gr=${globalRegion}&limit=${limit}&offset=${offset}`, 'GET');
                if(response instanceof Error)
                    throw response;
                dispatch(setNewsCardsAction(response));
                return response;
            } catch (error) {
                alert(error);
            } finally {
                setReady(true);
            }
        }
    }, [request]);

    const getNewsCard = useCallback((userCardId: string, globalRegion: GlobalRegionTypes) => {
        return async (dispatch: any) => {
            try {
                setReady(false);
                const response = await request(`${BACK_URL}/news-card/${userCardId}?gr=${globalRegion}`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setCurrentNewsCard(response));
                return response;
            } catch (error) {
                alert(error);
            } finally {
                setReady(true);
            }
        }
    }, [request]);

    const updateNewsCardImage = (dto: UpdateNewsCardImageDto, newsCardId: string) => {
        return async (dispatch: any) => {
            try {
                let formData: FormData = new FormData();
                formData.append('image', dto.image);
                const response = await request(`${BACK_URL}/news-card/${newsCardId}`, 'PATCH', formData, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(updateNewsCardImageAction(response));
                return response;
            } catch (error) {
                alert(error);
            }
        }
    }

    const removeNewsCard = async (newsCardId: string) => {
        try {
            const response = await request(`${BACK_URL}/news-card/${newsCardId}`, 'DELETE', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
            if(response instanceof Error)
                throw response;
            return true;
        } catch (error) {
            alert(error);
            return false;
        } 
    }

    return {
        ready,
        addNewsCard,
        getNewsCards,
        getNewsCard,
        updateNewsCardImage,
        removeNewsCard
    }
}