import './Styles.css';
import axios from 'axios';

function Header( {User, setUser} ) {

    function LogOut() {

    }

    function IAmAlive() {
        if(User){
            axios.post("http://localhost:8080/user/alive", {username: User.username}).then((response)=>{
                if(!response.data){
                    setUser(null);
                }
            });
        }
    }

    return (
        <div className="Header">

            <span className='Logo'>
                <a href='http://localhost:3000/' onClick={IAmAlive}>ReviewShare</a>
            </span>
            
            <span className='Login-SignUp'>
                {User?
                    <>
                        <span className='LogOut' onClick={LogOut}>LogOut</span>
                        <a href={'http://localhost:3000/profile/'+User?.username} onClick={IAmAlive}>
                            <img alt='user profile' src={User?.photoURL}/>
                        </a>
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
