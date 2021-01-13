'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')
const Order_Detail = require('../server/db/models/order-detail')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)

  const products = await Promise.all([
    Product.create({name: 'Tofu', price: 2000000.27, quantity: 1}),
    Product.create({
      name: 'Edamame',
      price: 0.01,
      quantity: 47,
      imageUrl:
        'https://i.pinimg.com/originals/48/ff/49/48ff49ec8efcd32837cde9b177b5d6ca.jpg'
    }),
    Product.create({
      name: 'Peadar',
      price: 22867461.24,
      quantity: 92,
      imageUrl:
        'https://i.pinimg.com/originals/ab/60/1b/ab601b463643d39d2546261e280168b8.jpg'
    }),
    Product.create({
      name: 'Lesli',
      price: 73719277.27,
      quantity: 66,
      imageUrl:
        'https://i.pinimg.com/736x/67/fd/bb/67fdbbf7755a39f875ff7adaa51a57c0.jpg'
    }),
    Product.create({
      name: 'Becky',
      price: 683292.63,
      quantity: 14,
      imageUrl:
        'https://i.pinimg.com/originals/fc/a3/49/fca349944fe6daa3ddaa80ac6cce5065.jpg'
    })
    // Product.create({name: 'Frederigo', price: 70135632.13, quantity: 17}),
    // Product.create({name: 'Christie', price: 98763936.04, quantity: 25}),
    // Product.create({name: 'Natty', price: 67346099.64, quantity: 24}),
    // Product.create({name: 'Ddene', price: 25584206.64, quantity: 31}),
    // Product.create({name: 'Zacherie', price: 65096094.27, quantity: 14}),
    // Product.create({name: 'Melloney', price: 64430233.31, quantity: 14}),
    // Product.create({name: 'Mitchell', price: 295063.74, quantity: 69}),
    // Product.create({name: 'Netti', price: 32102548.14, quantity: 63}),
    // Product.create({name: 'Tamqrah', price: 30521178.59, quantity: 45}),
    // Product.create({name: 'Gayle', price: 71842740.08, quantity: 28}),
    // Product.create({name: 'Lon', price: 98562474.06, quantity: 80}),
    // Product.create({name: 'Chere', price: 89527630.8, quantity: 75}),
    // Product.create({name: 'Jedd', price: 85539457.73, quantity: 76}),
    // Product.create({name: 'Killie', price: 14489923.32, quantity: 89}),
    // Product.create({name: 'Virgil', price: 7428354.16, quantity: 97}),
    // Product.create({name: 'Miller', price: 88366154.82, quantity: 72}),
    // Product.create({name: 'Elsy', price: 11211359.92, quantity: 14}),
    // Product.create({name: 'Bobette', price: 72227263.03, quantity: 7}),
    // Product.create({name: 'Wendie', price: 37260222.43, quantity: 58}),
    // Product.create({name: 'Xavier', price: 46219140.59, quantity: 73}),
    // Product.create({name: 'Feliza', price: 39190721.15, quantity: 71}),
    // Product.create({name: 'Perla', price: 63724373.94, quantity: 55}),
    // Product.create({name: 'Terrell', price: 56328612.49, quantity: 40}),
    // Product.create({name: 'Mela', price: 24202448.57, quantity: 10}),
    // Product.create({name: 'Noemi', price: 98636751.18, quantity: 77}),
    // Product.create({name: 'Ingaborg', price: 13504842.46, quantity: 100}),
    // Product.create({name: 'Willi', price: 91717212.72, quantity: 20}),
    // Product.create({name: 'Brok', price: 23751587.17, quantity: 96}),
    // Product.create({name: 'Ronalda', price: 60810485.81, quantity: 11}),
    // Product.create({name: 'Gottfried', price: 8329420.45, quantity: 93}),
    // Product.create({name: 'Mariette', price: 75842409.86, quantity: 39}),
    // Product.create({name: 'Mady', price: 22347090.87, quantity: 73}),
    // Product.create({name: 'Jefferey', price: 55941281.6, quantity: 82}),
    // Product.create({name: 'Jodie', price: 4901170.89, quantity: 40}),
    // Product.create({name: 'Buckie', price: 57863246.07, quantity: 34}),
    // Product.create({name: 'Ciro', price: 83639340.15, quantity: 69}),
    // Product.create({name: 'Giraud', price: 32704989.97, quantity: 47}),
    // Product.create({name: 'Teena', price: 11869737.16, quantity: 96}),
    // Product.create({name: 'Kylie', price: 18949000.66, quantity: 45}),
    // Product.create({name: 'Daloris', price: 4497849.85, quantity: 81}),
    // Product.create({name: 'Alys', price: 75127097.28, quantity: 1}),
    // Product.create({name: 'Aurora', price: 70522316.73, quantity: 85}),
    // Product.create({name: 'Henrie', price: 29979746.78, quantity: 46}),
    // Product.create({name: 'Barb', price: 7799512.59, quantity: 9}),
    // Product.create({name: 'Willdon', price: 81817992.27, quantity: 99}),
    // Product.create({name: 'Chrisse', price: 33867832.87, quantity: 62}),
    // Product.create({name: 'Matthaeus', price: 72845833.89, quantity: 1}),
    // Product.create({name: 'Carine', price: 74034926.85, quantity: 57}),
    // Product.create({name: 'Hall', price: 72024053.75, quantity: 27}),
    // Product.create({name: 'Maible', price: 96151602.34, quantity: 57}),
    // Product.create({name: 'Alasteir', price: 40121284.96, quantity: 22}),
    // Product.create({name: 'Torrie', price: 53497596.18, quantity: 63}),
    // Product.create({name: 'Rycca', price: 43935650.85, quantity: 74}),
    // Product.create({name: 'Brandy', price: 30580525.69, quantity: 83}),
    // Product.create({name: 'Jacquelin', price: 59352425.06, quantity: 26}),
    // Product.create({name: 'Doralynne', price: 64296893.26, quantity: 82}),
    // Product.create({name: 'Lowell', price: 36939322.82, quantity: 64}),
    // Product.create({name: 'Urson', price: 69528541.66, quantity: 59}),
    // Product.create({name: 'Auberta', price: 7439403.77, quantity: 92}),
    // Product.create({name: 'Cullen', price: 12680031.3, quantity: 69}),
    // Product.create({name: 'Alli', price: 2846025.68, quantity: 86}),
    // Product.create({name: 'Genna', price: 2663712.07, quantity: 80}),
    // Product.create({name: 'Alano', price: 743779.49, quantity: 75}),
    // Product.create({name: 'Jourdan', price: 39717618.64, quantity: 83}),
    // Product.create({name: 'Baillie', price: 83680069.97, quantity: 15}),
    // Product.create({name: 'Jeanine', price: 70126095.27, quantity: 38}),
    // Product.create({name: 'Agna', price: 92706800.19, quantity: 75}),
    // Product.create({name: 'Boote', price: 93183921.19, quantity: 47}),
    // Product.create({name: 'Abra', price: 14846887.42, quantity: 98}),
    // Product.create({name: 'Yule', price: 69734020.29, quantity: 32}),
    // Product.create({name: 'Camila', price: 56416864.71, quantity: 78}),
    // Product.create({name: 'Joycelin', price: 42136395.71, quantity: 75}),
    // Product.create({name: 'Freeland', price: 91277408.94, quantity: 68}),
    // Product.create({name: 'Ediva', price: 30355684.53, quantity: 68}),
    // Product.create({name: 'Corty', price: 75484293.66, quantity: 76}),
    // Product.create({name: 'Wrennie', price: 73791950.48, quantity: 51}),
    // Product.create({name: 'Silvie', price: 70400556.48, quantity: 16}),
    // Product.create({name: 'Adelbert', price: 12389666.41, quantity: 21}),
    // Product.create({name: 'Guthrey', price: 90992395.92, quantity: 93}),
    // Product.create({name: 'Jsandye', price: 69923558.51, quantity: 96}),
    // Product.create({name: 'Freddy', price: 7439088, quantity: 28}),
    // Product.create({name: 'Hersh', price: 9251749, quantity: 88}),
    // Product.create({name: 'Hillyer', price: 47756206.63, quantity: 12}),
    // Product.create({name: 'Lethia', price: 1953349.7, quantity: 98}),
    // Product.create({name: 'Dede', price: 76113602.2, quantity: 19}),
    // Product.create({name: 'Kesley', price: 37148966.34, quantity: 88}),
    // Product.create({name: 'Des', price: 67639380.47, quantity: 90}),
    // Product.create({name: 'Albertina', price: 3788800, quantity: 91}),
    // Product.create({name: 'Mariska', price: 92815390.35, quantity: 7}),
    // Product.create({name: 'Elnora', price: 52645684.25, quantity: 69}),
    // Product.create({name: 'Samuel', price: 34226463.05, quantity: 83}),
    // Product.create({name: 'Francoise', price: 49082267.68, quantity: 23}),
    // Product.create({name: 'Clayton', price: 61817978.35, quantity: 14}),
    // Product.create({name: 'Hyacinthie', price: 68841598.19, quantity: 63}),
    // Product.create({name: 'Deana', price: 67896962.05, quantity: 40}),
    // Product.create({name: 'Horton', price: 49307779.13, quantity: 62}),
  ])

  console.log(`seeded ${products.length} products`)

  const orders = await Promise.all([
    Order.create({}),
    Order.create({isOrdered: true})
  ])

  console.log(`seeded ${orders.length} orders`)

  const orderDetails = await Promise.all([
    Order_Detail.create({productId: products[0].id, orderId: orders[0].id}),
    Order_Detail.create({productId: products[1].id, orderId: orders[1].id})
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
