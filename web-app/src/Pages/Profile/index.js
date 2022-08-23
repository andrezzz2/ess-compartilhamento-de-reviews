import './Styles.css';
import { HashRouter, Route, Routes, useParams } from 'react-router-dom';

function Profile() {
    let { id } = useParams();

    return (
        <div className="Profile">
            <HashRouter>
                <Routes>
                    <Route path="#lists" element={<></>}/>
                    <Route path="#reviews" element={<></>}/>
                    <Route path="#friends" element={<></>}/>
                    <Route path="#editProfile" element={<></>}/>
                </Routes>
            </HashRouter>
        </div>
    );
}

export default Profile;
