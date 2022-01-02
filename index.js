let inputUsername = document.querySelector("#username");
let searchBtn = document.querySelector("#searchBtn");
let profile = document.querySelector("#profile");
let post = document.querySelector("#post");
let errorContent = document.querySelector("#errorContent");


// fetching user
searchBtn.addEventListener('click', () => {
    showuserData();

});

// creating a function to get data
showuserData = () => {
    let user = inputUsername.value;
    console.log(user);

    url = `https://dev.to/api/users/by_username?url=${user}`;

    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        if (data.username === undefined) {
            let errorMsg = "";

            errorMsg += `<div id="errorContent">
                <div class="icon">
                    <i class="fa fa-times fa-3x"></i>
                </div>
                <div class="message">
                    No Username Found
                </div>
            </div>`;

            errorContent.innerHTML = errorMsg;

            errorContent.style.border = "3px solid red";

            errorContent.style.display = "flex";

            post.style.display = "none";
            profile.style.display = "none";


        } else {
            errorContent.style.display = "none";
            profile.style.display = "flex";
            post.style.display = "flex";
            console.log(data);

            let profileContent = "";
            profileContent += `<div id="profile">
            <div class="Profiledet">
            <div class="profileImg">
            <img src="${data.profile_image}" alt="Profile Image"></div>
            <div class="name">Name : ${data.name}</div>
            <div class="userName">UserName : ${data.username}</div>
            <div class="summary">Bio : ${data.summary}</div>
        </div>
        </div>`;

            profile.innerHTML = profileContent;

            profile.style.boxShadow = "0px 0px 8px black";


            // fetching blog post of provided username

            urls = `https://dev.to/api/articles?username=${user}`;
            fetch(urls).then((result) => {
                return result.json();
            }).then((content) => {

                console.log(content);

                postContent = "";

                content.forEach((element, index) => {

                    postContent += `
                    <div id="post">
                             <div class="postContent">
                                <div class="coverImg">
                                    <img id="image" src="${element.cover_image}" onerror=this.src="https://upload.wikimedia.org/wikipedia/commons/9/9b/No_cover.JPG">
                                </div>
                                <div class="postDetail">
                                    <div class="titleContent">
                                        <div class="title"> ${element.title}</div>
                                    </div>
                                    <div class="description">${element.description}</div>
                                    <div class="readPost"><a href="${element.url}" target="_blank"><i>Read Full Post</i></a></div>
                                    <hr>
                                    <div class="author">
                                        <div class="authornName"><i>By : ${user}</i></div>
                                        <div class="createdAt"><i>${element.readable_publish_date}</i></div>
                                        <div class="reaction"><i><i class="fa fa-heart-o"></i>  ${element.public_reactions_count}</i></div>
                                    </div>
                                </div>
                            </div>
                    </div>`;


                });

                post.innerHTML = postContent;
                post.style.marginBottom = "1rem";
                // let image = document.querySelector(".image");
                // image.style.height = "50px";
                // image.style.width = "50px";

            });


        }
    });


}