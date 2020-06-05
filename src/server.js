//chama o express pra montar o sv
const express = require("express")
//server executa o express
const server = express()

//pegar banco de dados
const db = require("./database/db")

//configurar a pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true}))

//Utilizando a template engine
const nunjucks = require("nunjucks")
//primeiro argumento e a pasta onde estao os html e o segundo e um objeto( express: server, noCache enqanto desenvolvimento true)
nunjucks.configure("src/views",{

    express: server,
    noCache: true

} )

//configurando caminhos da aplicação
//pagina inicial
// req: Requisição
// res: resposta

server.get("/", (req, res) => {

    return res.render("index.html")

})

server.get("/create-point", (req, res) => {

    //req.query Query String da nossa url 
    //console.log(req.query)

   return res.render("create-point.html")   

})

server.post("/save-point", (req, res) =>{

    //req.body: O corpo do nosso formulario
    console.log(req.body)

    //inserir dados no banco de dados

     const query = `
        
     INSERT INTO places (

         image,
         name,
         address,
         address2,
         state,
         city,
         items

     ) VALUES ( ?,?,?,?,?,?,? );`

     const values = [
 
         req.body.image,
         req.body.name,
         req.body.address,
         req.body.address2,
         req.body.state,
         req.body.city,
         req.body.items
 
     ]

     function afterInsertData(err){

         if(err){

            console.log(err)
            return res.render("create-point.html",{ wrong: true })
         
        }

         console.log("Cadastrado com sucesso")
         console.log(this)

         return res.render("create-point.html",{ saved: true })

     }

 db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == ""){
    
        return res.render("search-results.html", { total: 0 })
    
    }


    //consultar dados

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
            
        if(err){

            return console.log(err)
        
        }

        const total = rows.length

        //mostra a pagina html com o banco de dados
        return res.render("search-results.html", {places: rows, total: total})
      
    })
 
 })

//ligar o servidor
server.listen(3000)

