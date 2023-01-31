import { BACK_URL } from "../../main.variables";

export const useFile = () => {
    const tweDownload = async () => {
        try {
            const response = await fetch(`${BACK_URL}/file/twe/download`);
            if(response.status !== 200)
                throw response;
            const blob = await response.blob();
            const downloadLink = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadLink;
            link.download = "TWE.rar";
            document.body.appendChild(link);
            link.click();
            link.remove();
            return response;
        } catch (error) {
            alert(error);
        }
    }

    return {
        tweDownload
    }
}