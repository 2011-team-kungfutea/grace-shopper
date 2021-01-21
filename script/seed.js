'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')
const Order_Detail = require('../server/db/models/order-detail')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      isAdministrator: true
    }),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)

  const products = await Promise.all([
    Product.create({name: 'Tofu', price: 2000000, quantity: 1}),
    Product.create({
      name: 'Edamame',
      price: 2,
      quantity: 47,
      imageUrl:
        'https://i.pinimg.com/originals/48/ff/49/48ff49ec8efcd32837cde9b177b5d6ca.jpg'
    }),
    Product.create({
      name: 'Peadar',
      price: 22867461,
      quantity: 92,
      imageUrl:
        'https://i.pinimg.com/originals/ab/60/1b/ab601b463643d39d2546261e280168b8.jpg'
    }),
    Product.create({
      name: 'Lesli',
      price: 73719277,
      quantity: 66,
      imageUrl:
        'https://i.pinimg.com/736x/67/fd/bb/67fdbbf7755a39f875ff7adaa51a57c0.jpg'
    }),
    Product.create({
      name: 'Becky',
      price: 683292,
      quantity: 14,
      imageUrl:
        'https://i.pinimg.com/originals/fc/a3/49/fca349944fe6daa3ddaa80ac6cce5065.jpg'
    }),
    Product.create({name: 'Frederigo', price: 70135632, quantity: 17}),
    Product.create({name: 'Christie', price: 9876393, quantity: 25}),
    Product.create({name: 'Natty', price: 67346099, quantity: 24}),
    Product.create({name: 'Ddene', price: 25580664, quantity: 31})
    // Product.create({name: 'Zacherie', price: 65009427, quantity: 14}),
    // Product.create({name: 'Melloney', price: 64433331, quantity: 14}),
    // Product.create({name: 'Mitchell', price: 295374, quantity: 69}),
    // Product.create({name: 'Netti', price: 32102514, quantity: 63}),
    // Product.create({name: 'Tamqrah', price: 30517859, quantity: 45}),
    // Product.create({name: 'Gayle', price: 71842008, quantity: 28}),
    // Product.create({name: 'Lon', price: 98562476, quantity: 80}),
    // Product.create({name: 'Chere', price: 8952708, quantity: 75}),
    // Product.create({name: 'Jedd', price: 85539773, quantity: 76}),
    // Product.create({name: 'Killie', price: 14492332, quantity: 89}),
    // Product.create({name: 'Virgil', price: 7425416, quantity: 97}),
    // Product.create({name: 'Miller', price: 88366482, quantity: 72}),
    // Product.create({name: 'Elsy', price: 11211392, quantity: 14}),
    // Product.create({name: 'Bobette', price: 72226303, quantity: 7}),
    // Product.create({name: 'Wendie', price: 37260243, quantity: 58}),
    // Product.create({name: 'Xavier', price: 46219059, quantity: 73}),
    // Product.create({name: 'Feliza', price: 39192115, quantity: 71}),
    // Product.create({name: 'Perla', price: 63727394, quantity: 55}),
    // Product.create({name: 'Terrell', price: 56361249, quantity: 40}),
    // Product.create({name: 'Mela', price: 24204857, quantity: 10}),
    // Product.create({name: 'Noemi', price: 98636118, quantity: 77}),
    // Product.create({name: 'Ingaborg', price: 13504246, quantity: 100}),
    // Product.create({name: 'Willi', price: 91717272, quantity: 20}),
    // Product.create({name: 'Brok', price: 23758717, quantity: 96}),
    // Product.create({name: 'Ronalda', price: 60818581, quantity: 11}),
    // Product.create({name: 'Gottfried', price: 8329045, quantity: 93}),
    // Product.create({name: 'Mariette', price: 75840986, quantity: 39}),
    // Product.create({name: 'Mady', price: 22347087, quantity: 73}),
    // Product.create({name: 'Jefferey', price: 5592816, quantity: 82}),
    // Product.create({name: 'Jodie', price: 4901189, quantity: 40}),
    // Product.create({name: 'Buckie', price: 57864607, quantity: 34}),
    // Product.create({name: 'Ciro', price: 83639015, quantity: 69}),
    // Product.create({name: 'Giraud', price: 32708997, quantity: 47}),
    // Product.create({name: 'Teena', price: 11869716, quantity: 96}),
    // Product.create({name: 'Kylie', price: 18949066, quantity: 45}),
    // Product.create({name: 'Daloris', price: 4494985, quantity: 81}),
    // Product.create({name: 'Alys', price: 75127728, quantity: 1}),
    // Product.create({name: 'Aurora', price: 70521673, quantity: 85}),
    // Product.create({name: 'Henrie', price: 29974678, quantity: 46}),
    // Product.create({name: 'Barb', price: 7799559, quantity: 9}),
    // Product.create({name: 'Willdon', price: 81817227, quantity: 99}),
    // Product.create({name: 'Chrisse', price: 33867887, quantity: 62}),
    // Product.create({name: 'Matthaeus', price: 72843389, quantity: 1}),
    // Product.create({name: 'Carine', price: 74034685, quantity: 57}),
    // Product.create({name: 'Hall', price: 72024375, quantity: 27}),
    // Product.create({name: 'Maible', price: 96160234, quantity: 57}),
    // Product.create({name: 'Alasteir', price: 40128496, quantity: 22}),
    // Product.create({name: 'Torrie', price: 53497618, quantity: 63}),
    // Product.create({name: 'Rycca', price: 43935085, quantity: 74}),
    // Product.create({name: 'Brandy', price: 30582569, quantity: 83}),
    // Product.create({name: 'Jacquelin', price: 59242506, quantity: 26}),
    // Product.create({name: 'Doralynne', price: 64689326, quantity: 82}),
    // Product.create({name: 'Lowell', price: 36939282, quantity: 64}),
    // Product.create({name: 'Urson', price: 69528166, quantity: 59}),
    // Product.create({name: 'Auberta', price: 7439377, quantity: 92}),
    // Product.create({name: 'Cullen', price: 1260313, quantity: 69}),
    // Product.create({name: 'Alli', price: 2846068, quantity: 86}),
    // Product.create({name: 'Genna', price: 2663207, quantity: 80}),
    // Product.create({name: 'Alano', price: 743749, quantity: 75}),
    // Product.create({name: 'Jourdan', price: 39761864, quantity: 83}),
    // Product.create({name: 'Baillie', price: 83680997, quantity: 15}),
    // Product.create({name: 'Jeanine', price: 70126527, quantity: 38}),
    // Product.create({name: 'Agna', price: 92706019, quantity: 75}),
    // Product.create({name: 'Boote', price: 93182119, quantity: 47}),
    // Product.create({name: 'Abra', price: 14846742, quantity: 98}),
    // Product.create({name: 'Yule', price: 697349, quantity: 32}),
    // Product.create({name: 'Camila', price: 56486471, quantity: 78}),
    // Product.create({name: 'Joycelin', price: 43639571, quantity: 75}),
    // Product.create({name: 'Freeland', price: 91270894, quantity: 68}),
    // Product.create({name: 'Ediva', price: 30355453, quantity: 68}),
    // Product.create({name: 'Corty', price: 75484366, quantity: 76}),
    // Product.create({name: 'Wrennie', price: 73795048, quantity: 51}),
    // Product.create({name: 'Silvie', price: 70400648, quantity: 16}),
    // Product.create({name: 'Adelbert', price: 12386641, quantity: 21}),
    // Product.create({name: 'Guthrey', price: 90992592, quantity: 93}),
    // Product.create({name: 'Jsandye', price: 6992355851, quantity: 96}),
    // Product.create({name: 'Freddy', price: 7439088, quantity: 28}),
    // Product.create({name: 'Hersh', price: 9251749, quantity: 88}),
    // Product.create({name: 'Hillyer', price: 47720663, quantity: 12}),
    // Product.create({name: 'Lethia', price: 19533497, quantity: 98}),
    // Product.create({name: 'Dede', price: 7611322, quantity: 19}),
    // Product.create({name: 'Kesley', price: 37148634, quantity: 88}),
    // Product.create({name: 'Des', price: 67638047, quantity: 90}),
    // Product.create({name: 'Albertina', price: 3788800, quantity: 91}),
    // Product.create({name: 'Mariska', price: 9281539, quantity: 7}),
    // Product.create({name: 'Elnora', price: 52645685, quantity: 69}),
    // Product.create({name: 'Samuel', price: 3422646305, quantity: 83}),
    // Product.create({name: 'Francoise', price: 4968768, quantity: 23}),
    // Product.create({name: 'Clayton', price: 6181735, quantity: 14}),
    // Product.create({name: 'Hyacinthie', price: 68859819, quantity: 63}),
    // Product.create({name: 'Deana', price: 67896205, quantity: 40}),
    // Product.create({name: 'Horton', price: 49307913, quantity: 62})
  ])

  console.log(`seeded ${products.length} products`)

  const orders = await Promise.all([
    Order.create({userId: users[0].id}),
    Order.create({isOrdered: true})
  ])

  console.log(`seeded ${orders.length} orders`)

  const orderDetails = await Promise.all([
    Order_Detail.create({
      productId: products[0].id,
      orderId: orders[0].id,
      quantity: 1,
      price: products[0].price
    }),
    Order_Detail.create({
      productId: products[1].id,
      orderId: orders[1].id,
      quantity: 1,
      price: products[1].price
    }),
    Order_Detail.create({
      productId: products[1].id,
      orderId: orders[0].id,
      quantity: 1,
      price: products[1].price
    })
  ])

  console.log(`seeded ${orderDetails.length} order-details`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
