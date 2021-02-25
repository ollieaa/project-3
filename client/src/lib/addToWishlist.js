import axios from 'axios'
import {getLoggedInUserId} from '../lib/auth.js'

const [loggedInUser, updateLoggedInUser] = useState([])


//CALL This whe YOU FIRST LOAD PAGE
async function getLoggedInUser() {
  const userId = getLoggedInUserId()
  const {data} = await axios.get(`/api/user/${userId}`)
  updateLoggedInUser(data)
}


//CALL THIS ON BUTTON CLICK
async function handleWishlistAdd() {
  const newWishlist = loggedInUser.restaurantWishlist.concat(restaurantId)
  await axios.put(`/api/user/${userId}`, {restaurantWishlist: newWishlist}, {
    headers: { Authorization: `Bearer ${token}` }
  })
}


//add this to your guard to only show button if they havent already saved it
{!loggedInUser.restaurantWishlist.includes(restaurantId) && <button>blahblahblah</button>}