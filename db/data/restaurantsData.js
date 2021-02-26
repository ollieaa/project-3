import axios from 'axios'

export default function getRestaurantData(users) {

  const promises = []
  const foodArray = [
    'dead',
    'chinese',
    'british',
    'indian',
    'italian',
    'steakhouses',
    'french',
    'mediterranean',
    'breakfast_brunch',
    'cafes',
    'seafood',
    'burgers',
    'vegan',
    'thai',
    'dimsum',
    'mexican',
    'noodles',
    'pizza',
    'american',
    'persian',
    'turkish'
  ]
  const drinkArray = [
    'dead',
    'cocktail',
    'coffee',
    'tea',
    'wine',
    'pubs',
    'cafes',
    'bars'
  ]


  for (let i = 1; i <= 2; i++) {
    const offset = i + 1

    for (let i = 1; i <= foodArray.length - 1; i++) {
      const timeout = (2000 * i) + 2000
      
      console.log(foodArray[i])

      promises.push(new Promise((resolve) => {

        setTimeout(() => {
          axios.get(`https://api.yelp.com/v3/businesses/search?term=restaurants,${foodArray[i]}&location=london&locale=en_GB&sort_by=rating&limit=50&offset=${offset}`,
            { headers: { Authorization: `Bearer ${process.env.APIKEY}` } })
            .then(({ data }) => {

              const restaurant = {
                name: data.businesses[0].name,
                category: data.businesses[0].categories.map(catObj => catObj.title),
                image: data.businesses[0].image_url,
                link: data.businesses[0].url,
                price: data.businesses[0].price,
                lat: data.businesses[0].coordinates.latitude,
                long: data.businesses[0].coordinates.longitude,
                city: data.businesses[0].location.city,
                address1: data.businesses[0].location.address1,
                address2: data.businesses[0].location.address2,
                zipcode: data.businesses[0].location.zip_code,
                country: data.businesses[0].location.country,
                phone: data.businesses[0].phone,
                creator: users[0]
              }
              resolve(restaurant)
            })
        }, timeout)

      }))

    }

    for (let i = 1; i <= drinkArray.length - 1; i++) {
      const timeout = (2000 * i) + 2000

      console.log(drinkArray[i])

      promises.push(new Promise((resolve) => {

        setTimeout(() => {
          axios.get(`https://api.yelp.com/v3/businesses/search?term=drinks,${drinkArray[i]}&location=london&locale=en_GB&sort_by=rating&limit=50&offset=${offset}`,
            { headers: { Authorization: `Bearer ${process.env.APIKEY}` } })
            .then(({ data }) => {

              const restaurant = {
                name: data.businesses[0].name,
                category: data.businesses[0].categories.map(catObj => catObj.title),
                image: data.businesses[0].image_url,
                link: data.businesses[0].url,
                price: data.businesses[0].price,
                lat: data.businesses[0].coordinates.latitude,
                long: data.businesses[0].coordinates.longitude,
                location: data.businesses[0].location.city,
                address: data.businesses[0].location.display_address,
                phone: data.businesses[0].phone,
                creator: users[0]
              }
              resolve(restaurant)
            })
        }, timeout)

      }))

    }

  

  }
  return Promise.all(promises)

}

