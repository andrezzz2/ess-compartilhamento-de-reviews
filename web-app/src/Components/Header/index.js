import './Styles.css';

function Header( {User} ) {
    return (
        <div className="Header">

            <span className='Logo'>
                <a href='http://localhost:3000/'>ReviewShare</a>
            </span>
            
            <span className='Login-SignUp'>
                {User?
                    <>
                        <span className='Login-SignUp'>
                            <a href={'http://localhost:3000/profile/'+User.uid}>
                                <img alt='user profile' src={User.photoURL}/>
                            </a>
                        </span>
                    </>:<>
                        <button className='HeaderButton Login'>
                            <a href='http://localhost:3000/login'>Login</a> 
                        </button>
                        <button className='HeaderButton SignUp'>
                            <a href='http://localhost:3000/signUp'>Sign Up</a> 
                        </button>
                    </>
                }
            </span>
        
        </div>
    );
}

export default Header;
