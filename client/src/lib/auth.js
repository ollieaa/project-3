// ! Auth info about the logged in user!
export function getLoggedInUserId() {
  if (!localStorage) return false
  // ! Get the token
  const token = localStorage.getItem('token')
  // ! check if it exists
  if (!token) return false
  // ! atob is going to decode my base 64 to a readable string
  const payloadAsString = atob(token.split('.')[1])
  const payloadAsObject = JSON.parse(payloadAsString)
  return payloadAsObject.userId
}

// ! userIdToCompare could be a pokemon user id, or a comment
// ! user id, etc.
export function isCreator(userIdToCompare) {
  if (!userIdToCompare) return false
  // ! Compare user Id to logged in ID
  // console.log(userIdToCompare)
  // console.log(getLoggedInUserId())
  return userIdToCompare === getLoggedInUserId()
}