const router = require('express').Router()
const {
    getCollection,
    ObjectId
} = require('../../../dbconnect')

// const menu = [
//     {id: 1, name: 'Taco'},
//     {id: 2, name: 'Burrito'},
//     {id: 3, name: 'Taco Salad'},
//     {id: 4, name: 'Enchiladas'},
//     {id: 5, name: 'Tortas'}
// ]

let collection = null 
const getMenu = async () => {
    if (!collection) collection = await getCollection('FoodTruck', 'Menu')
    return collection
}

router.get('/byId/:id', async (request, response) => {
    const { id } = request.params
    const collection = await getMenu()
    const found = await collection.findOne({ _id: new ObjectId(id) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find menu item with id: ${id}` }})
})


router.get('/random', async (_, response) => {
  const collection = await getMenu()
  const count = await collection.countDocuments()  
  const number = Math.floor(Math.random() * count) + 1 
  const found = await collection.findOne({ "number" : parseInt(number)})
  if (found) response.send(found)
  else response.send({error: {message: `Could not find menu item with that number: ${number}`}})
})

router.post('/add', async (request, response) => {
    const { number, name } = request.body
    const collection = await getMenu()
    const {acknowledged, insertedId} = await collection.insertOne({number, name})
    response.send({acknowledged, insertedId})
})

router.get('/:number', async (request, response) => {
    const {number} = request.params
    const collection = await getMenu()
    const found = await collection.findOne({ "number" : parseInt(number)})
    if (found) response.send(found)
    else response.send({error: {message: `Could not find menu item with that number: ${number}`}})
})

module.exports = router