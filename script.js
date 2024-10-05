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
                            <button id="addToList" onclick="markAsRead()" data-post="${JSON.stringify(posts)}" class="addToList btn btn-circle bg-green-500 text-white">hi</button>
                        </div>
                    </div>
                </div>

             </div>
    `
    postContainer.appendChild(card);
    
   })
    
}

const handleSearchByCategory = () =>{
    const searchText = document.getElementById("searchPosts").value;
    loadAllPosts(searchText)
    
}

loadAllPosts()
