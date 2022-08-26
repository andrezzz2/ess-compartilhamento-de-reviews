import './Styles.css';

function Lists ( {User} ){

    return (
        <div className="Lists">
            
            <div className='ListContainer'>

                <div className='ListOptions'>

                    <span className='ListTitle'> Movies </span>

                    <div className='AddToList'>
                        <img alt='add to list icon' src=''></img>
                    </div>

                </div>

                <div className='List'>

                    <article className='Item'>
                        <img alt='' src='https://lumiere-a.akamaihd.net/v1/images/56015l10_bigsal_brazil_intpayoff_4x5_d4019af6.jpeg'></img>
                        <span className='ItemTitle'>Filme 1</span>
                        <span className='ItemStatus'>assistido</span>
                    </article>

                    <article className='Item'>
                        <img alt='' src='https://lumiere-a.akamaihd.net/v1/images/56015l10_bigsal_brazil_intpayoff_4x5_d4019af6.jpeg'></img>
                        <span className='ItemTitle'>Filme 2</span>
                        <span className='ItemStatus'>assistido</span>
                    </article>

                    <article className='Item'>
                        <img alt='' src='https://lumiere-a.akamaihd.net/v1/images/56015l10_bigsal_brazil_intpayoff_4x5_d4019af6.jpeg'></img>
                        <span className='ItemTitle'>Filme 3</span>
                        <span className='ItemStatus'>assistido</span>
                    </article>

                    <article className='Item'>
                        <img alt='' src='https://lumiere-a.akamaihd.net/v1/images/56015l10_bigsal_brazil_intpayoff_4x5_d4019af6.jpeg'></img>
                        <span className='ItemTitle'>Filme 4</span>
                        <span className='ItemStatus'>assistido</span>
                    </article>

                </div>

            </div>
            

            <div className='ListContainer'>

                <div className='ListOptions'>

                    <span className='ListTitle'> Series </span>

                    <div className='AddToList'>
                        <img alt='add to list icon'></img>
                    </div>

                </div>

                <div className='List'>

                    <article className='Item'>
                        <img alt='' src='https://lumiere-a.akamaihd.net/v1/images/56015l10_bigsal_brazil_intpayoff_4x5_d4019af6.jpeg'></img>
                        <span className='ItemTitle'>Serie 1</span>
                        <span className='ItemStatus'>assistido</span>
                    </article>

                    <article className='Item'>
                        <img alt='' src='https://lumiere-a.akamaihd.net/v1/images/56015l10_bigsal_brazil_intpayoff_4x5_d4019af6.jpeg'></img>
                        <span className='ItemTitle'>Serie 2</span>
                        <span className='ItemStatus'>assistido</span>
                    </article>

                    <article className='Item'>
                        <img alt='' src='https://lumiere-a.akamaihd.net/v1/images/56015l10_bigsal_brazil_intpayoff_4x5_d4019af6.jpeg'></img>
                        <span className='ItemTitle'>Serie 3</span>
                        <span className='ItemStatus'>assistido</span>
                    </article>

                    <article className='Item'>
                        <img alt='' src='https://lumiere-a.akamaihd.net/v1/images/56015l10_bigsal_brazil_intpayoff_4x5_d4019af6.jpeg'></img>
                        <span className='ItemTitle'>Serie 4</span>
                        <span className='ItemStatus'>assistido</span>
                    </article>

                </div>

            </div>

            <div className='ListContainer'>

                <div className='ListOptions'>

                    <span className='ListTitle'> Books </span>

                    <div className='AddToList'>
                        <img alt='add to list icon'></img>
                    </div>

                </div>

                <div className='List'>

                    <article className='Item'>
                        <img alt='' src='https://lumiere-a.akamaihd.net/v1/images/56015l10_bigsal_brazil_intpayoff_4x5_d4019af6.jpeg'></img>
                        <span className='ItemTitle'>Livro 1</span>
                        <span className='ItemStatus'>assistido</span>
                    </article>

                    <article className='Item'>
                        <img alt='' src='https://lumiere-a.akamaihd.net/v1/images/56015l10_bigsal_brazil_intpayoff_4x5_d4019af6.jpeg'></img>
                        <span className='ItemTitle'>Livro 2</span>
                        <span className='ItemStatus'>assistido</span>
                    </article>

                    <article className='Item'>
                        <img alt='' src='https://lumiere-a.akamaihd.net/v1/images/56015l10_bigsal_brazil_intpayoff_4x5_d4019af6.jpeg'></img>
                        <span className='ItemTitle'>Livro 3</span>
                        <span className='ItemStatus'>assistido</span>
                    </article>

                    <article className='Item'>
                        <img alt='' src='https://lumiere-a.akamaihd.net/v1/images/56015l10_bigsal_brazil_intpayoff_4x5_d4019af6.jpeg'></img>
                        <span className='ItemTitle'>Livro 4</span>
                        <span className='ItemStatus'>assistido</span>
                    </article>

                </div>

            </div>

        </div>
    )

}

export default Lists;