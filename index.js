const express = require('express')
const { urlencoded } = require('express');

const app = express()

const {Router} = express

const router = Router()

const PORT = 3000;

const server = app.listen(PORT, () => {
    console.log(`Server running in PORT ${server.address().port}`)
})

server.on =('error',(error) => console.log(error) )

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use('/public',express.static( __dirname + '/public' ))
app.use('/api/practiceMode', router)


const productos = [
    {id: 1, name: 'coca cola', price: 280},
    {id: 2, name: 'fanta', price: 240},
    {id: 3, name: 'manaos', price: 170},
    {id: 4, name: 'pepsi', price: 260}
]


router.get('/', (req, res) => {
    res.json(productos)
})

router.get('/pedido', (req, res) => {
    const {query} = req
    console.log(query)
    if(query.name){
        const prodFiltrado = productos.filter(el => el.name == query.name)
        console.log(prodFiltrado)
        res.json(prodFiltrado)
    }else{
        res.json(productos)

    }
})
