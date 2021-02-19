import axios from 'axios'

export default function getRestaurantData() {
  const promises = []

  for (let i = 0; i <= 10; i++) {
    const offset = i * 50
    const timeout = 500 * i
    promises.push(new Promise((resolve) => {
      setTimeout(() => {
        axios.get(`https://api.yelp.com/v3/businesses/search?term=bars,restaurants&location=london&locale=en_GB&sort_by=rating&limit=50&offset=${offset}`,
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
              phone: data.businesses[0].phone
            }
            resolve(restaurant)
          })
      }, timeout)
    }))
  }
  
  return Promise.all(promises)
}


