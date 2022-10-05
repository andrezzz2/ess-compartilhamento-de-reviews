import './Styles.css';

function Reviews ( {requestedUser} ){
    return (
        <div className="Reviews">
            {
            requestedUser.reviews.map(
                review => 
                    <div className='ReviewBoxContainer'>
                        <div className='WhiteBox'> 
                            <div className='ImageContainer'> 
                                <img src="https://media.tenor.com/sPfJjqKuuYUAAAAd/monkey-creepy.gif"></img> 
                                <button>EDIT REVIEW</button>
                            </div>
                            <div className="ReviewContainerContainer">
                                <div className="TitleRateContainer">
                                    <div>{review.title}</div>
                                    <div>Nota: {review.rate}</div>
                                </div>
                                <div className='ReviewContainer'>
                                {/* <div> {review.type} </div>  */}
                                    <div> {review.text ? review.text : "-"} </div>
                                </div>
                            </div>
                        </div>
                        {/* <br /> */}
                    </div>
            )}

            
        </div>
    )

}

export default Reviews;