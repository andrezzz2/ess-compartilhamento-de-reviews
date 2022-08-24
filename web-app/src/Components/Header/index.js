import './Styles.css';

function Header() {
    return (
        <div className="Header">

            <span className='Logo'>
                ReviewShare
            </span>

            <span className='Login-SignUp'>
                <button className='HeaderButton Login'> Login </button>
                <button className='HeaderButton SignUp'> Sign Up </button>
            </span>

        </div>
    );
}

export default Header;
