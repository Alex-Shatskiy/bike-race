const initialState = [
  {
    id: 1,
    username: 'bonecrusher',
    email: 'blackie@gmail.com',
    imgURL: 'http://t1.gstatic.com/images?q=tbn:ANd9GcQYxMf1KNukK03qsdLZgFfMqKGES6jbrgACOFpKJ45Nyr-UQMt5LL8EqCD6g95VXEaE7ZZmaNuzfy93jb8Iqho',
    eventsAttended: 17,
    bikeType: 'BMX'
  },
  {
    id: 2,
    username: 'wonderphil',
    email: 'phil@gmail.com',
    imgURL: 'http://t1.gstatic.com/images?q=tbn:ANd9GcQYxMf1KNukK03qsdLZgFfMqKGES6jbrgACOFpKJ45Nyr-UQMt5LL8EqCD6g95VXEaE7ZZmaNuzfy93jb8Iqho',
    eventsAttended: 17,
    bikeType: 'road'
  }
]

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer
