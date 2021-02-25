import axios from 'axios'

export default function getMeetUpData(users, poi, restaurants) {
  return [
    {
      name: "Evening to spare in London.",
      location: "london",
      date: new Date("2021-02-26"),
      time: "18:00",
      description: "I will be in London for a conference next Saturday, would be nice to share the rest of the evening with someone over a glass of wine.",
      tags: ["restaurants"],
      restaurantSuggestions: restaurants[0]._id,
      isActive: true,
      creator: users[0]._id,
      image: "https://assets.gqindia.com/photos/5df9b7df2538cf000881f3a3/master/pass/7-ways-to-make-a-first-date-go-right.jpg"
    },
    {
      name: "Evening to spare in London",
      location: "london",
      date: new Date("2021-02-26"),
      time: "18:00",
      description: "I will be in London for a conference next Saturday, would be nice to share the rest of the evening with someone over a glass of wine.",
      tags: ["restaurants"],
      restaurantSuggestions: [restaurants[0]._id],
      isActive: true,
      creator: users[0]._id,
      image: "https://assets.gqindia.com/photos/5df9b7df2538cf000881f3a3/master/pass/7-ways-to-make-a-first-date-go-right.jpg"
    },
    {
      name: "Evening to spare in London",
      location: "london",
      date: new Date("2021-02-26"),
      time: "18:00",
      description: "I will be in London for a conference next Saturday, would be nice to share the rest of the evening with someone over a glass of wine.",
      tags: ["restaurants"],
      restaurantSuggestions: [restaurants[0]._id],
      isActive: true,
      creator: users[0]._id,
      image: "https://assets.gqindia.com/photos/5df9b7df2538cf000881f3a3/master/pass/7-ways-to-make-a-first-date-go-right.jpg"
    },
    {
      name: "Evening to spare in London",
      location: "london",
      date: new Date("2021-02-26"),
      time: "18:00",
      description: "I will be in London for a conference next Saturday, would be nice to share the rest of the evening with someone over a glass of wine.",
      tags: ["restaurants"],
      restaurantSuggestions: [restaurants[0]._id],
      isActive: true,
      creator: users[0]._id,
      image: "vhttps://assets.gqindia.com/photos/5df9b7df2538cf000881f3a3/master/pass/7-ways-to-make-a-first-date-go-right.jpg"
    },
    {
      name: "Evening to spare in London",
      location: "london",
      date: new Date("2021-02-26"),
      time: "18:00",
      description: "I will be in London for a conference next Saturday, would be nice to share the rest of the evening with someone over a glass of wine.",
      tags: ["culture", "restaurants"],
      restaurantSuggestions: [restaurants[0]._id],
      isActive: true,
      creator: users[0]._id,
      image: "https://assets.gqindia.com/photos/5df9b7df2538cf000881f3a3/master/pass/7-ways-to-make-a-first-date-go-right.jpg"
    },
    {
      name: "Evening to spare in London",
      location: "london",
      date: new Date("2021-02-26"),
      time: "18:00",
      description: "I will be in London for a conference next Saturday, would be nice to share the rest of the evening with someone over a glass of wine.",
      tags: ["culture", "restaurants"],
      restaurantSuggestions: [restaurants[0]._id],
      isActive: true,
      creator: users[0]._id,
      image: "https://assets.gqindia.com/photos/5df9b7df2538cf000881f3a3/master/pass/7-ways-to-make-a-first-date-go-right.jpg"
    },
    {
      name: "Evening to spare in London",
      location: "london",
      date: new Date("2021-02-26"),
      time: "18:00",
      description: "I will be in London for a conference next Saturday, would be nice to share the rest of the evening with someone over a glass of wine.",
      tags: ["tours", "restaurants"],
      restaurantSuggestions: [restaurants[0]._id],
      isActive: true,
      creator: users[0]._id,
      image: "https://assets.gqindia.com/photos/5df9b7df2538cf000881f3a3/master/pass/7-ways-to-make-a-first-date-go-right.jpg"
    },
    {
      name: "Evening to spare in London",
      location: "london",
      date: new Date("2021-02-26"),
      time: "18:00",
      description: "I will be in London for a conference next Saturday, would be nice to share the rest of the evening with someone over a glass of wine.",
      tags: ["walking", "restaurants"],
      restaurantSuggestions: [restaurants[0]._id],
      isActive: true,
      creator: users[0]._id,
      image: "https://assets.gqindia.com/photos/5df9b7df2538cf000881f3a3/master/pass/7-ways-to-make-a-first-date-go-right.jpg"
    },
    {
      name: "Evening to spare in London",
      location: "london",
      date: new Date("2021-02-26"),
      time: "18:00",
      description: "I will be in London for a conference next Saturday, would be nice to share the rest of the evening with someone over a glass of wine.",
      tags: ["restaurants"],
      restaurantSuggestions: [restaurants[0]._id],
      isActive: true,
      creator: users[0]._id,
      image: "https://assets.gqindia.com/photos/5df9b7df2538cf000881f3a3/master/pass/7-ways-to-make-a-first-date-go-right.jpg"
    },
    {
      name: "Share a walk along the river?",
      location: "london",
      date: new Date("2021-02-27"),
      time: "14:00",
      description: "I have a couple of hours to kill next Sunday after an appointment in London, who's up for a chat whilst walking along the river? Definitely get in touch if you can talk to me about MERN stacks all day!",
      tags: ["walking"],
      poiSuggestions: [poi[0]._id, poi[1]._id],
      isActive: true,
      creator: users[1]._id,
      image: "https://assets.gqindia.com/photos/5df9b7df2538cf000881f3a3/master/pass/7-ways-to-make-a-first-date-go-right.jpg"
    },
    {
      name: "Looking for a foodie to try out Dishoom with next weekend",
      location: "kings cross",
      date: new Date("2021-02-27"),
      time: "17:00",
      description: "My friend had to cancel on our dinner plans last minute due to a family emergency. I have a table for two booked at Dishoom Kings Cross on Sunday and I feel awkward eating out alone, so some company would be great! I'm told it's the best curry in London...",
      tags: ["restaurants"],
      restaurantSuggestions: [restaurants[1]._id],
      isActive: true,
      creator: users[2]._id,
      image: "https://assets.gqindia.com/photos/5df9b7df2538cf000881f3a3/master/pass/7-ways-to-make-a-first-date-go-right.jpg"
    },
    {
      name: "Is anyone else dying to see the new exhibition at the V&A???",
      location: "london",
      date: new Date("2021-03-02"),
      time: "15:00",
      description: "I am planning a trip to the V&A museum next week as part of my short stay in London. Their new exhibition on the Persian Empire looks Amazing! would love to go see it with a fellow persophile.",
      tags: ["culture"],
      poiSuggestions: [poi[1]._id],
      isActive: true,
      creator: users[3]._id,
      image: "https://assets.gqindia.com/photos/5df9b7df2538cf000881f3a3/master/pass/7-ways-to-make-a-first-date-go-right.jpg"
    },
    {
      name: "At a loose end for a few hours next week, up for suggestions",
      location: "london",
      date: new Date("2021-03-03"),
      time: "17:00",
      description: "I have two very annoyingly spaced apart meetings in London next wednesday, I'd love to make the most of the time and explore the city a bit with someone in a similar situation. I honestly enjoy a bit of everything, so hit me up with suggestions!",
      tags: ["restaurants", "tours", "culture", "walking"],
      restaurantSuggestions: [restaurants[0]._id, restaurants[1]._id],
      poiSuggestions: [poi[0]._id, poi[1]._id],
      isActive: true,
      creator: users[0]._id,
      image: "https://assets.gqindia.com/photos/5df9b7df2538cf000881f3a3/master/pass/7-ways-to-make-a-first-date-go-right.jpg"
    }
  ]
}