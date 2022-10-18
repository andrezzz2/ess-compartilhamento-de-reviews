import './Styles.css';

function Reviews ( {requestedUser} ){
    function ShowReviewByType () {
        var movieIndex, bookIndex, serieIndex
        var currentMovie, currentBook, currentSerie
        if (requestedUser.reviews.length <= 0) {
            return (
                <div>
                    {
                    requestedUser.reviews.map(
                        review => {
                            switch (review.type) {
                                case "movie":
                                    movieIndex = parseInt(review.itemId)
                                    currentMovie = requestedUser.moviesList[movieIndex]
                                    return (
                                        <div className="ReviewContainer">
                                            <div className="WhiteBoxContainer">
                                                
                                                <div className="InlineContainer">
                                                    <div className="ReviewImg">
                                                        <img src={currentMovie.imageURL} alt="filme"></img>
                                                    </div>
                                                    <div className="TitleName">
                                                        {currentMovie.title}
                                                    </div>
                                                    <div className='ReviewText'>
                                                            {review.text}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                case "book":
                                    bookIndex = parseInt(review.itemId)
                                    currentBook = requestedUser.booksList[bookIndex]
                                    return (
                                        <div className="ReviewContainer">
                                            {currentBook.title}
                                            <div className="WhiteBoxContainer"> 
                                                <div className="InlineContainer">
                                                    <img className="ReviewImg" src={currentBook.imageURL} alt="imagem"></img>
                                                    <div className='ReviewText'>
                                                        {review.text}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                case "serie":
                                    serieIndex = parseInt(review.itemId)
                                    currentSerie = requestedUser.seriesList[serieIndex]
                                    return (
                                        <div className="ReviewContainer">
                                            {currentSerie.title}
                                            <div className="InlineContainer">
                                                <img className="ReviewImg" src={currentSerie.imageURL} alt="serie"></img>
                                                <div className='ReviewText'>
                                                    {review.text}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                default:
                                    return (
                                        <div className="ReviewContainer">
                                        </div>
                                    );
                            } 
                        }
                    )
                }
            </div>
            )
        }
        }
        

    return (
        <div className="Reviews">
            <ShowReviewByType/>
        </div>
    )
}

export default Reviews;