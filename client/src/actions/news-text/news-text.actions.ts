import { useHttp } from "../../hooks/http.hooks";
import { BACK_URL } from "../../main.variables";
import { AddTextToNewsBlockDto } from "./dto/add-text-to-news-block.dto";
import { AddTextToNewsCardDto } from "./dto/add-text-to-news-card.dto";
import { UpdateNewsTextDto } from "./dto/update-news-text.dto";

export const useNewsText = () => {
    const { request } = useHttp();

    const updateNewsText = async (dto: UpdateNewsTextDto, newsTextId: string) => {
        try {
            const response = await request(`${BACK_URL}/news-text/${newsTextId}`, 'PATCH', dto, {Authorization: `Bearer ${localStorage.getItem('token')}`});
            if(response instanceof Error)
                throw response;
            return true;
        } catch (error) {
            alert(error);
            return false;
        }
    }

    const addTextToNewsCard = async (dto: AddTextToNewsCardDto) => {
        try {
            const response = await request(`${BACK_URL}/news-text/news-card/add`, 'POST', dto, {Authorization: `Bearer ${localStorage.getItem('token')}`});
            if(response instanceof Error)
                throw response;
            return true;
        } catch (error) {
            alert(error);
            return false;
        }
    };

    const addTextToNewsBlock = async (dto: AddTextToNewsBlockDto) => {
        try {
            const response = await request(`${BACK_URL}/news-text/news-block/add`, 'POST', dto, {Authorization: `Bearer ${localStorage.getItem('token')}`});
            if(response instanceof Error)
                throw response;
            return true;
        } catch (error) {
            alert(error);
            return false;
        }
    }

    const removeNewsText = async (newsTextId: string) => {
        try {
            const response = await request(`${BACK_URL}/news-text/${newsTextId}`, 'DELETE', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
            if(response instanceof Error)
                throw response;
            return true;
        } catch (error) {
            alert(error);
            return false;
        }
    }

    return {
        updateNewsText,
        addTextToNewsCard,
        addTextToNewsBlock,
        removeNewsText
    }
}