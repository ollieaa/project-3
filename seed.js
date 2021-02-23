import mongoose from 'mongoose'
import connectToDb from './lib/connectToDb.js'
import dotenv from 'dotenv'
dotenv.config()
// * Models
import User from './models/user.js'
import MeetUp from './models/meetUps.js'
import Restaurant from './models/restaurants.js'
import Poi from './models/poi.js'
import Group from './models/groups.js'
// * Data Files
import getUserData from './db/data/userData.js'
import getMeetUpData from './db/data/meetUpData.js'
//import getHardRestData from './db/data/hardRestData.js'
import getRestaurantData from './db/data/restaurantsData.js'
import getPoiData from './db/data/poiData.js'
import getGroupData from './db/data/groupData.js'
async function seedDatabase() {
  try {
    await connectToDb()
    console.log(':white_check_mark: Database connected!')
    await mongoose.connection.db.dropDatabase()
    console.log(':dizzy_face: Database was dropped!')
    //* User data
    const users = await User.create(getUserData())
    console.log(`:woman-raising-hand: ${users.length} users created!`)
    // * Restaurant Data
    const newRestaurantData = await getRestaurantData(users)
    // const restaurants = await Restaurant.create(getRestaurantData())
    const restaurants = await Restaurant.create(newRestaurantData)
    console.log(`:knife_fork_plate: ${restaurants.length} restaurants created!`)
    console.log(restaurants)
    // * POI Data
    const poi = await Poi.create(getPoiData(users))
    console.log(`:european_castle: ${poi.length} points of interest created!`)
    // * Meet-up Data
    const meetUps = await MeetUp.create(getMeetUpData(users, poi, restaurants))
    console.log(`:handshake: ${meetUps.length} meet-ups created!`)
    // * Group Data
    const groups = await Group.create(getGroupData(users, meetUps))
    console.log(`:woman-with-bunny-ears-partying: ${groups.length} groups created!`)
    await mongoose.connection.close()
    console.log(':wave: Goodbye!')
  } catch (err) {
    console.log(':see_no_evil: Something went wrong with seeding!')
    console.log(err)
    await mongoose.connection.close()
    console.log(':wave: Goodbye!')
  }
}
seedDatabase()
// import mongoose from 'mongoose'
// import connectToDb from './lib/connectToDb.js'
// import dotenv from 'dotenv'
// dotenv.config()

// // * Models
// import User from './models/user.js'
// import MeetUp from './models/meetUps.js'
// import Restaurant from './models/restaurants.js'
// import Poi from './models/poi.js'
// import Group from './models/groups.js'


// // * Data Files
// import getUserData from './db/data/userData.js'
// import getMeetUpData from './db/data/meetUpData.js'
// //import getHardRestData from './db/data/hardRestData.js'
// import getRestaurantData from './db/data/restaurantsData.js'
// import getPoiData from './db/data/poiData.js'
// import getGroupData from './db/data/groupData.js'


// async function seedDatabase() {
//   try {
//     await connectToDb()

//     console.log('✅ Database connected!')

//     await mongoose.connection.db.dropDatabase()

//     console.log('😵 Database was dropped!')

//     //* User data

//     const users = await User.create(getUserData())

//     console.log(`🙋‍♀️ ${users.length} users created!`)

//     // * Restaurant Data

//     const newRestaurantData = await getRestaurantData(users)

//     // const restaurants = await Restaurant.create(getRestaurantData())

//     const restaurants = await Restaurant.create(newRestaurantData)

//     console.log(`🍽 ${restaurants.length} restaurants created!`)
//     console.log(restaurants)
//     // * POI Data

//     const poi = await Poi.create(getPoiData(users))

//     console.log(`🏰 ${poi.length} points of interest created!`)

//     // * Meet-up Data

//     const meetUps = await MeetUp.create(getMeetUpData(users, poi, restaurants))

//     console.log(`🤝 ${meetUps.length} meet-ups created!`)

//     // * Group Data

//     const groups = await Group.create(getGroupData(users, meetUps))

//     console.log(`👯‍♀️ ${groups.length} groups created!`)

//     await mongoose.connection.close()
//     console.log('👋 Goodbye!')

//   } catch (err) {
//     console.log('🙈 Something went wrong with seeding!')
//     console.log(err)

//     await mongoose.connection.close()
//     console.log('👋 Goodbye!')
//   }

// }


// seedDatabase()