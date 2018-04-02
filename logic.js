

var topics = ["cute kitten", "cute dog", "sad duck"];


$(document).ready(function () {

    function buttonDisplay() {
        for (let i = 0; i < topics.length; i++) {
            var button = $("<button>");
            button.text(topics[i]);
            $("#topics").append(button);
        }
    };
    buttonDisplay();

    $(document).on("click", "button", function () {
        $("#images").empty();
        var topicName = $(this).text();
        console.log(topicName);
        giphyAPI(topicName);
    }).on("click", "#submitBtn", function () {
        event.preventDefault();
        topics.push($("#addGif").val());
        $("#topics").empty();
        buttonDisplay();

    }).on("click","img", function() {
        var cl = $(this).attr('class');
        console.log(cl);
        $( "."+ cl).toggle();

    })
});

    function giphyAPI(topicName) {
        //whatever the name is from the button that has been clicked
        var giphyAPI = "http://api.giphy.com/v1/gifs/search?q=" + topicName + "&limit=10&api_key=DYbs1pyLJqYJIIEby0G5SgdxYzPfRTLn";
        $.ajax({
            url: giphyAPI,
            method: 'GET',
        }).then(function (response) {
            console.log(response);
            giphyDisplay(response);

        });
    }

    function giphyDisplay(response) {
        for (let i = 0; i < response.data.length; i++) {
            var newdiv = $("<div>");
            var p = $("<p>")
            var staticImg = $("<img>")
            var gifImg = $("<img>")

            var rating = response.data[i].rating;
            var staticUrl = response.data[i].images['480w_still'].url;
            var gifUrl = response.data[i].images.downsized.url;

            p.text(rating);
            staticImg.attr("src", staticUrl);
            gifImg.attr("src", gifUrl);
            gifImg.css("display", "none");
            gifImg.css("width", response.data[i].images['480w_still'].width);
            gifImg.css("height", response.data[i].images['480w_still'].height);
            gifImg.addClass(response.data[i].id);
            staticImg.addClass(response.data[i].id);

            newdiv.append(p, staticImg);
            newdiv.append(gifImg);

            $("#images").append(newdiv);

        }
    }

