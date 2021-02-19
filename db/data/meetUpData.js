import axios from 'axios'

export default function getMeetUpData(users, restaurants, poi) {
  return [
    {
      name: "Evening to spare in London",
      location: "london",
      date: "2021-02-26",
      time: "18:00",
      description: "I will be in London for a conference next Saturday, would be nice to share the rest of the evening with someone over a glass of wine.",
      tags: ["food & drink"],
      restaurantSuggestions: restaurants[0],
      isActive: true,
      creator: users[0],
    },
    {
      name: "Share a walk along the river?",
      location: "london",
      date: "2021-02-27",
      time: "14:00",
      description: "I have a couple of hours to kill next Sunday after an appointment in London, who's up for a chat whilst walking along the river? Definitely get in touch if you can talk to me about MERN stacks all day!",
      tags: ["outdoor"],
      poiSuggestions: poi[0],
      isActive: true,
      creator: users[1],
    },
    {
      name: "Looking for a foodie to try out Dishoom with next weekend",
      location: "kings cross",
      date: "2021-02-27",
      time: "17:00",
      description: "My friend had to cancel on our dinner plans last minute due to a family emergency. I have a table for two booked at Dishoom Kings Cross on Sunday and I feel awkward eating out alone, so some company would be great! I'm told it's the best curry in London...",
      tags: ["food & drink"],
      restaurantSuggestions: restaurants[1],
      isActive: true,
      creator: users[2],
    },
    {
      name: "Is anyone else dying to see the new exhibition at the V&A???",
      location: "london",
      date: "2021-03-02",
      time: "15:00",
      description: "I am planning a trip to the V&A museum next week as part of my short stay in London. Their new exhibition on the Persian Empire looks Amazing! would love to go see it with a fellow persophile.",
      tags: ["museums"],
      poiSuggestions: poi[1],
      isActive: true,
      creator: users[3],
    },
    {
      name: "At a loose end for a few hours next week, up for suggestions",
      location: "london",
      date: "2021-03-03",
      time: "17:00",
      description: "I have two very annoyingly spaced apart meetings in London next wednesday, I'd love to make the most of the time and explore the city a bit with someone in a similar situation. I honestly enjoy a bit of everything, so hit me up with suggestions!",
      tags: ["food & drink", "outdoor", "museums", "theatre"],
      // restaurantSuggestions: TODO,
      isActive: true,
      creator: users[0],
    }
  ]
}