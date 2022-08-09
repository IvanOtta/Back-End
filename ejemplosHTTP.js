const { urlencoded } = require('express');
const express = require('express');
const {Router} = express

const app = express();

const PORT = 8080
const router = Router()

console.log(router)



const server = app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${server.address().port}`)
})

app.use(express.json())
app.use(urlencoded( { extended: true } ))
app.use('/api/products', router)
app.use('/public', express.static(__dirname + '/public'))





// router.get('/api/letras/:num', (req,res) => {

// })

// router.get('/', (req,res) => {
//     const {query} = req

// })


let products = [
    {id:1, name: 'Coca Cola', price: 240},
    {id:2, name: 'Manaos', price: 160},
    {id:3, name: 'Sprite', price: 260}
]

// EJEMPLO
// localhost:3000/products?price=160&name=manaos
// La Query es a partir del '?'price=160

router.get('/', (req, res) => {
    const {query} = req;
    console.log(query)

    if(query.price){
        const prodFilter = products.filter(item => item.price == query.price)
        res.json(prodFilter)
    }else{
        res.json(products)
        
    }
})

// router.get('/:id', (req, res) => {

//     const {id} = req.params
//     console.log(id)


//     const found = products.find(item => item.id == id)

//     if(found){
//         res.json(found)
//     }else{
//         res.json({})
//     }
// })

// router.post('/', (req, res) => {
//     const {body} = req

//     body.id = 4


//     console.log(body)
//     res.json({success: 'ok', new: body})
// })

// router.put('/:id', (req, res) => {
//     const {id} = req.params;
//     const {body} = req;
    
//     const productToChange = products.find(x => x.id == id)
//     productToChange.price = body.price

//     res.json({success: 'OK', new: productToChange})
// })

// router.delete('/:id', (req, res) => {
    
//     const {id} = req.params
//     const filterById = products.filter(el => el.id != id)
//     console.log(filterById)

//     res.json({success: "Ok"})
// })