const express = require('express')
const dotenv= require('dotenv')
dotenv.config()
const app = express();

const cors = require('cors')
app.use(cors({origin:"*"}))

app.use(express.json())

var SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.API_KEY;

app.post('/send-message',(req,res)=>{

    const { name,email,subject,query}= req.body;
    console.log(name,email,subject,query)
    if(!name || !email || !query ){
        res.send(500)
    }
    else{
        new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({

            "sender":{ "email":"admin@techzmechanics.com", "name":"Techz Mechanics"},
            "subject":`${name} has a query posted on your website`,
            "htmlContent":`<!DOCTYPE html>
            <html>
            <body>
            <h2>Hi Admin , Following are the details</h2>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Subject:</b> ${subject}</p>
            <p><b>Query:</b> ${query}</p>
            <br>
            <p>Thanks & Regards</p>
            </body>
            </html>`,
            "params":{
                "greeting":"Hi Admin",
                "headline":`${name} has a query posted on your website`
             },
            
            "to":[{
                "email":"techz.mechanics@gmail.com"
               
            }]
      
       
       }).then(function(data) {
         console.log(data);
         res.json({"message":"sucess"})
       }, function(error) {
         console.error(error);
       });
    }
   









    
})



app.listen(8080,()=>{
    console.log("Server is running at http://localhost:8080")
})