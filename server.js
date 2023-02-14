const express =require("express")

const db=require('./config/db')
const app=express()
const dotenv=require("dotenv")
const PORt=process.env.PORT

app.use(express.json())

const {error , succes}=require('consola')
const cors = require('cors')

app.use(cors())
const admin =require('./router/adminRouter')
app.use('/admin' , admin)
const candidat = require('./router/candidatRouter')
app.use('/candidat' , candidat)
const entreprise = require('./router/entrepriseRouter')
app.use('/entreprise' , entreprise)
const authentification = require('./router/authentificationRouter')
app.use('/auth' , authentification)
const categorie = require('./router/categorieRouter')
app.use('/categorie' ,categorie)
const offre = require('./router/offreRouter')
app.use('/offre' , offre)
const candidature = require('./router/candidatureRouter')
app.use('/candidature' , candidature)
app.get('/getImage/:img' , function(req , res){
    res.sendFile(__dirname+'/storages/' + req.params.img)
})


app.listen(PORt , ()=>{
    console.log("server started on http://localhost:1111")
})
