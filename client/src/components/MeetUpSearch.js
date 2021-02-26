import React, {useState} from 'react'
import MeetUpSearchForm from './MeetUpSearchForm'

const MeetUpSearch = () => {

  const [formData, updateFormData] = useState({
    location: "",
    date: new Date().toISOString().substr(0, 10),
    category: 'All Categories'
  })

  return <div id="meetUpSearchPage">
    <section className="hero is-fullheight-with-navbar" id="meetUpHeroBackground">
      <div className="hero-body" id="meetUpSearchHero">
        <p className="title" id="meetUpSearchTitle">
          Search MeetUps
        </p>
        <MeetUpSearchForm orientation="meetUpSearchRow" formData={formData} updateFormData={updateFormData}/>
      </div>
    </section>
  </div>
}

export default MeetUpSearch