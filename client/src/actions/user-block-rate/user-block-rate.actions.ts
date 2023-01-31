import { useHttp } from "../../hooks/http.hooks";
import { BACK_URL } from "../../main.variables";
import { updateNewsBlockAction } from "../../store/news/news.actions";
import { RateNewsBlockDto } from "./dto/rate-news-block.dto";

export const useUserBlockRate = () => {
    const { request } = useHttp();

    const rateNewsBlock = (dto: RateNewsBlockDto) => {
        return async (dispatch: any) => {
            try {
                const response = await request(`${BACK_URL}/user-block-rate/rate-news-block`, 'POST', dto, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(updateNewsBlockAction(response));
                return response;
            } catch (error) {
                alert(error);
            }
        }
    }

    return {
        rateNewsBlock
    }
}