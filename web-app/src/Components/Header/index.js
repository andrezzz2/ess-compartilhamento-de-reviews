import './Styles.css';
import MiniBanner from './MiniBanner.gif';

function Header() {
    return (
        <div className="Header">

            <div className='Logo'>
                MyReviews
            </div>

            <div className='MiniBanner'>
                <img alt='mini banner' src={MiniBanner}></img>
            </div>

            <div className='Login-SignUp'>
                <button className='HeaderButton HideAds'> Hide Ads </button>
                <button className='HeaderButton Login'> Login </button>
                <button className='HeaderButton SignUp'> Sign Up </button>
            </div>
        </div>
    );
}

export default Header;
