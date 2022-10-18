import './Styles.css';

function Header( { User, setUser } ) {

    function LogOut() {

        setUser(null);
        localStorage.clear();

    }

    return (
        <div className="Header">

            <span className='Logo'>
                <a href='http://localhost:3000/'>ReviewShare</a>
            </span>
            
            <span className='Login-SignUp'>
                {User?
                    <>
                        <span className='LogOut' onClick={LogOut} id="headerLogOut" data-testid="HeaderLogOut">LogOut</span>
                        <a href={'http://localhost:3000/profile/'+User?.username} id="userIcon" data-testid="HeaderUserIcon">
                            <img alt='user profile' id="userIconImg" src={User?.photoURL}/>
                        </a>
                    </>
                    :
                    <>
                        <a href='http://localhost:3000/login' data-testid="HeaderLoginButton">
                            <div className='HeaderButton Login'>
                                Login
                            </div>
                        </a> 
                        <a href='http://localhost:3000/signUp' data-testid="HeaderSignUpButton">
                            <div className='HeaderButton SignUp'>
                                Sign Up
                            </div>
                        </a> 
                    </>
                }
            </span>
        
        </div>
    );
}

export default Header;
