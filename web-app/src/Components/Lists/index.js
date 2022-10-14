import './Styles.css';
import axios from 'axios';
import { useState } from 'react';


function Lists({ requestedUser, User, setUser }) {

    const [searchedItems, setSearchedItems] = useState([]);

    function createSearchContainer(type) {
        const SearchContainer = document.getElementsByClassName("SearchContainer")[0];
        SearchContainer.setAttribute("type", type);
        SearchContainer.setAttribute("visible", "true");
    }

    function searchTitles() {
        const SearchContainer = document.getElementsByClassName("SearchContainer")[0];
        const type = SearchContainer.getAttribute("type");

        const SearchContainerInput = document.getElementsByClassName("SearchContainerInput")[0];
        const query = SearchContainerInput.value;

        if (type === "movie" || type === "tvSeries") {

            const options = {
                method: 'GET',
                url: 'https://online-movie-database.p.rapidapi.com/title/v2/find',
                params: { title: query, titleType: type, limit: '20', sortArg: 'moviemeter,asc' },
                headers: {
                    'X-RapidAPI-Key': '34bd30d120msh4cd613dd1b1ddf4p11c364jsn217a2947db5f',
                    'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
                }
            };

            axios.request(options).then(function (response) {
                setSearchedItems(response.data.results);
            }).catch(function (error) {
                console.error(error);
            });

        } else if (type === "book"){

            const options = {
                method: 'GET',
                url: 'https://hapi-books.p.rapidapi.com/search/'+query.replace(" ", "+"),
                headers: {
                  'X-RapidAPI-Key': '34bd30d120msh4cd613dd1b1ddf4p11c364jsn217a2947db5f',
                  'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
                }
            };
              
            axios.request(options).then(function (response) {
                setSearchedItems(response.data);
            }).catch(function (error) {
                console.error(error);
            });
            
        }
    }

    function addTitleToList(searchedItem) {

        const SearchContainer = document.getElementsByClassName("SearchContainer")[0];
        const type = SearchContainer.getAttribute("type");

        const accessToken = localStorage.getItem('x-access-token');
        const refreshToken = localStorage.getItem('x-refresh-token');

        let status;
        let rate;
        let item;

        if (type === "movie" || type === "tvSeries") {

            while(status!=="watched" && status!=="watching" && status!=="abandoned")
                status = prompt("Put its status (watched | watching | abandoned)");
            
            while(rate!=="1" && rate!=="2" && rate!=="3" && rate!=="4" && rate!=="5")
                rate = prompt("Put its rate (1-5)");

            item = {
                id: searchedItem.id,
                title: searchedItem.title,
                imageURL: searchedItem.image.url,
                type: searchedItem.titleType,
                year: searchedItem.year,
                status: status,
                rate: rate
            }
        } else if (type === "book"){

            while(status!=="read" && status!=="reading" && status!=="abandoned")
                status = prompt("Put its status (read | reading | abandoned)");
            
            while(rate!=="1" && rate!=="2" && rate!=="3" && rate!=="4" && rate!=="5")
                rate = prompt("Put its rate (1-5)");

            item = {
                id: searchedItem.book_id,
                title: searchedItem.name,
                imageURL: searchedItem.cover,
                type: "book",
                year: searchedItem.year,
                status: status,
                rate: rate
            }
        }

        axios.post('http://localhost:8080/user/add/'+type, item, {headers: {"x-access-token": accessToken, "x-refresh-token": refreshToken}}).then((response)=>{
                
            console.log(response.data.message);
            
            if(response.data.refresh){
                localStorage.setItem('x-access-token', response.data.newAccessToken);
                axios.post('http://localhost:8080/user/add/'+type, item, {headers: {"x-access-token": response.data.newAccessToken, "x-refresh-token": refreshToken}}).then((response)=>{
                    if(!response.data.accepted) alert(response.data.message);
                    window.location.reload();
                });
            } else{
                if(!response.data.accepted) alert(response.data.message);
                window.location.reload();
            } 
            
        });

    }

    function expandItem(event) {
        const el = event.target || event.srcElement;
        const items = el.parentNode.querySelectorAll('.Hidden');
        items.forEach(item => {
            item.classList.remove('Hidden');
        });
    }

    function closeExpandItem(event) {
        const el = event.target || event.srcElement;
        const items = el.parentNode.parentNode.querySelectorAll('.HiddenAttribute');
        items.forEach(item => {
            item.classList.add('Hidden');
        });
        el.parentNode.classList.add('Hidden');
    }

    return (
        <div className="Lists">

            <div className="SearchContainer" visible="false">

                <div className="SearchContainerBar">
                    <input className="SearchContainerInput" onKeyUp={(e)=>{
                        let key = e.which || e.keyCode;
                        if (key === 13) { // codigo da tecla enter
                            searchTitles();
                        }}}
                    />
                    <div className="SearchContainerIcon" onClick={searchTitles}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L486.6 441.4 509.3 464 464 509.3l-22.6-22.6L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" /></svg>
                    </div>
                </div>

                <div className="SearchContainerItems">
                    {
                        searchedItems?.map((searchedItem, index) => {
                            return <article key={index} className="SearchContainerItem" onClick={()=>addTitleToList(searchedItem)}>
                                        <p className="HiddenTitle">{searchedItem?.title || searchedItem?.name}</p>
                                        <p className="SearchItemTitle">{searchedItem?.title || searchedItem?.name}</p>
                                        <img src={searchedItem?.image?.url ||searchedItem?.cover} alt="movie"></img>
                                   </article>
                        })
                    }
                </div>
            </div>

            <div className='ListContainer' type="movie">

                <div className='ListOptions'>

                    <span className='ListTitle'> Movies </span>

                    {(User?.username === requestedUser?.username)?
                        <div className='AddToList' onClick={() => { createSearchContainer("movie") }}>
                            <img alt='add to list icon' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABSklEQVRIie2Wz07CQBCHP+UZPCiVYPQpAB/Af9AXEZ/FI0EvHLlh8FmMF2KiL0A9CsHDdmXZsNvZrTUe+CVzaDvdb2Y6O13Y6Y+0F+DbAHrAFdAEkvz+B/AGTIEJ8P5bwdWBAbAAVgW2BMZ5YKWUAp8CoG0Z0I2F3qEyCIWa2fdDoWlJqAkXZ54QV15f2Y8k4Efhgi2gI/QdFkEbyLp3Zbwj8V2w3n4A7FvgFKgVRRehGmoGOMEXFUC1Ln3gswrBp76HGe5GksrVcJnpZGfsUshMD/H90Svy/akl9X8xQXbGs5hohdpY2wY/Vwie+h4eU80A+cIaINv0IFysDZwLfQdFUFA/fte2irE5cCgBg5pg0pL7bAncSKFafcofBG5DoVpd4so+B65joVoHwD2qMyVZjhB805DxlrA+3p6webydoWbAU3690//RN0/sInIeI4efAAAAAElFTkSuQmCC'></img>
                        </div>
                        :
                        <></>
                    }

                </div>

                <div className='List' data-testid='MoviesList'>

                    {requestedUser.moviesList.map(movie => {
                        return (
                            <article className='Item' key={movie.id} data-testid="MovieItem">
                                <span className='CloseExpandItem Hidden' onClick={(e) => { closeExpandItem(e) }}>
                                    <img className='Hidden' alt='close icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABPklEQVRIie2WwU7CQBCGP+QZOCiVQPQpDC+gYumLiM/iTYPx4NGbBp/FcCEm8gItRyBy2G4oa2l3tl3jgT+ZQ7vb/WZmd6cDB/2RGoK5HWAIXANdIEjfz4EvYAK8Ad91OdcGHoEV8FNia+A1daySImBhATQtAUJX6B0qAik0G/1ICo0qQrNw68gD3NJblPYTG/BzjVBt4zJoB7vTK7UV2+sHwJEBjoBmmXcOaqJqwF7wpQeo1lUR+Nwj+KxoMOH3/lw4QPo56yTZCWbEeZLUc+dvptR/orV9ZkFmxDOppwLtrG2CPzyCJ0WDp/gpIEuMApKnJw/ghzIoqB9/3rVytRg4tgGDqmB1pHwN3NhCtUZUbwRupVCtELe0x8DAFarVAu5RJ9Mmyhcs9lRS2gK27W2P3fZ2hqoB7+nzQf9HG1ixKXyZ2CzlAAAAAElFTkSuQmCC" />
                                </span>
                                <img className='ItemImg' alt='' src={movie.imageURL} onClick={(e) => { expandItem(e) }}></img>
                                <span className='ItemTitle'>{movie.title}</span>
                                <span className='HiddenAttribute Hidden'>{movie.year}</span>
                                <span className='ItemStatus' status={movie.status}>{movie.status}</span>
                                <span className='HiddenAttribute Hidden' rate={movie.rate}>
                                    <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC' />
                                    <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC' />
                                    <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC' />
                                    <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC' />
                                    <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC' />
                                </span>
                            </article>
                        )
                    })
                    }
                    {requestedUser.moviesList.length > 0 ?
                        <></>
                        :
                        <div className="EmptyList">
                            <p data-testid="EmptyMoviesListMessage">Empty List</p>
                        </div>
                    }

                </div>

            </div>


            <div className='ListContainer' type="tvSeries">

                <div className='ListOptions'>

                    <span className='ListTitle'> Series </span>

                    {(User?.username === requestedUser?.username)?
                        <div className='AddToList' onClick={() => { createSearchContainer("tvSeries") }}>
                            <img alt='add to list icon' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABSklEQVRIie2Wz07CQBCHP+UZPCiVYPQpAB/Af9AXEZ/FI0EvHLlh8FmMF2KiL0A9CsHDdmXZsNvZrTUe+CVzaDvdb2Y6O13Y6Y+0F+DbAHrAFdAEkvz+B/AGTIEJ8P5bwdWBAbAAVgW2BMZ5YKWUAp8CoG0Z0I2F3qEyCIWa2fdDoWlJqAkXZ54QV15f2Y8k4Efhgi2gI/QdFkEbyLp3Zbwj8V2w3n4A7FvgFKgVRRehGmoGOMEXFUC1Ln3gswrBp76HGe5GksrVcJnpZGfsUshMD/H90Svy/akl9X8xQXbGs5hohdpY2wY/Vwie+h4eU80A+cIaINv0IFysDZwLfQdFUFA/fte2irE5cCgBg5pg0pL7bAncSKFafcofBG5DoVpd4so+B65joVoHwD2qMyVZjhB805DxlrA+3p6webydoWbAU3690//RN0/sInIeI4efAAAAAElFTkSuQmCC'></img>
                        </div>
                        :
                        <></>
                    }

                </div>

                <div className='List' data-testid='SeriesList'>

                    {requestedUser.seriesList.map(serie => {
                        return (
                            <article className='Item' key={serie.id} data-testid="SerieItem">
                                <span className='CloseExpandItem Hidden' onClick={(e) => { closeExpandItem(e) }}>
                                    <img className='Hidden' alt='close icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABPklEQVRIie2WwU7CQBCGP+QZOCiVQPQpDC+gYumLiM/iTYPx4NGbBp/FcCEm8gItRyBy2G4oa2l3tl3jgT+ZQ7vb/WZmd6cDB/2RGoK5HWAIXANdIEjfz4EvYAK8Ad91OdcGHoEV8FNia+A1daySImBhATQtAUJX6B0qAik0G/1ICo0qQrNw68gD3NJblPYTG/BzjVBt4zJoB7vTK7UV2+sHwJEBjoBmmXcOaqJqwF7wpQeo1lUR+Nwj+KxoMOH3/lw4QPo56yTZCWbEeZLUc+dvptR/orV9ZkFmxDOppwLtrG2CPzyCJ0WDp/gpIEuMApKnJw/ghzIoqB9/3rVytRg4tgGDqmB1pHwN3NhCtUZUbwRupVCtELe0x8DAFarVAu5RJ9Mmyhcs9lRS2gK27W2P3fZ2hqoB7+nzQf9HG1ixKXyZ2CzlAAAAAElFTkSuQmCC" />
                                </span>
                                <img className='ItemImg' alt='' src={serie.imageURL} onClick={(e) => { expandItem(e) }}></img>
                                <span className='ItemTitle'>{serie.title}</span>
                                <span className='HiddenAttribute Hidden'>{serie.year}</span>
                                <span className='ItemStatus' status={serie.status}>{serie.status}</span>
                                <span className='HiddenAttribute Hidden' rate={serie.rate}>
                                    <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC' />
                                    <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC' />
                                    <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC' />
                                    <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC' />
                                    <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC' />
                                </span>
                            </article>
                        )
                    })
                    }
                    {requestedUser.seriesList.length > 0 ?
                        <></>
                        :
                        <div className="EmptyList">
                            <p data-testid="EmptySeriesListMessage">Empty List</p>
                        </div>
                    }
                </div>

            </div>

            <div className='ListContainer' type="book">

                <div className='ListOptions'>

                    <span className='ListTitle'> Books </span>

                    {(User?.username === requestedUser?.username)?
                        <div className='AddToList' onClick={() => { createSearchContainer("book") }}>
                            <img alt='add to list icon' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABSklEQVRIie2Wz07CQBCHP+UZPCiVYPQpAB/Af9AXEZ/FI0EvHLlh8FmMF2KiL0A9CsHDdmXZsNvZrTUe+CVzaDvdb2Y6O13Y6Y+0F+DbAHrAFdAEkvz+B/AGTIEJ8P5bwdWBAbAAVgW2BMZ5YKWUAp8CoG0Z0I2F3qEyCIWa2fdDoWlJqAkXZ54QV15f2Y8k4Efhgi2gI/QdFkEbyLp3Zbwj8V2w3n4A7FvgFKgVRRehGmoGOMEXFUC1Ln3gswrBp76HGe5GksrVcJnpZGfsUshMD/H90Svy/akl9X8xQXbGs5hohdpY2wY/Vwie+h4eU80A+cIaINv0IFysDZwLfQdFUFA/fte2irE5cCgBg5pg0pL7bAncSKFafcofBG5DoVpd4so+B65joVoHwD2qMyVZjhB805DxlrA+3p6webydoWbAU3690//RN0/sInIeI4efAAAAAElFTkSuQmCC'></img>
                        </div>
                        :
                        <></>
                    }

                </div>

                <div className='List' data-testid='BooksList'>

                    {requestedUser.booksList.map(book => {
                        return (
                            <article className='Item' key={book.id} data-testid="BookItem">
                                <span className='CloseExpandItem Hidden' onClick={(e) => { closeExpandItem(e) }}>
                                    <img alt='close icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABPklEQVRIie2WwU7CQBCGP+QZOCiVQPQpDC+gYumLiM/iTYPx4NGbBp/FcCEm8gItRyBy2G4oa2l3tl3jgT+ZQ7vb/WZmd6cDB/2RGoK5HWAIXANdIEjfz4EvYAK8Ad91OdcGHoEV8FNia+A1daySImBhATQtAUJX6B0qAik0G/1ICo0qQrNw68gD3NJblPYTG/BzjVBt4zJoB7vTK7UV2+sHwJEBjoBmmXcOaqJqwF7wpQeo1lUR+Nwj+KxoMOH3/lw4QPo56yTZCWbEeZLUc+dvptR/orV9ZkFmxDOppwLtrG2CPzyCJ0WDp/gpIEuMApKnJw/ghzIoqB9/3rVytRg4tgGDqmB1pHwN3NhCtUZUbwRupVCtELe0x8DAFarVAu5RJ9Mmyhcs9lRS2gK27W2P3fZ2hqoB7+nzQf9HG1ixKXyZ2CzlAAAAAElFTkSuQmCC" />
                                </span>
                                <img className='ItemImg' alt='' src={book.imageURL} onClick={(e) => { expandItem(e) }}></img>
                                <span className='ItemTitle'>{book.title}</span>
                                <span className='HiddenAttribute Hidden'>{book.year}</span>
                                <span className='ItemStatus' status={book.status}>{book.status}</span>
                                <span className='HiddenAttribute Hidden' rate={book.rate}>
                                    <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC' />
                                    <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC' />
                                    <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC' />
                                    <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC' />
                                    <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC' />
                                </span>
                            </article>
                        )
                    })
                    }
                    {requestedUser.booksList.length > 0 ?
                        <></>
                        :
                        <div className="EmptyList">
                            <p data-testid="EmptyBooksListMessage">Empty List</p>
                        </div>
                    }
                </div>

            </div>

        </div>
    )

}

export default Lists;