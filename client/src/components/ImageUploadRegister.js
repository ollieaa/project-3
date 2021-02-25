import React, { useState } from 'react'
import axios from 'axios'


function ImageUploadRegister({ formData, updateFormData }) {
  const [confirmImage, updateConfirmImage] = useState(false)
  const [imageFormData, updateImageFormData] = useState({
    url: ''
  })

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

  function UploadedImage() {
    return <div><img src={imageFormData.url}></img></div>
  }

  function updateImageUrl() {
    updateFormData({
      ...formData,
      image: imageFormData.url
    })
  }

  async function handleImageSubmit(event) {
    event.preventDefault()
    try {
      console.log('hello')
      const { data } = await axios.post('/api/imagesRegister', imageFormData)
      console.log('bye')
      console.log(data.url)
      updateImageUrl()
      updateConfirmImage(true)
    } catch (err) {
      console.log(err)
    }
  }

  return <>
    <div>
      <div className="container mt-5">
        <button className="button" onClick={handleImageUpload}>Upload an image</button>
        {imageFormData.url && <UploadedImage />}
        {(!confirmImage && imageFormData.url) && <button
          className="button is-danger"
          onClick={handleImageSubmit}>Confirm image</button>}
      </div>
    </div>
  </>
}

export default ImageUploadRegister