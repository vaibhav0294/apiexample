let myFacebookToken;

function profilePage(){
    window.location.href = 'index.html';
}

function homePage(){
    window.location.href = 'home.html';
}

$(document).ready(() => {

    $('title').HTML = "vaibhav";

    myFacebookToken = prompt("Enter your facebook token")
    if (myFacebookToken == null || myFacebookToken == "") {
        alert('No user token found')
    } else {
        getAllDetails();
    }// ed=nd of if condition
}); // end document.ready function

let getAllDetails = () => {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://graph.facebook.com/me?fields=name,about,feed,quotes,cover,picture.type(large),friends&access_token=' + myFacebookToken,

        success: (response) => {
            $('#name').append(response.name);
            console.log(response);
            let fullName = response.name;
            let firstName= fullName.split(" ");
            $('.firstName').html(firstName[0]) ;
            $("#searchInput").attr("placeholder", response.name).blur();
            $("#profilePic").attr("src", response.picture.data.url);
            $("#profilePhoto").attr("src", response.picture.data.url);
            $("#coverPhoto").css('background-image', 'url(' + response.cover.source + ')');
            $("#fullName").html('<h2>' + response.name + '</h2>').blur();
            let total_count = response.friends.summary.total_count;
            $('.total_count').html(total_count);

            $('#friendList').append('<div class="col-5 friendCard"> <img id="friendList" src=""> </div>');
        }
    });
}