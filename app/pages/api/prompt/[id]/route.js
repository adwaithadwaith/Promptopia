import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";



export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        console.log("in get function prompt/id")
        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        console.log(error)
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH =async (req, {params} ) =>{
    console.log("in Patch function prompt/id")
    const {prompt, tag} = await req.json()

    try {
        await connectToDB()


        const existingPrompt = await Prompt.findById(params.id)
        if(!existingPrompt){
            return new Response('Prompt not found',{
                status: 404
            })
        }
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt),{
            status : 200
        })

    } catch (error) {
        return new Response('failed to update prompt',{
            status : 500
        })
    }

}

export const DELETE = async (req,{params})=> {
    try{
        await connectToDB()

        await Prompt.findByIdAndDelete(params.id)
        return new Response("Prompt deleted successfully",{
            status : 200
        })
    } catch(error){
        return new Response("Failed to delete prompt",{
            status : 500
        })
    }
    
}