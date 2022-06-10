// User's name, text, posting date(including time)
var user_name;
var user_text;
var date;

var server_url = 'http://172.20.10.3/'; // Alter it if the server is changed.

/*-------Read the data when refreshing the page--------*/
window.onload = function(){
    read_data();
}

/*----------------Refresh frequently-------------------*/
setTimeout(function(){
    location.reload();
}, 300000)

/*------Fetch the data from the ajax of read_data()----*/
function fetch(data){
    data_temp = data;
}

/*-------------Read the server txt file----------------*/
function read_data(){
    $.ajax({
        url: server_url+ 'Practice/read.php',
        success: function(data){
            if (data) {
                document.getElementById("port_article").innerHTML = data;
                fetch(data);
            } else {
                alert("Try it later!!!!!");
                fetch(data);
            }
        }
    })
}

/*-------------Function of Deleting--------------------*/
///*
$('#delete_contact').click(function(){
    if (data_sess == data_init) {
        alert("They are the same");
    } else {
        alert("They are not the same");
    }
    //alert("Sorry, we cannot let you delete any content. Please contact the manager of this lab, Prof. Shih.");
})
//*/


/*-------------Function of Publishing------------------*/
//
///*
$('#publish_post').click(function(){
    date = new Date();
    user_name = document.getElementById("input_name").value;
    user_name = date.toLocaleTimeString() + '-' + date.toLocaleDateString() + '-' + user_name;  
        if (user_name == ""){
            alert("Please key your name first!!!");
        } else {
            user_text = document.getElementById("input_text").value;
            if (user_text == ""){
                alert("Please write something first!!!");
            } else {
                // Create the html
                //
                // Example
                //<h2 id="trg_visitor1" data-bs-toggle="collapse" href="#visitor1" role="button" onClick="reply_click(id)" aria-expanded="false" aria-controls="visitor1"></h2>
                var new_id = "sh"+(Math.random() + 1).toString(36).substring(2,7); // Generate id of comment
                var post_user = "<h2 " + "id=" + "\"trg_"+ new_id + "\" " + "data-bs-toggle=\"collapse\" " + "href=\"#" + new_id + "\" " + "role=\"button\" " + "onClick=\"reply_click(id)\" " + "aria-expanded=\"false\" " + "aria-controls=\"" + new_id + "\">" + user_name + "</h2>";
                //<p class="collapse" id="visitor1">
                post_user = post_user + "\n" + " <div class=\"collapse\" " + "data-bs-parent=\"#accordionExample\" " + "style=\"margin-bottom: 0;\" " + "id=\"" + new_id + "\">" + '\n' + "<p>" + user_text + "<br></p>\n" + "</div>";
                //alert(post_user);
                //document.getElementById("port_article").innerHTML = post_user;
                $.ajax({
                    url: server_url+ "Practice/post.php",
                    type: 'POST',
                    data: {"content": post_user,
                           "ID": new_id},
                    success: function(data){
                        alert("Successfully publishing!!!");
                        read_data();
                    }
                })
            }
        }
})
//*/

/*-------------Function of commenting------------------*/
//
// Get the id of the section in bulletin that the user selected  
var tg_id = [];
function reply_click(clicked_id){
    tg_id = clicked_id;
    //$("#"+"trg_"+tg_id).collapse("show");
    return tg_id; // Save the id to pass
}
// Prepare the data for the user
$("#comment_post").click(function(){
    if (tg_id == ""){
        alert("Please choose the article first!!!");
    } else {
        // The link of the article that user selected
        var tar_href = document.getElementById(tg_id).getAttribute('href');
        tar_href = tar_href.substring(1);
        user_name = document.getElementById("input_name").value;
        if (user_name == ""){
            alert("Please key your name first!!!");
        } else {
            user_text = document.getElementById("input_text").value;
            if (user_text == ""){
                alert("Please write something first!!!");
            } else {
                // Save the data to localstorage
                //var storage = saveData(name, text)
                var comment_user = "<p>" + "[REPLY]" + user_name + ": "+ user_text + "<br></p>\n" + "</div>";
                $.ajax({
                    url: server_url+ "Practice/comment.php",
                    type: 'POST',
                    data: {"content": comment_user,
                           "name": user_name,
                           "ID": tar_href},
                    success: function(data){
                        read_data();
                        alert("Successfully commenting!!!");
                    }
                })
            }
        }
    }
})
