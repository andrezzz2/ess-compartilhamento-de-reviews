import './Styles.css';

function Lists ( {requestedUser, User, setUser} ){
    
    function expandItem(event) {
        const el = event.target || event.srcElement;
        const items = el.parentNode.querySelectorAll('.HiddenItem');
        items.forEach(item => {
            item.classList.remove('HiddenItem');
        });
    }

    function closeExpandItem(event) {
        const el = event.target || event.srcElement;
        const items = el.parentNode.parentNode.querySelectorAll('.ItemAttribute');
        items.forEach(item => {
            item.classList.add('HiddenItem');
        });
        el.parentNode.classList.add('HiddenItem');
    }

    return (
        <div className="Lists">
            
            <div className='ListContainer'>

                <div className='ListOptions'>

                    <span className='ListTitle'> Movies </span>

                    <div className='AddToList'>
                        <img alt='add to list icon' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABSklEQVRIie2Wz07CQBCHP+UZPCiVYPQpAB/Af9AXEZ/FI0EvHLlh8FmMF2KiL0A9CsHDdmXZsNvZrTUe+CVzaDvdb2Y6O13Y6Y+0F+DbAHrAFdAEkvz+B/AGTIEJ8P5bwdWBAbAAVgW2BMZ5YKWUAp8CoG0Z0I2F3qEyCIWa2fdDoWlJqAkXZ54QV15f2Y8k4Efhgi2gI/QdFkEbyLp3Zbwj8V2w3n4A7FvgFKgVRRehGmoGOMEXFUC1Ln3gswrBp76HGe5GksrVcJnpZGfsUshMD/H90Svy/akl9X8xQXbGs5hohdpY2wY/Vwie+h4eU80A+cIaINv0IFysDZwLfQdFUFA/fte2irE5cCgBg5pg0pL7bAncSKFafcofBG5DoVpd4so+B65joVoHwD2qMyVZjhB805DxlrA+3p6webydoWbAU3690//RN0/sInIeI4efAAAAAElFTkSuQmCC'></img>
                    </div>

                </div>

                <div className='List'>

                    {requestedUser?.moviesList.map(movie=>{
                        return (
                                <article className='Item' key={movie.id}>
                                    <span className='CloseExpandItem HiddenItem' onClick={(e)=>{closeExpandItem(e)}}>
                                        <img className='HiddenItem' alt='close icon'src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABPklEQVRIie2WwU7CQBCGP+QZOCiVQPQpDC+gYumLiM/iTYPx4NGbBp/FcCEm8gItRyBy2G4oa2l3tl3jgT+ZQ7vb/WZmd6cDB/2RGoK5HWAIXANdIEjfz4EvYAK8Ad91OdcGHoEV8FNia+A1daySImBhATQtAUJX6B0qAik0G/1ICo0qQrNw68gD3NJblPYTG/BzjVBt4zJoB7vTK7UV2+sHwJEBjoBmmXcOaqJqwF7wpQeo1lUR+Nwj+KxoMOH3/lw4QPo56yTZCWbEeZLUc+dvptR/orV9ZkFmxDOppwLtrG2CPzyCJ0WDp/gpIEuMApKnJw/ghzIoqB9/3rVytRg4tgGDqmB1pHwN3NhCtUZUbwRupVCtELe0x8DAFarVAu5RJ9Mmyhcs9lRS2gK27W2P3fZ2hqoB7+nzQf9HG1ixKXyZ2CzlAAAAAElFTkSuQmCC"/>
                                    </span>
                                    <img className='ItemImg' alt='' src={movie.photoURL} onClick={(e)=>{expandItem(e)}}></img>
                                    <span className='ItemTitle'>{movie.title}</span>
                                    <span className='ItemAttribute HiddenItem'>{movie.director}</span>
                                    <span className='ItemStatus' status={movie.status}>{movie.status}</span>
                                    <span className='ItemAttribute HiddenItem'>{movie.description}</span>
                                    <span className='ItemAttribute HiddenItem' rate={movie.rate}>
                                        <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC'/>
                                        <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC'/>
                                        <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC'/>
                                        <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC'/>
                                        <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC'/>
                                    </span>
                                </article>
                            )
                        })
                    }
                    {requestedUser.moviesList.length>0?<></>:<div className="EmptyList"><p>Empty List!</p></div>}
            
                </div>

            </div>
            

            <div className='ListContainer'>

                <div className='ListOptions'>

                    <span className='ListTitle'> Series </span>

                    <div className='AddToList'>
                        <img alt='add to list icon' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABSklEQVRIie2Wz07CQBCHP+UZPCiVYPQpAB/Af9AXEZ/FI0EvHLlh8FmMF2KiL0A9CsHDdmXZsNvZrTUe+CVzaDvdb2Y6O13Y6Y+0F+DbAHrAFdAEkvz+B/AGTIEJ8P5bwdWBAbAAVgW2BMZ5YKWUAp8CoG0Z0I2F3qEyCIWa2fdDoWlJqAkXZ54QV15f2Y8k4Efhgi2gI/QdFkEbyLp3Zbwj8V2w3n4A7FvgFKgVRRehGmoGOMEXFUC1Ln3gswrBp76HGe5GksrVcJnpZGfsUshMD/H90Svy/akl9X8xQXbGs5hohdpY2wY/Vwie+h4eU80A+cIaINv0IFysDZwLfQdFUFA/fte2irE5cCgBg5pg0pL7bAncSKFafcofBG5DoVpd4so+B65joVoHwD2qMyVZjhB805DxlrA+3p6webydoWbAU3690//RN0/sInIeI4efAAAAAElFTkSuQmCC'></img>
                    </div>

                </div>

                <div className='List'>

                    {requestedUser?.seriesList.map(serie=>{
                        return (
                                <article className='Item' key={serie.id}>
                                    <span className='CloseExpandItem HiddenItem' onClick={(e)=>{closeExpandItem(e)}}>
                                        <img className='HiddenItem' alt='close icon'src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABPklEQVRIie2WwU7CQBCGP+QZOCiVQPQpDC+gYumLiM/iTYPx4NGbBp/FcCEm8gItRyBy2G4oa2l3tl3jgT+ZQ7vb/WZmd6cDB/2RGoK5HWAIXANdIEjfz4EvYAK8Ad91OdcGHoEV8FNia+A1daySImBhATQtAUJX6B0qAik0G/1ICo0qQrNw68gD3NJblPYTG/BzjVBt4zJoB7vTK7UV2+sHwJEBjoBmmXcOaqJqwF7wpQeo1lUR+Nwj+KxoMOH3/lw4QPo56yTZCWbEeZLUc+dvptR/orV9ZkFmxDOppwLtrG2CPzyCJ0WDp/gpIEuMApKnJw/ghzIoqB9/3rVytRg4tgGDqmB1pHwN3NhCtUZUbwRupVCtELe0x8DAFarVAu5RJ9Mmyhcs9lRS2gK27W2P3fZ2hqoB7+nzQf9HG1ixKXyZ2CzlAAAAAElFTkSuQmCC"/>
                                    </span>
                                    <img className='ItemImg' alt='' src={serie.photoURL} onClick={(e)=>{expandItem(e)}}></img>
                                    <span className='ItemTitle'>{serie.title}</span>
                                    <span className='ItemStatus'  status={serie.status}>{serie.status}</span>
                                    <span className='ItemAttribute HiddenItem'>{serie.description}</span>
                                    <span className='ItemAttribute HiddenItem' rate={serie.rate}>
                                        <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC'/>
                                        <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC'/>
                                        <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC'/>
                                        <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC'/>
                                        <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC'/>
                                    </span>
                                </article>
                            )
                        })
                    }
                    {requestedUser.seriesList.length>0?<></>:<div className="EmptyList"><p>Empty List!</p></div>}

                </div>

            </div>

            <div className='ListContainer'>

                <div className='ListOptions'>

                    <span className='ListTitle'> Books </span>

                    <div className='AddToList'>
                        <img alt='add to list icon' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABSklEQVRIie2Wz07CQBCHP+UZPCiVYPQpAB/Af9AXEZ/FI0EvHLlh8FmMF2KiL0A9CsHDdmXZsNvZrTUe+CVzaDvdb2Y6O13Y6Y+0F+DbAHrAFdAEkvz+B/AGTIEJ8P5bwdWBAbAAVgW2BMZ5YKWUAp8CoG0Z0I2F3qEyCIWa2fdDoWlJqAkXZ54QV15f2Y8k4Efhgi2gI/QdFkEbyLp3Zbwj8V2w3n4A7FvgFKgVRRehGmoGOMEXFUC1Ln3gswrBp76HGe5GksrVcJnpZGfsUshMD/H90Svy/akl9X8xQXbGs5hohdpY2wY/Vwie+h4eU80A+cIaINv0IFysDZwLfQdFUFA/fte2irE5cCgBg5pg0pL7bAncSKFafcofBG5DoVpd4so+B65joVoHwD2qMyVZjhB805DxlrA+3p6webydoWbAU3690//RN0/sInIeI4efAAAAAElFTkSuQmCC'></img>
                    </div>

                </div>

                <div className='List'>

                    {requestedUser?.booksList.map(book=>{
                        return (
                                <article className='Item' key={book.id}>
                                    <span className='CloseExpandItem HiddenItem' onClick={(e)=>{closeExpandItem(e)}}>
                                        <img className='HiddenItem' alt='close icon'src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABPklEQVRIie2WwU7CQBCGP+QZOCiVQPQpDC+gYumLiM/iTYPx4NGbBp/FcCEm8gItRyBy2G4oa2l3tl3jgT+ZQ7vb/WZmd6cDB/2RGoK5HWAIXANdIEjfz4EvYAK8Ad91OdcGHoEV8FNia+A1daySImBhATQtAUJX6B0qAik0G/1ICo0qQrNw68gD3NJblPYTG/BzjVBt4zJoB7vTK7UV2+sHwJEBjoBmmXcOaqJqwF7wpQeo1lUR+Nwj+KxoMOH3/lw4QPo56yTZCWbEeZLUc+dvptR/orV9ZkFmxDOppwLtrG2CPzyCJ0WDp/gpIEuMApKnJw/ghzIoqB9/3rVytRg4tgGDqmB1pHwN3NhCtUZUbwRupVCtELe0x8DAFarVAu5RJ9Mmyhcs9lRS2gK27W2P3fZ2hqoB7+nzQf9HG1ixKXyZ2CzlAAAAAElFTkSuQmCC"/>
                                    </span>
                                    <img className='ItemImg' alt='' src={book.photoURL} onClick={(e)=>{expandItem(e)}}></img>
                                    <span className='ItemTitle'>{book.title}</span>
                                    <span className='ItemAttribute HiddenItem'>{book.author}</span>
                                    <span className='ItemStatus'  status={book.status}>{book.status}</span>
                                    <span className='ItemAttribute HiddenItem'>{book.description}</span>
                                    <span className='ItemAttribute HiddenItem' rate={book.rate}>
                                        <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC'/>
                                        <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC'/>
                                        <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC'/>
                                        <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC'/>
                                        <img alt='star' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABd0lEQVRIid2Wv0rEQBCHPw/UK9RTG7G4Qo5DrAXBQsRCEUEUDkXU2uJewNrOV/ABVLhGfILzARS0thG0EsRU/sE7Y5ENF+NekpnEgP5gIGRnft/Ostks/EH1mchdF0Azb+gE8Am4QEVjUFCCN4Ee81xTeqh0hdetC1zmBa0EoH5UpSaapd6yvNtQ+Ih1w8+Or38bOmmB+jElMUq61EVgBNiNyNk2OUXJBBaAR8Che0dpwzGMeeh0fA+8ACXJbIUqGcaDbaAh6EAa58Bo1Mz2gPcMgR/APp2TLlLTwG0G0DtgNgkwqCHgNAX0DG+Xq1XHWy7J0tbTAH2NAW0BuA2Mx5kmOUDWE+YFPVezAK8JoGlqvmkAeEW+sd7wNmdXxXW8gv3sbQEHJlqW8X5gOcY7UifYv825QM4M9m/+WAvtBZ5DZg1g2JI7CByFch2U19+lkMlOgpoa8BSoW9SAD01xEygL6sqmxjUeYlXxfvyae1nB1Iovgf9XX4TJ0rmAd6kJAAAAAElFTkSuQmCC'/>
                                    </span>
                                </article>
                            )
                        })
                    }
                    {requestedUser.booksList.length>0?<></>:<div className="EmptyList"><p>Empty List!</p></div>}

                </div>

            </div>

        </div>
    )

}

export default Lists;