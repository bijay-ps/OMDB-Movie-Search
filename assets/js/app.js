$(document).ready(() => {
    $('#searchResult1').hide();
    $('#noMovieFound').hide();

    $('#movieName').keydown((e) => {
        if (e.keyCode == 13) {
            e.preventDefault();
            let mName = $('#movieName').val();
            let mYr = $('#movieYear').val();
            if (mName === '' || mName === undefined) {
                alert('Please enter movie name!!');
            }

            if (mName && !mYr) {
                getMovieByName(mName);
            }
        }
    })

    $('#movieYear').keydown((e) => {
        if (e.keyCode == 13) {
            e.preventDefault();
            let mName = $('#movieName').val();
            let mYr = $('#movieYear').val();
            if (mName === '' || mName === undefined) {
                alert('Please enter movie name!!');
            }

            if (mName && !mYr) {
                getMovieByName(mName);
            }

            if (mName && mYr) {
                getMovieByNameNYear(mName, mYr);
            }
        }
    })

    $('#imdbId').keydown((e) => {
        if(e.keyCode == 13) {
            e.preventDefault();
            let mId = $('#imdbId').val();
            if (mId === '' || mId === undefined) {
                alert('Please enter movie IMDB ID');
            }

            if (mId) {
                getMovieByIMDBId(mId);
            }
        }
    });

    $('#movie-by-name').click(() => {
        let mName = $('#movieName').val();
        let mYr = $('#movieYear').val();
        if( mName === '' || mName === undefined ) {
            alert('Please enter movie name!!');
        }

        if(mName && !mYr) {
            getMovieByName(mName);
        }

        if(mName && mYr) {
            getMovieByNameNYear(mName, mYr);
        }
    });
    
    $('#movie-by-id').click(() => {
        let mId = $('#imdbId').val();
        if( mId === '' || mId === undefined ) {
            alert('Please enter movie IMDB ID');
        }

        if(mId) {
            getMovieByIMDBId(mId);
        }
    })
});

let getMovieByName = (movie) => {
    clearCard();
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'https://www.omdbapi.com/?t=' + movie + '&apikey=fd1e0aa3',
        success: (data) => {
            displayMovieDetails(data);
        },
        error: (err) => {
            console.error(`error occured: ${err}`);
        }
    });
};

let getMovieByNameNYear = (name, year) => {
    clearCard();
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'https://www.omdbapi.com/?t=' + name + '&y=' + year + '&apikey=fd1e0aa3',
        success: (data) => {
            displayMovieDetails(data);
        },
        error: (data) => {
            alert("some error occured")
        }
    });
}

let getMovieByIMDBId = (id) => {
    clearCard();
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'https://www.omdbapi.com/?i=' + id + '&apikey=fd1e0aa3',
        success: (data) => {
            displayMovieDetails(data);
        },
        error: (err) => {
            console.error(`error occured: ${err}`);
        }
    });
}
let clearCard = () => {
    $('#mTitle').html('<strong></strong>');
    $('#mYear').html('<strong>Release Year: </strong>');
    $('#mPlot').html('<strong>Plot: </strong>');
    $('#mActors').html('<strong>Actors: </strong>');
    $('#mIMDBRating').html('<strong>IMDB Rating: </strong>');
    $('#mBoxOffc').html('<strong>Boxoffice Collection: </strong>');
    $('#mProduction').html('<strong>Production: </strong>');
}

let displayMovieDetails = (data) => {
    console.log('res: ', data);
    if (data.Error) {
        $('#noMovieFound').show();
        $('#searchResult1').hide();
    } else {
        if (data.Poster === 'N/A') {
            $('#poster').attr('src', 'https://memegenerator.net/img/instances/60452443.jpg');
        } else {
            $('#poster').attr('src', data.Poster);
        }

        $('#mTitle').text(data.Title);
        $('#mYear').append(data.Year);
        $('#mPlot').append(data.Plot);
        $('#mActors').append(data.Actors);
        $('#mIMDBRating').append(data.imdbRating);
        $('#mBoxOffc').append(data.BoxOffice);
        $('#mProduction').append(data.Production);
        $('#noMovieFound').hide();
        $('#searchResult1').show();
    }
}