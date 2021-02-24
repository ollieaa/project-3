export default function getGroupData(users, meetUps) {
  return [

    {
      creator: users[0],
      passcode: 'XYZ',
      name: 'TEST Group',
      image: 'https://theanswerclass.com/wp-content/uploads/2018/02/bigstock-Happy-Group-Of-People-3928383-2-1-scaled.jpg',
      description: 'This is my test group',
      admins: [users[0], users[1]],
      members: [users[0], users[1], users[2]],
      meetUps: [meetUps[0]],
      comments: []
    }

  ]
}
