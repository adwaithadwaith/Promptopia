import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 



// import { connectToDB } from "@utils/database"
// import Prompt from "@models/prompt";

// export const GET = async(req,{params})=>{

//     try {
//         await connectToDB()
//         const prompts = await Prompt.find({
//             creator: params.id
//         }).populate('creator')
//         console.log("inside api/user/[id]/posts")
//         return new Response(JSON.stringify(prompts),{
//             status : 200
//         })
        
//     } catch (error) {
//         console.log("inside api/user/[id]/posts")
//         return new Response('Failed to fetch all prompts',{
//             status: 500
//         })
        
//     }
// }