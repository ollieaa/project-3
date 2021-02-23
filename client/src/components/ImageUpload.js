import React, { useState, useEffect } from 'react'
import axios from 'axios'


export default function ImageUpload({ formData, updateFormData }) {
  const [imageDisplay, updateImageDisplay] = useState([])
  const [button, updateButton] = useState(false)
  const [inputValue, updateInputValue] = useState('')
  const [imageFormData, updateImageFormData] = useState({
    caption: '',
    url: ''
  })

  function handleImageChange(e) {
    updateInputValue(e.target.value)
    updateImageFormData({
      ...imageFormData,
      caption: e.target.value
    })
  }

  async function handleImageUpload() {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dsmdafpt0', 
        uploadPreset: 'looseend', 
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        updateImageFormData({
          ...imageFormData,
          url: result.info.secure_url
        })

      }
    ).open()
  }


  // function displayImage() {
  //   return imageFormData.url
  // }

  function UploadedImage() {
    return <div><img src={imageFormData.url}></img></div>
  }

  function updateImageUrl() {
    updateFormData({
      ...formData,
      image: imageFormData.url
    })
  }

  // ! Function that submits our formData to our API.
  // ! Will call the fetchImage function & take user back to images


  async function handleImageSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/imageUpload', imageFormData)
      console.log(data.url)
      updateImageUrl()
    } catch (err) {
      console.log(err)
    }
  }


  // ! using a tenary statement to either display the images or image upload  
  return <>
    <div>
      {button === true ?
        <div className="container">
          <button className="button" onClick={() => updateButton(!button)}>Back</button>
          <button className="button" onClick={handleImageUpload}>Click to upload an image</button>
          <textarea
            className="textarea is-primary"
            placeholder='Your caption'
            onChange={handleImageChange}
            value={inputValue} />
          {imageFormData.url && <UploadedImage />}
          <button className="button" onClick={handleImageSubmit}>Submit and return</button>
        </div>
        :
        <div>
          <button className="button" onClick={() => updateButton(!button)}>Click here to post a image</button>
          {imageDisplay.map(image => {
            return <div key={image._id} className="column is-one-third-desktop is-half-tablet is-half-mobile">
              <div className="card">
                <div className="card-content">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={image.url} />
                    </figure>
                  </div>
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          })}
        </div>
      }
    </div>
  </>
}
