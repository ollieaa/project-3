import React, { useEffect, useState } from 'react'
import axios from 'axios'

export function getLoggedInUserId() {
  if (!localStorage) return false
  const token = localStorage.getItem('token')
  if (!token) return false
  const payloadAsString = atob(token.split('.')[1])
  const payloadAsObject = JSON.parse(payloadAsString)
  return payloadAsObject.userId
}

export function isCreator(userIdToCompare) {
  if (!userIdToCompare) return false
  return userIdToCompare === getLoggedInUserId()
}

export function getAdmin() {
  const [user, updateUser] = useState('')

  useEffect(() => {
    axios.get(`/api/users/${getLoggedInUserId}`)
      .then(resp => {
        updateUser(resp.user)
      })
    console.log(user)
  }, [])
  return user.admin
}


export function isAdmin(userIdToCompare) {
  if (!userIdToCompare) return false
  // console.log(userIdToCompare)
  // console.log(getUserAdmin)
  return userIdToCompare === getUserAdmin()
}


