import React from 'react'
import {Link} from 'react-router-dom'

export function RestaurantSuggestion({suggestions}) {
  return suggestions.map((suggestion) => {
    return <Link className="suggestion"
                 to={`/activities/${suggestion._id}`}
                 key={suggestion._id}
           >
           <div className="card">
             <div className="card-image">
               <figure className="image is-4by3">
                 <img src={suggestion.image} 
                      alt={suggestion.name}/>
               </figure>
             </div>
             <p>{suggestion.name}</p>
           </div>
           </Link>
  })
}

export function PoiSuggestion({suggestions}) {
  return suggestions.map((suggestion) => {
    return <Link className="suggestion"
                 to={`/poi/${suggestion._id}`}
                 key={suggestion._id}
           >
           <div className="card">
             <div className="card-image">
               <figure className="image is-4by3">
                 <img src={suggestion.image} 
                      alt={suggestion.name}/>
               </figure>
             </div>
             <p>{suggestion.name}</p>
           </div>
           </Link>
  })  
}

export function CreateSuggestion({item}) {

  return <div className="card" key={item}>
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={item.image} alt={item.name}/>
              </figure>
            </div>              
              <p>{item.name}</p>  
          </div>
}









                        