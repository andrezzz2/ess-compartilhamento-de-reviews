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
                        <span className='LogOut' onClick={LogOut} data-testid="HeaderLogOut">LogOut</span>
                        <a href={'http://localhost:3000/profile/'+User?.username} data-testid="HeaderUserIcon">
                            <img alt='user profile' src={User?.photoURL}/>

                        </a>
                    </>
                    :
                    <>
                        <a href='http://localhost:3000/login'>
                            <div className='HeaderButton Login' data-testid="HeaderLoginButton">
                                Login
                            </div>
                        </a> 
                        <a href='http://localhost:3000/signUp'>
                            <div className='HeaderButton SignUp' data-testid="HeaderSignUpButton">
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
