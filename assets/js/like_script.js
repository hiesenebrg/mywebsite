let likeButton = document.querySelector('.like-share a');
let likebutton = document.querySelector('.like-share a i');
likebutton.addEventListener('click', function(){
    console.log("Like Button clicked");
    likebutton.remove();
    let script = document.createElement('script');
    script.innerHTML = ""

})