import React from 'react'
import {Link} from 'react-router-dom'
import tick from '../images/tick.png'

export function RestaurantSuggestion({suggestions}) {
  return suggestions.map((suggestion) => {
    return <Link className="card meetUpSuggestion"
                 to={`/activities/${suggestion._id}`}
                 key={suggestion._id}
           >
             <div className="suggestionImage" style={{
                    backgroundImage: `url(${suggestion.image})`,
                    backgroundSize: 'cover'
                  }}>
             </div>
             <p>{suggestion.name.substr(0,22)}</p>
           </Link>
  })
}

export function PoiSuggestion({suggestions}) {
  return suggestions.map((suggestion) => {
    return <Link className="card meetUpSuggestion"
                 to={`/poi/${suggestion._id}`}
                 key={suggestion._id}
           >
             <div className="suggestionImage" style={{
                    backgroundImage: `url(${suggestion.image})`,
                    backgroundSize: 'cover'
                  }}>
             </div>
             <p>{suggestion.name.substr(0,22)}</p>
           </Link>
  })  
}

export function CreateSuggestion({item, handleSelect, formData, suggestionType}) {


  return <a className="card createSuggestion" 
            onClick={() => handleSelect(item._id, suggestionType)}>
        <div className="suggestionImage" style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover'
              }}>
          {suggestionType.includes(item._id) && <img src={tick}/>}
        </div>              
        <p>{item.name.substr(0,22)}</p>
      </a>
}









                        