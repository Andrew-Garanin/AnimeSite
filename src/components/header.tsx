import logo from "../assets/site-icon.png"

export const Head=() => {
    return(
    <header className="header">
        <img src={logo} alt="popka" className="header__icon"/>
        <h1 className="header_title">Аниме сайт!</h1>
     </header>
    );
}