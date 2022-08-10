const e = require('express');
const express = require('express')

const { urlencoded, json } = require('express')

const app = express()

const {Router} = express

const router = Router();

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${server.address().port}`)    
})

server.on('error', (error) => console.log(`Error en el servidor ${error}`))

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use('/public', express.static( __dirname + '/public'))
app.use('/api/products', router)

const productsArg = [
    { id: 1, title: 'Camiseta Argentina Qatar 2022', price: 18000, thumbnail: 'http://localhost:8080/public/camiseta-adidas-argentina-2022-3.jpg'  },
    { id: 2, title: 'Pelota Qatar 2022', price: 45000 , thumbnail: 'http://localhost:8080/public/pelota-qatar-2022-adidas-al-rihla-league-box-replica-numero-5-blanca-100040h57782001-1.jpg'  },
    { id: 3, title: 'Botines adidas Lionel Messi x Speedflow', price: 19000 , thumbnail: 'http://localhost:8080/public/messi-botines-2022-adidas-x-speedflow-mi-historia-nm.jpg'  }
]



class Products{
    constructor(products){
        this.products = [...products]
    }

    getAll(){
        return this.products
    }

    findById(id){
        return this.products.find(prod => prod.id == id) 
    }

    addNewProduct(prod){
        const lastProd = this.products[this.products.length - 1]
        let lastId = 1;
            if(lastProd){
                lastId = lastProd.id + 1
            }
            prod.id = lastId
            this.products.push(prod)
            return this.products[this.products.length - 1]
    }

    updateProd(id, product){
        const newProd = {...product, id}
        for(let i = 0; i < this.products.length; i++){
            this.products[i] = newProd;
            return newProd
        }
        return undefined
    }

    deleteProd(id){
        const findProd = this.findById(id)
        if(findProd){
            this.products = this.products.filter(el => el.id != id)
            return id
        }
        return undefined
    }
    
    
}

router.get('/', (req, res) => {
    const products = new Products(productsArg)
    res.json(products.getAll())
})

router.get('/:id', (req, res) => {

    let {id} = req.params
    console.log(id)
    const products = new Products(productsArg)
    
    const found = products.findById(id)
    if(found){
        res.json(found)
    }else{
        res.json({error: "producto no existente"})
    }
});

router.post('/', (req, res) => {
    const { body } = req;
    console.log(body)
    body.price = parseFloat(body.price)

    const products = new Products(productsArg)
    const newProduct = products.addNewProduct(body)
    if(newProduct){
        res.json({status: "OK", ...productsArg, new: newProduct})
    }else{
        res.json({error: 'Error, no se pudo crear nuevo producto'})
    }

})

router.put('/:id', (req, res) => {
    let {id} = req.params;
    const {body} = req;
    id = parseInt(id)
    const products = new Products(productsArg)
    const updatedProduct = products.updateProd(id, body)

    if(updatedProduct){
        res.json({status: 'ok', new: updatedProduct})
    }else{
        res.json({error: 'no se encontro el producto'})
    }

})

app.get('/form', (req,res) => {
    res.sendFile(__dirname + '/index.html')
});

router.delete('/:id', (req, res) => {
    let {id} = req.params;
    const products = new Products(productsArg)
    id = parseInt(id)

    
    const prodDeleted = products.deleteProd(id)
    if(prodDeleted){
        res.json({status: 'Ok', id})
    }else{
        res.json({error: 'el producto no fue encontrado'})
    }
    console.log(products.getAll())
})