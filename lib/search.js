

export const searchPost = (posts, searchText)=>{
    console.log(searchText)
    if(!searchText){
        return posts
    }
    const newFilterdPosts = posts.filter((post)=>{
        const postContent = post.prompt.toLowerCase()
        const postCreator = post.creator.username.toLowerCase()
        const postTag = post.tag.toLowerCase()
  
        return (
          postContent.includes(searchText) || postCreator.includes( searchText )|| postTag.includes( searchText )
     
        )
    }
    )
    return newFilterdPosts
}