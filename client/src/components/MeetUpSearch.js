import React, {useState} from 'react'
import MeetUpSearchForm from './MeetUpSearchForm'

const MeetUpSearch = () => {

  const [formData, updateFormData] = useState({
    location: "",
    date: new Date().toISOString().substr(0, 10),
    category: 'All Categories'
  })

  return <div id="meetUpSearchPage">
    <MeetUpSearchForm orientation="meetUpSearchRow" formData={formData} updateFormData={updateFormData}/>
  </div>
}

export default MeetUpSearch