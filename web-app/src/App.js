import './App.css';
import HomePage from './Pages/HomePage';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

    //mock user
    const user = {
        id: "123",
        firstName: "André",
        lastName: "Luiz",
        username: "@andrezzz",
        email: "",
        bio: "bwbiuovwenjogoivbiuewbbienwbionieonbwewiobneibneoinbeiwnbiewbnbolabiweb0enewionbe0wibnienfownewiunbienbew0bndiewenibneibn0dncmib0nermwmcisnibnrenb0wewni0wenciwdançomvbcmsoidnbornbwepnvw",
        twitter: "",
        photoURL: "https://lh3.googleusercontent.com/a/AItbvmlht4uK2tnQF_wtuIBUKQzUS8_ZzOGCtdeXYK8H=s83-c-mo",
        followers: "10k",
        following: "293",
        moviesList:[{
                    type: "movie",
                    id: "1",
                    title: "Thor: Amor e Trovão",
                    photoURL: "https://lumiere-a.akamaihd.net/v1/images/56015l10_bigsal_brazil_intpayoff_4x5_d4019af6.jpeg",
                    description: "“Thor: Amor e Trovão”, da Marvel Studios, encontra o Deus do Trovão numa jornada diferente de tudo o que já enfrentou – a procura pela paz interior. Mas a reforma de Thor é interrompida por um assassino galáctico conhecido como Gorr, o Carniceiro dos Deuses, que procura a extinção dos deuses. Para combater a ameaça, Thor pede a ajuda da Rei Valkiria, de Korg e da ex-namorada Jane Foster, que – para surpresa de Thor – empunha inexplicavelmente o seu martelo mágico, Mjolnir, e se intitula a Poderosa Thor. Juntos, eles embarcam numa angustiante aventura cósmica para descobrir o mistério da vingança do Carniceiro dos Deuses e detê-lo antes que seja tarde demais.",
                    director: "Taika Waitili",
                    reviewRate: "3",
                    reviewId: "1",
                    status: "watched"

                },{
                    type: "movie",
                    id: "2",
                    title: "Thor: Amor e Trovão",
                    photoURL: "https://lumiere-a.akamaihd.net/v1/images/56015l10_bigsal_brazil_intpayoff_4x5_d4019af6.jpeg",
                    description: "“Thor: Amor e Trovão”, da Marvel Studios, encontra o Deus do Trovão numa jornada diferente de tudo o que já enfrentou – a procura pela paz interior. Mas a reforma de Thor é interrompida por um assassino galáctico conhecido como Gorr, o Carniceiro dos Deuses, que procura a extinção dos deuses. Para combater a ameaça, Thor pede a ajuda da Rei Valkiria, de Korg e da ex-namorada Jane Foster, que – para surpresa de Thor – empunha inexplicavelmente o seu martelo mágico, Mjolnir, e se intitula a Poderosa Thor. Juntos, eles embarcam numa angustiante aventura cósmica para descobrir o mistério da vingança do Carniceiro dos Deuses e detê-lo antes que seja tarde demais.",
                    director: "Taika Waitili",
                    reviewRate: "",
                    reviewId: "",
                    status: "watching"
                },{
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
                    id: "4",
                    title: "Stranger Things",
                    season: "3",
                    photoURL: "https://br.web.img2.acsta.net/pictures/19/07/10/20/01/2331295.jpg",
                    description: "A terceira temporada de Stranger Things foi anunciada pela Netflix em dezembro de 2017. Matt Duffer e Ross Duffer continuam como showrunners e produtores executivos. A terceira temporada estreou em 4 de julho de 2019, com 8 episódios, estrelada por Winona Ryder, David Harbour, Finn Wolfhard, Millie Bobby Brown, Gaten Matarazzo, Caleb McLaughlin, Noah Schnapp, Sadie Sink, Natalia Dyer, Charlie Heaton, Joe Keery, Dacre Montgomery, Maya Hawke, Priah Ferguson e Cara Buono, com Brett Gelman, Cary Elwes, Jake Busey, Michael Park, Francesca Reale e Alec Utgoff em papéis recorrentes. As atuações de Harbour, Brown, Montgomery e Hawke foram elogiadas pela crítica.",
                    reviewRate: "3",
                    reviewId: "2",
                    status: "watched"

                },{ 
                    type: "serie",
                    id: "5",
                    title: "Stranger Things",
                    season: "3",
                    photoURL: "https://br.web.img2.acsta.net/pictures/19/07/10/20/01/2331295.jpg",
                    description: "A terceira temporada de Stranger Things foi anunciada pela Netflix em dezembro de 2017. Matt Duffer e Ross Duffer continuam como showrunners e produtores executivos. A terceira temporada estreou em 4 de julho de 2019, com 8 episódios, estrelada por Winona Ryder, David Harbour, Finn Wolfhard, Millie Bobby Brown, Gaten Matarazzo, Caleb McLaughlin, Noah Schnapp, Sadie Sink, Natalia Dyer, Charlie Heaton, Joe Keery, Dacre Montgomery, Maya Hawke, Priah Ferguson e Cara Buono, com Brett Gelman, Cary Elwes, Jake Busey, Michael Park, Francesca Reale e Alec Utgoff em papéis recorrentes. As atuações de Harbour, Brown, Montgomery e Hawke foram elogiadas pela crítica.",
                    reviewRate: "",
                    reviewId: "",
                    status: "watching"
                },{
                    type: "serie",
                    id: "6",
                    title: "Stranger Things",
                    season: "3",
                    photoURL: "https://br.web.img2.acsta.net/pictures/19/07/10/20/01/2331295.jpg",
                    description: "A terceira temporada de Stranger Things foi anunciada pela Netflix em dezembro de 2017. Matt Duffer e Ross Duffer continuam como showrunners e produtores executivos. A terceira temporada estreou em 4 de julho de 2019, com 8 episódios, estrelada por Winona Ryder, David Harbour, Finn Wolfhard, Millie Bobby Brown, Gaten Matarazzo, Caleb McLaughlin, Noah Schnapp, Sadie Sink, Natalia Dyer, Charlie Heaton, Joe Keery, Dacre Montgomery, Maya Hawke, Priah Ferguson e Cara Buono, com Brett Gelman, Cary Elwes, Jake Busey, Michael Park, Francesca Reale e Alec Utgoff em papéis recorrentes. As atuações de Harbour, Brown, Montgomery e Hawke foram elogiadas pela crítica.",
                    reviewRate: "5",
                    reviewId: "4",
                    status: "abandoned"
                }
        ],
        booksList:[{
                    type: "book",
                    id: "7",
                    title: "Missão Romance",
                    photoURL: "https://images-na.ssl-images-amazon.com/images/I/81RobDsEGnL.jpg",
                    description: "Segundo volume da série Clube do livro dos homens.Missão Romance foi considerado um dos melhores romances de 2020 pelo site Oprahdaily“Lyssa entremeia romance, suspense e humor de forma habilidosa, em uma trama com personagens fortes e uma química irresistível entre os protagonistas.” – Publishers Weekly Liv Papandreas tem o emprego dos sonhos: ela é chef confeiteira do restaurante mais badalado de Nashville, comandado por Royce Preston, uma celebridade da TV. O problema é que, longe das câmeras, seu chefe é um mau-caráter.Certo dia, Liv flagra Royce assediando uma jovem recepcionista e, ao confrontá-lo, acaba demitida. Ela jura vingança, mas vai precisar de ajuda para derrotar alguém tão poderoso.Infelizmente, isso significa recorrer a Braden Mack, um empresário carismático e mulherengo. Ele se oferece para revelar ao mundo quem Royce realmente é, mas Liv tem dificuldade em acreditar nas suas boas intenções. Assim, Mack precisa chamar reforços: os integrantes do Clube do Livro dos Homens.Inspirados pelo romance que estão lendo, o Clube do Livro se une a Liv para derrubar Royce. Paralelamente, eles tentam ajudar Mack a encontrar o caminho para o coração de Liv... mesmo que ela esteja determinada a ignorar qualquer chama de paixão que surgir entre os dois.",
                    author: "Lyss Kay Adams",
                    reviewRate: "0",
                    reviewId: "5",
                    status: "read",
                },{
                    type: "book",
                    id: "8",
                    title: "Missão Romance",
                    photoURL: "https://images-na.ssl-images-amazon.com/images/I/81RobDsEGnL.jpg",
                    description: "Segundo volume da série Clube do livro dos homens.Missão Romance foi considerado um dos melhores romances de 2020 pelo site Oprahdaily“Lyssa entremeia romance, suspense e humor de forma habilidosa, em uma trama com personagens fortes e uma química irresistível entre os protagonistas.” – Publishers Weekly Liv Papandreas tem o emprego dos sonhos: ela é chef confeiteira do restaurante mais badalado de Nashville, comandado por Royce Preston, uma celebridade da TV. O problema é que, longe das câmeras, seu chefe é um mau-caráter.Certo dia, Liv flagra Royce assediando uma jovem recepcionista e, ao confrontá-lo, acaba demitida. Ela jura vingança, mas vai precisar de ajuda para derrotar alguém tão poderoso.Infelizmente, isso significa recorrer a Braden Mack, um empresário carismático e mulherengo. Ele se oferece para revelar ao mundo quem Royce realmente é, mas Liv tem dificuldade em acreditar nas suas boas intenções. Assim, Mack precisa chamar reforços: os integrantes do Clube do Livro dos Homens.Inspirados pelo romance que estão lendo, o Clube do Livro se une a Liv para derrubar Royce. Paralelamente, eles tentam ajudar Mack a encontrar o caminho para o coração de Liv... mesmo que ela esteja determinada a ignorar qualquer chama de paixão que surgir entre os dois.",
                    author: "Lyss Kay Adams",
                    reviewRate: "",
                    reviewId: "",
                    status: "reading",
                },{
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
                    id: "5",
                    ownerId: "123",
                    type: "book",
                    title: "Pior livro",
                    bookId: "7",
                    bookTitle: "Missão Romance",
                    rate: "0",
                    text: "uma merda, blablablablablablablablablabalablaalbala",
                    date: "25-08-2022"
                }
        ],
        followersList: [],
        followingList: []
    };

    //mock none user
    //const user = null;

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<HomePage User={user}/>}/>
                    <Route path="/login" element={<Login User={user}/>}/>
                    <Route path="/signUp" element={<SignUp User={user}/>}/>
                    <Route path="/profile/:slug" element={<Profile User={user}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
