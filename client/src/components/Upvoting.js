// import React from 'react'
// import ReactDOM from 'react-dom'

// class Upvote extends React.Component {
//   state = { vote: 0, score: 0 }

//   vote(type) {
//     this.setState(state => ({
//       vote: state.vote === type ? 0 : type
//     }))
//   }

//   render() {
//     const { vote, score } = this.state
//     return (
//       <main>
//         <h1>{score + vote}</h1>
//         <button className={vote === 1 ? 'active' : undefined} onClick={() => this.vote(1)}>
//           Upvote
//         </button>
//       </main>
//     )
//   }

// }

// ReactDOM.render(<Upvote />, document.querySelector('#app'))