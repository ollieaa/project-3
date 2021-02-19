export default function getPoiData() {
  return [
    {
      category: 'indoor',
      name: 'Tower of London',
      tube: 'Tower Hill',
      description: 'When William the Conqueror built a mighty stone tower at the centre of his London fortress in the 1070s, defeated Londoners must have looked on in awe. Now nearly 1000 years later, the Tower still has the capacity to fascinate and horrify. As protector of the Crown Jewels, home of the Yeomen Warders and its legendary guardians, the pampered ravens, the Tower now attracts over three million visitors a year. Here, the Ceremony of the Keys and other traditions live on, as do the ghost stories and terrible tales of torture and execution. But the Tower also has a richer and more complex history, having been home to a wide array of institutions including the Royal Mint, the Royal Armouries and even a zoo.',
      types: ['museum', 'historic building', 'palace', 'landmark'],
      // user: user[0],
      lat: 51.5081,
      long: 0.0759,
      price: '£25 for adults, £12.50 for children',
      time: '',
      phone: '+44 20 3166 6000',
      funfact: 'There is a legend that six ravens must be present at the Tower of London at all times, otherwise the kingdom and the tower will fall. Because of this, to this day, you will always find six ravens going about their business in the Tower\'s grounds.',
      image: '',
      link: 'https://www.hrp.org.uk/tower-of-london/',
      upVotes: 0,
      postedBy: [],
      comments: [],
      events: []
    }
    // {
    //   category: 'indoor',
    //   name: 'Westminster Abbey',
    //   tube: 'Westminster',
    //   description: 'The Abbey has been the coronation church since 1066, and is the final resting place of 17 monarchs. The church we see today was begun by Henry III in 1245. It\’s one of the most important Gothic buildings in the country, and has the medieval shrine of an Anglo-Saxon saint at its heart.',
    //   types: ['museum', 'religious building', 'historic building'],
    //   user: ,
    //   lat: 51.4987,
    //   long: 0.1289,
    //   price: '£18 for adults, £7 for children',
    //   time: '',
    //   phone: '+44 20 7222 5152',
    //   funfact: 'Over 3,300 people have been buried or commemorated at Westminster Abbey.  This includes seventeen British monarchs including King Henry V and all the Tudors except for Henry VIII.  Other notable people buried at Westminster Abbey include Isaac Newton, Stephen Hawking, Aphra Behn and Charles Dickens.',
    //   image: '',
    //   link: 'https://www.westminster-abbey.org',
    //   upVotes: ,
    //   postedBy: [],
    //   comments: [],
    //   events: []
    // },
    // {
    //   category: 'indoor',
    //   name: 'Tate Britain',
    //   tube: 'Blackfriars',
    //   description: 'The Tate Britain Gallery houses the world\'s largest collection of British art. Opened in 1897, it was the first of the Tate network that currently includes the Tate Modern, Tate Liverpool and Tate St Ives.',
    //   types: ['museum', 'gallery'],
    //   user: ,
    //   lat: 51.4911,
    //   long: 0.1278,
    //   price: 'Free with some charges for exhibits',
    //   time: '',
    //   phone: '+44 (0)20 7887 8888',
    //   funfact: 'The Tate Britain is accessible via the Tate Boat that runs every forty minutes down the River Thames, between Tate Modern and Tate Britain',
    //   image: '',
    //   link: 'https://www.tate.org.uk/visit/tate-britain',
    //   upVotes: ,
    //   postedBy: [],
    //   comments: [],
    //   events: []
    // },
    // {
    //   category: 'outdoor',
    //   name: 'Royal Botanical Gardens (Kew Gardens)',
    //   tube: 'Kew Gardens',
    //   description: '',
    //   types: ['gardens', 'landmark', 'park'],
    //   user: ,
    //   lat: ,
    //   long: ,
    //   price: '£10 for adults, £4.50 for children',
    //   time: '',
    //   phone: '+44 20 8332 5655',
    //   funfact: '',
    //   image: '',
    //   link: 'https://www.kew.org',
    //   upVotes: ,
    //   postedBy: [],
    //   comments: [],
    //   events: []
    // },
    // {
    //   category: 'outdoor',
    //   name: 'Trafalgar Square',
    //   tube: 'Charing Cross',
    //   description: 'Trafalgar Square is a public square established in the early 19th century, but the site around it has been a significant landmark since the 1200s. The square has been used for community gatherings and political dem'nstrations, as well as Christmas and New Years celebrations.,
    //   types: ['square', 'monument', 'landmark'],
    //   user: ,
    //   lat: 51.5080,
    //   long: 0.1281,
    //   price: '',
    //   time: '',
    //   phone: '',
    //   funfact: 'Built in 1926, the smallest police box in London was introduced to Trafalgar Square. The reason for this was for police officers to keep a low profile, especially when watching over large protests and gatherings in the square. The Police Box can be found on the South East corner of the square and has a round black lamp above it. In the present, a time when police feel no need to remain so inconspicuous, the police box is no longer needed, and so it is used as a cleaner\'s store room.',
    //   image: '',
    //   link: '',
    //   upVotes: ,
    //   postedBy: [],
    //   comments: [],
    //   events: []
    // },
    // {
    //   category: 'outdoor',
    //   name: 'Richmond Park',
    //   tube: '',
    //   description: 'The park is a top UK site for ancient trees and supports a range of rare species including fungi, birds, beetles, bats, grasses and wildflowers.',
    //   types: ['park', 'gardens'],
    //   user: ,
    //   lat: 51.4412,
    //   long: 0.2745,
    //   price: 'Free',
    //   time: 'Pedestrian gates open 24 hours, except during the deer cull in November and February',
    //   phone: '+44 677 25 78 68',
    //   funfact: '',
    //   image: '',
    //   link: '',
    //   upVotes: ,
    //   postedBy: [],
    //   comments: [],
    //   events: []
    // },
  ]
}


// CATEGORIES
// 1. indoor
// 2. outdoor

// SUBCATEGORIES
// 1. indoor
//   Museums/Galleries
//   Religious buildings
//   Palaces
//   Historic sites 
//   Other 

// 2. outdoor  
//   Park
//   Public Art
//   Planetarium
//   Square 
//   Statue
//   Market
//   Gardens
//   Harbor
//   Monument
//   Landmark

// TEMPLATE
// {
//   category: '',
//   name: '',
//   tube: '',
//   description: '',
//   types: [],
//   user: ,
//   lat: ,
//   long: ,
//   price: '',
//   time: '',
//   phone: '',
//   funfact: '',
//   image: '',
//   link: '',
//   upVotes: ,
//   postedBy: [],
//   comments: [],
//   events: []
// },