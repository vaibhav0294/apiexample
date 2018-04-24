function profilePage(){
    window.location.href = 'index.html';
}

function homePage(){
    window.location.href = 'home.html';
}


$(document).ready(function () {
    $(".make").on('click', function () {
        let newUL = ('<div id="myCard"><img id="picture" src="https://scontent.xx.fbcdn.net/v/t1.0-0/p180x540/13179344_1090855490986459_1892058757338492805_n.jpg?_nc_cat=0&oh=e6a12280e8bea337f0bd4e74c0ff1e47&oe=5B5C39B0" width="300" height="300"> </div>');
        $('#news_feed').append(newUL);
    })
    myFacebookToken = prompt("Enter your facebook token")
    if (myFacebookToken == null || myFacebookToken == "") {
        alert('No user token found')
    } else {
        getNewsFeed();
    }

    


});

let getNewsFeed = () => {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://graph.facebook.com/me/?fields=name,feed{full_picture,story},picture&access_token=' + myFacebookToken,

        success: (response) => {
            $("#profilePic").attr("src", response.picture.data.url);
            let fullName = response.name;
            let firstName= fullName.split(" ");
            $('.firstName').html(firstName[0]);

           

            let newUL;

            for (i = 0; i < 20; i++) {
                 newUL = ('<div id="myCard"><div class="top"><div class="d-inline"><img class="pic" src="" width="30" height="30" alt="pic"></div><div class="story d-inline "><span></span><i style="float:right" class="fas fa-ellipsis-h"></i></div></div><img id="picture" src="" width="300" height="300"><div class="bottom"><span><i style=" font-size: 20px" class="far fa-thumbs-up"></i> Like</span><span><i style=" font-size: 20px" class="far fa-comment-alt"></i> Comment</span><span><i style=" font-size: 20px" class="fas fa-share"></i> Share</span></div></div>');
                 $('#news_feed').append(newUL);
                }
                i=0;
            $("#news_feed .story span").each(function(){
                $(this).html(response.feed.data[i].story);
                i++;
            });
            i=0;
            $("#news_feed #picture").each(function(){
                let imageUrl = response.feed.data[i].full_picture;
                $(this).attr("src", imageUrl);
                i++;
            });

            $("#news_feed .pic").each(function(){
                let imageUrl = response.picture.data.url;
                $(this).attr("src", imageUrl);
                i++;
            });

           
        }
    });
}