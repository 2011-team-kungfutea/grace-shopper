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
      firstName: 'Cody',
      lastName: 'Pug',
      address: '123 Imadog street, New York, NY 10034, USA',
      phoneNumber: '2672773204',
      isAdministrator: true
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Human',
      address: '5 Hanover Square 11th floor, New York, NY 10004',
      phoneNumber: '6469050991',
      isAdministrator: false
    }),
    User.create({
      email: 'dba@company.com',
      password: 'abc',
      firstName: 'Addison',
      lastName: 'Ministrator',
      address: '27 Badopsec drive, Lithuania',
      phoneNumber: '2128675309',
      isAdministrator: true
    }),
    User.create({
      email: 'missinglink@premail.com',
      password: '123',
      firstName: 'Eve',
      lastName: 'Mitochondria',
      address: 'East Africa Lane',
      phoneNumber: '0123456789',
      isAdministrator: false
    }),
    User.create({
      email: 'grimeyemerald@tesla.com',
      password: '123',
      firstName: 'Elon',
      lastName: 'Musk',
      address: '1 Mars street',
      phoneNumber: '6762393204',
      isAdministrator: false
    }),
    User.create({
      email: 'turingsucks@COBOL.com',
      password: '123',
      firstName: 'Grace',
      lastName: 'Hopper',
      address: 'Arlington National Cemetery Arlington, Section 59, Grave 973',
      phoneNumber: '8082474340',
      isAdministrator: false
    }),
    User.create({
      email: 'GWZoo@exotic.com',
      password: '123',
      firstName: 'Joeseph',
      lastName: 'Maldonado-Passage',
      address: '25803 N County Road 3250, Wynnewood, OK 73098, USA',
      phoneNumber: '2272393204',
      isAdministrator: false
    })
  ])

  console.log(`seeded ${users.length} users`)

  const products = await Promise.all([
    Product.create({
      name: 'Tofu',
      price: 2000000,
      quantity: 1,
      description: 'Our mascot and inspiration'
    }),
    Product.create({
      name: 'Edamame',
      price: 2,
      quantity: 47,
      imageUrl: '/images/48ff49ec8efcd32837cde9b177b5d6ca.jpg',
      description:
        'Some people say these cute little guys are a dime a dozen, but actually it works out to more like 24 cents for a dozen.'
    }),
    Product.create({
      name: 'Peadar',
      price: 22867461,
      quantity: 92,
      imageUrl: '/images/ab601b463643d39d2546261e280168b8.jpg',
      description: `Seems to have an uncanny radar for peas, we're guessing, based on the name. From a planet where looking like a wise koala lion is a plus.`
    }),
    Product.create({
      name: 'Lesli',
      price: 73719277,
      quantity: 66,
      imageUrl:
        'https://i.pinimg.com/736x/67/fd/bb/67fdbbf7755a39f875ff7adaa51a57c0.jpg',
      description:
        'A cuddly addition to any home. Note, diet consists of only diamonds.'
    }),
    Product.create({
      name: 'Becky',
      price: 683292,
      quantity: 14,
      imageUrl:
        'https://i.pinimg.com/originals/fc/a3/49/fca349944fe6daa3ddaa80ac6cce5065.jpg',
      description: 'Don’t touch the things on her back.'
    }),
    Product.create({
      name: 'Frederigo',
      price: 70135632,
      quantity: 17,
      imageUrl: '/images/il_794xN.1177821522_93of.jpg',
      description:
        'You won’t find a cheaper fluffy navy blue penguin monster anywhere! We guarantee it!* (*we do not guarantee anything, no refunds)'
    }),
    Product.create({
      name: 'Bobette',
      price: 9876393,
      quantity: 25,
      imageUrl: '/images/d7vsqzo-a61e250a-fd35-4faf-8f48-86bc31703e17.jpg',
      description: 'Like a Bob but smaller.'
    }),
    Product.create({
      name: 'Natty',
      price: 67346099,
      quantity: 24,
      imageUrl: '/images/kris-turvey-sidekick-final-01.jpg',
      description: `Maybe if you get this your friends will finally think you're cool. `
    }),
    Product.create({
      name: 'Dumplin',
      price: 25580664,
      quantity: 31,
      imageUrl: '/images/Screen_shot_2012-06-25_at_7.07.04_PM.png',
      description:
        'Edamame’s emo cousin. Try saying no to that face. We haven’t been able to, starting to think mind control is common on his home planet.'
    }),
    Product.create({
      name: 'Georgrie',
      price: 65009427,
      quantity: 14,
      imageUrl: '/images/jia-hao-2014-08-up.jpg',
      description:
        'His favorite thing to do is hang out on your shoulder :) and specifically attach his drilling mouth piece onto your skull case and extract and control your mind. Ah, so adorable.'
    }),
    Product.create({
      name: 'Killie',
      price: 14492332,
      quantity: 89,
      imageUrl: '/images/wugu_final_5___terrorizer_by_twodd-d6e7kd6.jpg',
      description: `Don’t let his appearance or name fool you! He's actually a savage killing machine.`
    }),
    Product.create({
      name: 'Melloney',
      price: 64433331,
      quantity: 14,
      imageUrl: '/images/db4xws8-66a4522c-2055-4277-9d2f-c052deca168e.jpg',
      description:
        'Everyone needs a tiny blue deer from a different planet who only seems to gain sustenance from constantly incessantly staring at you!'
    }),
    Product.create({
      name: 'Mitchell',
      price: 295374,
      quantity: 69,
      imageUrl: '/images/il_794xN.1384740934_rcof.jpg',
      description: 'Does not play well with others.'
    }),
    Product.create({
      name: 'Lawrence',
      price: 32102514,
      quantity: 63,
      imageUrl: '/images/horizontal.jpeg',
      description:
        'Definitinely an alien. Also, not a cat. From one of those non-earth planets.'
    }),
    Product.create({
      name: 'Tamqrah',
      price: 30517859,
      quantity: 45,
      imageUrl: '/images/8-59533c9b56a16__700.jpg',
      description: `If you can solve his riddle you can touch that cool lil marble he's holding. We assume, we’ve been too scared to answer.`
    }),
    Product.create({
      name: 'Gayle',
      price: 71842008,
      quantity: 28,
      imageUrl: '/images/il_1588xN.1754692340_iwae.jpg',
      description:
        'Noble and fearless, but with a bad habit of flying into glass windows.'
    }),
    Product.create({
      name: 'Lon',
      price: 98562476,
      quantity: 80,
      imageUrl: '/images/d879nsw-b3cebf18-6353-4668-bf3a-efa195f2c64e.jpg',
      description:
        'Haven’t figured out what these ones eat yet, hopefully not humans!'
    }),
    Product.create({
      name: 'Chere',
      price: 8952708,
      quantity: 75,
      imageUrl: '/images/sexiedamame.png',
      description:
        'From Edamame’s home planet, may turn some people and animals into stone with a glance.'
    }),
    Product.create({
      name: 'Jedd',
      price: 85539773,
      quantity: 76,
      imageUrl: '/images/il_794xN.2141834527_itaw.jpg',
      description:
        'Some say Jedd is here on a quest, some say that quest is to fight our population of earth squirrels and eventually take over the world. But I wouldn’t worry about it.'
    }),
    Product.create({
      name: 'Virgil',
      price: 7425416,
      quantity: 97,
      imageUrl: '/images/4f45511b75036480d575192353b2e3bd.jpg',
      description: 'Maybe he can swim! Try chucking this one in a lake!'
    }),
    Product.create({
      name: 'Miller',
      price: 88366482,
      quantity: 72,
      imageUrl: '/images/a60a218dcbe53539958ca065fb1cc2ec.jpg',
      description: 'Foot diapers sold separately.'
    }),
    Product.create({
      name: 'Elsy',
      price: 11211392,
      quantity: 14,
      imageUrl: '/images/9182788843e6fda638d525a7af726b6e.jpg',
      description:
        'We looked away for one second and Tofu mated with an owl and now we have this fun new guy!'
    }),
    Product.create({
      name: 'Nooj',
      price: 72226303,
      quantity: 7,
      imageUrl: '/images/5ca5936cdbe741530a9345889eb8b242.jpg',
      description:
        'The first time we brought home a nooj something strange happened, the spaceship seemed to enter a rainbow flashing dimension. Time was flowing in all directions, we both were there and had never existed. A voice played in our heads, ‘you’ve created a great disturbance moving me from my planet, until I return this universe will be cursed’. Weird times, anyway we’ve since stocked up on these cute lil guys, buy yours while they’re in stock!'
    }),
    Product.create({
      name: 'Wendie',
      price: 37260243,
      quantity: 58,
      imageUrl: '/images/C4I3k0-WEAEAZbG.jpeg',
      description: 'The ultimate cuddle bug  :)'
    }),
    Product.create({
      name: 'Xavier',
      price: 46219059,
      quantity: 73,
      imageUrl: '/images/e5e77675957d3237124f33e8d46d5995.jpg',
      description: `We're pretty sure the pink thing on the front isn’t the genitals`
    }),
    Product.create({
      name: 'Feliza',
      price: 39192115,
      quantity: 71,
      imageUrl: '/images/854fcd399aeeb27ac8e39169fe581d48.jpg',
      description: 'See if you can guess how many nipples it has.'
    }),
    Product.create({
      name: 'Perla',
      price: 63727394,
      quantity: 55,
      imageUrl: '/images/il_794xN.1204881944_hkcw.jpg',
      description: 'A cool space rat that we tie dyed!'
    }),
    Product.create({
      name: 'Terrell',
      price: 56361249,
      quantity: 40,
      imageUrl: '/images/il_794xN.2208292211_bpnn.jpg',
      description: 'Yes those little hands can open doors and pick locks!'
    }),
    Product.create({
      name: 'Mela',
      price: 24204857,
      quantity: 10,
      imageUrl: '/images/il_794xN.2247545282_bj92.jpg',
      description:
        'Must be bought as a group! Or we’re pretty sure this is a group of separate beings.'
    }),
    Product.create({
      name: 'Noemi',
      price: 98636118,
      quantity: 77,
      imageUrl: '/images/d24c5eba8f19c2a453b1314163e507ef.jpg',
      description:
        'Can one really own the concept of space time? Is it ethical to attempt to ‘own’ a being who’s sentience is something our tiny minds would snap in half if we attempted to ‘know’ . Yes one can, sure why not, and it only costs $986361.18!'
    }),
    Product.create({
      name: 'Ingaborg',
      price: 13504246,
      quantity: 100,
      imageUrl: '/images/plantalien.png',
      description:
        'For the more introverted galactic pet owner, this one doesn’t move… much.'
    }),
    Product.create({
      name: 'Willi',
      price: 91717272,
      quantity: 20,
      imageUrl: '/images/tumblr_nys33tdXy31tygc5po2_1280.jpg',
      description:
        'Likes to just rub his butt all over whatever book you’re trying to read.'
    })
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
