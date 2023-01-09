


const MainPage = (props) => {

    return (
        <>
            <div className="main_page-container">
                <div className="main_page--left_side-container">
                    <div id="login-container" className="main_page--left_side_login-container">
                        <div id="log_in-info" className="log_in-info">LogIn or Create a new account</div>
                        <input id='log_in-login' type="text" placeholder="login" />
                        <input id='log_in-password' type="password" placeholder="password" />
                        <input id='log_in-log_in' type="submit" placeholder="password" value="Log in" />
                        <div className="log_in-info">OR</div>
                        <input id='log_in-sign_in' type="submit" placeholder="password" value="Sign in" />
                    </div>
                </div>
            </div>

        </>
    );
}

export default MainPage;