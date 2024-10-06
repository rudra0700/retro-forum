const loadAllPosts = async (category) =>{
            // way 2 for dynamic catagory-------------->

        // console.log(`https://openapi.programming-hero.com/api/retro-forum/posts${category ? `?category=${category}`: ""}`);
        

        // way 1 for dynamic category-------------->

    //   if(category){
    //     console.log(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`);
    //   }else{
    //     console.log(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    //   }


    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category ? `?category=${category}`: ""}`);
    const data = await res.json();
    displayAllPost(data.posts);
    
}

const displayAllPost = (posts) =>{
   const postContainer = document.getElementById("post-container");
   postContainer.innerHTML = '';
   posts.forEach(post =>{
    const card = document.createElement("div");
    card.innerHTML = `
     <div class="p-6 lg:p-12 flex gap-6 lg:flex-row flex-col items-center lg:items-start bg-[#F3F3F5] rounded-3xl">

                <div class="indicator">
                    <span class="indicator-item badge ${post.isActive ? "bg-green-600" : "bg-red-600"}"></span>
                    <div class="avatar">
                        <div class="w-24 rounded-xl">
                            <img src="${post.image}">
                        </div>
                    </div>
                </div>
                <div class="space-y-4 w-full ">
                    <div class="flex gap-4 *:opacity-60">
                        <p>${post.category}</p>
                        <p>${post.author.name}</p>
                    </div>
                    <h3 class="text-2xl font-bold opacity-70">
                       ${post.title}
                    </h3>
                    <p class="opacity-40">${post.description}</p>
                    <hr class="border border-dashed border-gray-300">
                    <div class="flex justify-between *:font-bold [&>&:not(:last-child)]:opacity-45">
                        <div class="flex gap-4 ">
                            <div class="space-x-2 flex items-center">
                                <i class="fa-regula fa-comment-dots"></i>
                                <p>${post.comment_count}</p>
                            </div>
                            <div class="space-x-2 flex items-center">
                                <i class="fa-regula fa-eye"></i>
                                <p>${post.view_count}</p>
                            </div>
                            <div class="space-x-2 flex items-center">
                                <i class="fa-regula fa-clock"></i>
                                <p>${post.posted_time}</p>
                            </div>
                        </div>
                        <div class="opacity-100">
                            <button id="addToList" onclick="markAsRead('${post.description}', '${post.view_count}')" data-post="${JSON.stringify(posts)}" class="addToList btn btn-circle bg-green-500 text-white">hi</button>
                        </div>
                    </div>
                </div>

             </div>
    `
    postContainer.appendChild(card);
    
   })
    
}
let count = 0;
const markAsRead = (description, view_count) =>{ 
   const markAsReadContainer = document.getElementById("markAsReadContainer");
  
//    markAsReadCounter.innerText = count
   const div = document.createElement("div");
   div.innerHTML = `
   <div class="flex justify-between p-2 lg:p-3 bg-white rounded-2xl items-center gap-3">
                  <div class="lg:w-4/5 w-11/12"></div>
                  <p>${description}</p>
                </div>
                <div class="lg:w-1/5 w-4/12 flex justify-end">
                  <p><i class="fa-regula fa-eye">${view_count}</i></p>
                </div>

   `;
   markAsReadContainer.appendChild(div);
   handleCounter()
    
}

const handleCounter = () =>{
    const  markAsReadCounter = document.getElementById("markAsReadCounter").innerText;
    const prevCount = Number(markAsReadCounter);
    const sum = prevCount + 1;
    document.getElementById("markAsReadCounter").innerText = sum
    
}

const loadLatestPost = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
     showLatestPost(data)
    
}

// {
//     "cover_image": "https://i.ibb.co/VYGSkLz/pexels-jeshootscom-442576.jpg",
//     "profile_image": "https://i.ibb.co/z8zx95w/pexels-davide-de-giovanni-1649675.jpg",
//     "title": "Gaming Enthusiast Expert in Play",
//     "description": "Leading gaming expert with a wealth of knowledge and passion for all things gaming",
//     "author": {
//         "name": "John Doe",
//         "designation": "ROR Developer",
//         "posted_date": "29 January 2024"
//     }
// }

const showLatestPost = (posts) =>{
    const latestPostContainer = document.getElementById("latest-post-container");
   posts.forEach(post =>{
    console.log(post);
    const div = document.createElement("div");
    div.innerHTML = `
      <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
              <img
                  src="${post.cover_image}"
                  alt="Shoes"
                  class="rounded-xl"
              />
          </figure>
        <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
              <p class="opacity-50 text-start">
                  <i class="fa-solid fa-calendar-days me-2"></i>${post.author?.posted_date || "No Publish Date"}
              </p>
              <h2 class="card-title text-start">${post.title}</h2>
              <p class="text-start">
                ${post.description}
              </p>
              <div class="card-actions flex gap-5 items-center">
                  <div class="avatar">
                      <div
                          class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                      >
                          <img
                          src="${post.profile_image}"
                          />
                      </div>
                  </div>
              <div>
              <h3 class="text-start font-extrabold">${post.author.name}</h3>
              <p>${post.author.designation ? post.author.designation : "Unknown"}</p>
          </div>
      </div>
        

          <span
            id="latestPostLoader"
            class="loading loading-infinity loading-lg lg:mt-24 text-primary hidden"
          >
        </span>
          <!-- dynamic content -->
        </div>
    ` ;  
    latestPostContainer.appendChild(div) 
   })
   
}

const handleSearchByCategory = () =>{
    const searchText = document.getElementById("searchPosts").value;
    loadAllPosts(searchText)
    
}
loadLatestPost()

loadAllPosts()
