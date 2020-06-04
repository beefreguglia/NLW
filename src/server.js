//chama o express pra montar o sv
const express = require("express")
//server executa o express
const server = express()

//configurar a pasta publica
server.use(express.static("public"))

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

   return res.render("create-point.html")

})

server.get("/search", (req, res) => {

    return res.render("search-results.html")
 
 })

//ligar o servidor
server.listen(3000)

