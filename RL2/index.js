var gaggle = require('gaggle')
var uuid = require('uuid')
var defaults = require('lodash/defaults')
// var opts = {
//       channel: {
//         name: 'redis'
//       , redisChannel: 'foobar'
//       }
//     , clusterSize: 3
//     }

var nodeA = gaggle(defaults({
  id: uuid.v4(),
  clusterSize: 5,
  channel: {
    name: 'redis',
    // required, the channel to pub/sub to
   channelName: 'foobar'
  },
  electionTimeout: {
     min: 300, max: 350
  }
}
))
//var nodeB = gaggle(defaults({id: uuid.v4()}, opts))
var nodeB = gaggle(defaults({
  id: uuid.v4(),
  clusterSize: 3,
  channel: {
    name: 'redis',
    // required, the channel to pub/sub to
   channelName: 'foobar'
 },
 electionTimeout: {
    min: 300, max: 5000
 }
}))

var nodeC = gaggle(defaults({
  id: uuid.v4(),
  clusterSize: 3,
  channel: {
    name: 'redis',
    // required, the channel to pub/sub to
   channelName: 'foobar'
 },
 electionTimeout: {
    min: 300, max: 5000
 }
}))

// Nodes will emit "committed" events whenever the cluster
// comes to consensus about an entry
// nodeC.on('committed', function (data) {
//   console.log(data)
// })

nodeA.on('committed', function (data) {
  console.log('*****************this is us*******************')
  console.log(data)
})

// You can be notified when a specific message is committed
// by providing a callback
// nodeC.append('mary', function () {
//   console.log(',')
// })

// Or, you can use promises
nodeA.append('Pranav').then(function () {
  console.log('Pranav')
})

// Or, you can just cross your fingers and hope that an error
// doesn't happen by neglecting the return result and callback
nodeA.append('Shivani').then(function () {
  console.log('Shivani')
})
// Entry data can also be numbers, arrays, or objects
// we were just using strings here for simplicity
//nodeB.append({foo: 'lamb'})

// You can specify a timeout as a second argument
nodeA.append('Sachin').then(function() {
  console.log('Sachin')
})

// By default, gaggle will wait indefinitely for a message to commit
// nodeC.append('a', function () {
//   // I may never be called!
// })

nodeA.append('Gash').then(function() {
  console.log('Gash')
})



nodeA.getLog()
nodeA.getCommitIndex()
nodeA.isLeader()


//nodeB.getLog()
//nodeB.getCommitIndex()
//nodeB.isLeader()


//nodeC.getLog()
//nodeC.getCommitIndex()
//nodeC.isLeader()

// This example prints the sentence:
//     "mary , had a little {foo: 'lamb'} !"
// in SOME order; Raft only guarantees that all nodes will commit entries in
// the same order, but nodes sent at different times may not be committed
// in the order that they were sent.
