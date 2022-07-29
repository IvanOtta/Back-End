const express = require('express')

const fs = require('fs')

const app = express()

const PORT = process.env.PORT || 8080



const server = app.listen(PORT, () => {
    console.log(`Server corriendo en ${server.address().port}` )
})


app.get('/', (req, res) => {
    res.send('Desafio 3')
})

app.get('/productos', (req, res) => {
    
    try {
        (async function(){
            const data = await fs.promises.readFile('./file.json', 'utf-8')
            res.send(data)
        }())    
    } catch (error) {
        console.log(error)
    }


    

 
})

app.get('/productoRandom', (req, res) => {
    (async function(){
        try {
            const data = await fs.promises.readFile('./file.json', 'utf-8')
            const dataJSON = JSON.parse(data)
            console.log(dataJSON)
            const randomData = Math.floor(Math.random() * dataJSON.length)
            res.send(dataJSON[randomData])
           
        } catch (error) {
            console.log(error)
        }    
    }())
})

