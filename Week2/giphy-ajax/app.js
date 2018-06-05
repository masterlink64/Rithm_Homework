$(document).ready(function() {
    // want to append image
    // using AJAX will make request to API
    // get a response back and it will run callback
    // need to add event listener for on click for search giphy
    // on submit it will do the following code
    $('form').submit(function(event) {
        event.preventDefault();
        let searchTerm = $('.search-text').val();
        console.log(searchTerm);
        $.getJSON(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC`, function(response) {
            var $gif = $("<img>", {
                src: response.data[0].images.fixed_height.url
            });
            $('.gifs-space').append($gif);
        });

        $('#search-form').each(function(){
            this.reset();
        });
    });

    $('#remove-btn').on('click', function(event) {
        //console.log('fun');
        $('img').remove();
    })
});