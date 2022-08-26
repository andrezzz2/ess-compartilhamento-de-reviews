import './Styles.css';
import Header from '../../Components/Header';
import { useState, useEffect } from 'react';
import Lists from '../../Components/Lists';
import Reviews from '../../Components/Reviews';
import Followers from '../../Components/Followers';
import Following from '../../Components/Following';
import EditProfile from '../../Components/EditProfile';


const mariano = {
    id: "2",
    firstName: "Matheus",
    lastName: "Mariano",
    username: "@mmag2",
    email: "",
    bio: "bwbiuovwenjogoivbiuewbbienwbionieonbwewiobneibneoinbeiwnbiewbnbolabiweb0enewionbe0wibnienfownewiunbienbew0bndiewenibneibn0dncmib0nermwmcisnibnrenb0wewni0wenciwdançomvbcmsoidnbornbwepnvwbwbiuovwenjogoivbiuewbbienwbionieonbwewiobneibneoinbeiwnbiewbnbolabiweb0enewionbe0wibnienfownewiunbienbew0bndiewenibneibn0dncmib0nermwmcisnibnrenb0wewni0wenciwdançomvbcmsoidnbornbwepnvw",
    twitter: "",
    photoURL: "",
    followers: "2",
    following: "2",
    moviesList:[{
                type: "movie",
                id: "3",
                title: "Thor: Amor e Trovão",
                photoURL: "https://lumiere-a.akamaihd.net/v1/images/56015l10_bigsal_brazil_intpayoff_4x5_d4019af6.jpeg",
                description: "“Thor: Amor e Trovão”, da Marvel Studios, encontra o Deus do Trovão numa jornada diferente de tudo o que já enfrentou – a procura pela paz interior. Mas a reforma de Thor é interrompida por um assassino galáctico conhecido como Gorr, o Carniceiro dos Deuses, que procura a extinção dos deuses. Para combater a ameaça, Thor pede a ajuda da Rei Valkiria, de Korg e da ex-namorada Jane Foster, que – para surpresa de Thor – empunha inexplicavelmente o seu martelo mágico, Mjolnir, e se intitula a Poderosa Thor. Juntos, eles embarcam numa angustiante aventura cósmica para descobrir o mistério da vingança do Carniceiro dos Deuses e detê-lo antes que seja tarde demais.",
                director: "Taika Waitili",
                reviewRate: "",
                reviewId: "",
                status: "abandoned"
            }
        ],
    seriesList:[{
                type: "serie",
                id: "6",
                title: "Stranger Things",
                season: "3",
                photoURL: "https://br.web.img2.acsta.net/pictures/19/07/10/20/01/2331295.jpg",
                description: "A terceira temporada de Stranger Things foi anunciada pela Netflix em dezembro de 2017. Matt Duffer e Ross Duffer continuam como showrunners e produtores executivos. A terceira temporada estreou em 4 de julho de 2019, com 8 episódios, estrelada por Winona Ryder, David Harbour, Finn Wolfhard, Millie Bobby Brown, Gaten Matarazzo, Caleb McLaughlin, Noah Schnapp, Sadie Sink, Natalia Dyer, Charlie Heaton, Joe Keery, Dacre Montgomery, Maya Hawke, Priah Ferguson e Cara Buono, com Brett Gelman, Cary Elwes, Jake Busey, Michael Park, Francesca Reale e Alec Utgoff em papéis recorrentes. As atuações de Harbour, Brown, Montgomery e Hawke foram elogiadas pela crítica.",
                reviewRate: "0",
                reviewId: "8",
                status: "abandoned"
            }
    ],
    booksList:[{
                type: "book",
                id: "9",
                title: "Missão Romance",
                photoURL: "https://images-na.ssl-images-amazon.com/images/I/81RobDsEGnL.jpg",
                description: "Segundo volume da série Clube do livro dos homens.Missão Romance foi considerado um dos melhores romances de 2020 pelo site Oprahdaily“Lyssa entremeia romance, suspense e humor de forma habilidosa, em uma trama com personagens fortes e uma química irresistível entre os protagonistas.” – Publishers Weekly Liv Papandreas tem o emprego dos sonhos: ela é chef confeiteira do restaurante mais badalado de Nashville, comandado por Royce Preston, uma celebridade da TV. O problema é que, longe das câmeras, seu chefe é um mau-caráter.Certo dia, Liv flagra Royce assediando uma jovem recepcionista e, ao confrontá-lo, acaba demitida. Ela jura vingança, mas vai precisar de ajuda para derrotar alguém tão poderoso.Infelizmente, isso significa recorrer a Braden Mack, um empresário carismático e mulherengo. Ele se oferece para revelar ao mundo quem Royce realmente é, mas Liv tem dificuldade em acreditar nas suas boas intenções. Assim, Mack precisa chamar reforços: os integrantes do Clube do Livro dos Homens.Inspirados pelo romance que estão lendo, o Clube do Livro se une a Liv para derrubar Royce. Paralelamente, eles tentam ajudar Mack a encontrar o caminho para o coração de Liv... mesmo que ela esteja determinada a ignorar qualquer chama de paixão que surgir entre os dois.",
                author: "Lyss Kay Adams",
                reviewRate: "",
                reviewId: "",
                status: "abandoned",
            }
    ],
    reviews: [{
                id: "8",
                ownerId: "2",
                type: "serie",
                title: "legal",
                season: "3",
                itemId: "",
                itemTitle: "Stranger Things",
                rate: "0",
                text: "bom, blablablablablablablablablabalablaalbala",
                date: "25-08-2022"
            }
    ],
    followersList: [],
    followingList: []
};

var requestedUser = {}

function Profile({ User }) {

    if(window.location.href.split('profile/')[1]===User.id){
        requestedUser = User;
    } else if (window.location.href.split('profile/')[1]==="2"){
        requestedUser = mariano;
    } else {
        requestedUser = {};
    }

    const [actualEl, setActualEl] = useState(<Lists requestedUser={requestedUser}/>);

    function activeEl(event) {
        const items = document.querySelectorAll('.ProfileBarOptions');
        items.forEach((item) => item.classList.remove('Active'));

        const el = event.target || event.srcElement;
        el.classList.add('Active');
    }

    return (
        <div className="ProfilePage">
            <Header User={User}/>

            <div className="ProfileContainer">
                <div className='LeftProfileSide'>
                    <img alt='User Profile Icon' src={requestedUser.photoURL}></img>
                    <span className="ProfileUserName">{requestedUser.name}</span>
                    <span>{requestedUser.username}</span>
                    <span>{requestedUser.followers+" followers - "+requestedUser.following+" following"}</span>
                    <div className='ProfileBio'>
                        <p>{requestedUser.bio}</p>
                    </div>
                    
                </div>
                <div className='RightProfileSide'>
                    <div className='ProfileBar'>
                        <div className='ProfileBarOptions Active' onClick={(e)=>{setActualEl(<Lists requestedUser={requestedUser}/>); activeEl(e);}}>Lists</div>
                        <div className='ProfileBarOptions' onClick={(e)=>{setActualEl(<Reviews requestedUser={requestedUser}/>); activeEl(e);}}>Reviews</div>
                        <div className='ProfileBarOptions' onClick={(e)=>{setActualEl(<Followers requestedUser={requestedUser}/>); activeEl(e);}}>Followers</div>
                        <div className='ProfileBarOptions' onClick={(e)=>{setActualEl(<Following requestedUser={requestedUser}/>); activeEl(e);}}>Following</div>
                        {("http://localhost:3000/profile/"+User.id)===window.location.href?
                            <>
                                <div className='ProfileBarOptions' onClick={(e)=>{setActualEl(<EditProfile User={User}/>); activeEl(e);}}>Edit Profile</div>
                            </>:<>
                            </>   
                        }
                    </div>
                    {actualEl}
                </div>
                
            </div>
        </div>
    );
}

export default Profile;
