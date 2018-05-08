$(document).ready(() => {
    $('#searchResult1').hide();
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
    
});

let getMovieByName = (movie) => {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://www.omdbapi.com/?t=' + movie + '&apikey=fd1e0aa3',
        success: (data) => {
            console.log(data);

            $('#mTitle1').text(data.Title);
            $('h5#mYear1').append(data.Year);
            $('#mPlot1').text(data.Plot);
            $('#searchResult1').show();
        },
        error: (data) => {
            alert("some error occured")
        }
    });
};

let getMovieByNameNYear = (name, year) => {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://www.omdbapi.com/?t=' + name + '&y=' + year + '&apikey=fd1e0aa3',
        success: (data) => {
            console.log(data)
        },
        error: (data) => {
            alert("some error occured")
        }
    });
}
