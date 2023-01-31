import { FC } from "react"

import style from './popup-ok-cancel.style.module.scss'

interface IPopupOkCancel {
    text: string;
    onOk: () => any;
    close: () => any;
}

export const PopupOkCancel: FC<IPopupOkCancel> = ({text, onOk, close}) => {
    const okHandle = () => {
        onOk();
        close();
    }

    return (
        <div className={style.popup_ok_cancel }>
            <div className={style.popup_ok_cancel_bg}>
                <div className={style.popup_ok_cancel_menu}>
                    <span className={style.popup_ok_cancel_text}>{text}</span>
                    <div className={style.popup_ok_cancel_buttons}>
                        <button className={style.popup_ok_cancel_ok_btn} onClick={okHandle}>Ok</button>
                        <button className={style.popup_ok_cancel_cancel_btn} onClick={close}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}