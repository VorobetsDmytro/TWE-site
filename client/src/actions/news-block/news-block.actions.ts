import { useHttp } from "../../hooks/http.hooks";
import { BACK_URL } from "../../main.variables";
import { addNewsBlockAction, removeNewsBlockAction, updateNewsBlockImageAction } from "../../store/news/news.actions";
import { AddNewsBlockDto } from "./dto/add-news-block.dto";
import { UpdateNewsBlockImage } from "./dto/update-news-block-image.dto";

export const useNewsBlock = () => {
    const { request } = useHttp();
    
    const addNewsBlock = (dto: AddNewsBlockDto) => {
        return async (dispatch: any): Promise<boolean> => {
            try {
                let formData: FormData = new FormData();
                formData.append('globalRegionName', dto.globalRegionName);
                formData.append('title', dto.title);
                formData.append('body', dto.body);
                formData.append('newsCardId', dto.newsCardId);
                formData.append('image', dto.image);
                const response = await request(`${BACK_URL}/news-block`, 'POST', formData, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(addNewsBlockAction(response));
                return true;
            } catch (error) {
                alert(error);
                return false
            }
        }
    }

    const updateNewsBlockImage = (dto: UpdateNewsBlockImage, newsBlockId: string) => {
        return async (dispatch: any) => {
            try {
                let formData: FormData = new FormData();
                formData.append('image', dto.image);
                const response = await request(`${BACK_URL}/news-block/${newsBlockId}`, 'PATCH', formData, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(updateNewsBlockImageAction(response));
                return response;
            } catch (error) {
                alert(error);
            }
        }
    }

    const removeNewsBlock = (newsBlockId: string) => {
        return async (dispatch: any) => {
            try {
                const response = await request(`${BACK_URL}/news-block/${newsBlockId}`, 'DELETE', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(removeNewsBlockAction(newsBlockId));
                return true;
            } catch (error) {
                alert(error);
                return false;
            } 
        }
    }

    return {
        addNewsBlock,
        updateNewsBlockImage,
        removeNewsBlock
    }
}