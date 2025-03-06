const Chat = require('../models/chatModel');

//Handle chatbot responses
exports.getChatResponse = async(req,res)=>{
    const userMessage=req.body.message;

    try{
        //Full-text search in MongoDB
        let response = await Chat.findOne({$text:{$search:userMessage}});

        if(response){
            res.json({reply:"I Couldn't find an answer, but I'm learning!"});
        }else{
            res.json({reply:"I couldn't find an answer, but I'm learning!"});
        }
    }catch(error){
        res.status(500).json({reply:"An error occured. please try again."});
    }
}