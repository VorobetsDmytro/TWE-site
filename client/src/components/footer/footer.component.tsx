import style from './footer.style.module.scss'

export const FooterComponent = () => {
    return (
        <div className={style.footer}>
            <div className={style.footer_title}>
                <h1>TWE SITE</h1>
            </div>
            <div className={style.footer_body}>
                <span>© 2023 TWE. All rights reserved.</span>
            </div>
        </div>
    );
}