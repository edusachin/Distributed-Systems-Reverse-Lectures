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
  clusterSize: 3,
  channel: {
    name: 'redis',
    // required, the channel to pub/sub to
   channelName: 'foobar'
 }}
))
//var nodeB = gaggle(defaults({id: uuid.v4()}, opts))
var nodeB = gaggle(defaults({
  id: uuid.v4(),
  clusterSize: 3,
  channel: {
    name: 'redis',
    // required, the channel to pub/sub to
   channelName: 'foobar'
 }
}))

var nodeC = gaggle(defaults({
  id: uuid.v4(),
  clusterSize: 3,
  channel: {
    name: 'redis',
    // required, the channel to pub/sub to
   channelName: 'foobar'
 }
}))

// Nodes will emit "committed" events whenever the cluster
// comes to consensus about an entry
nodeC.on('committed', function (data) {
  console.log(data)
})

// You can be notified when a specific message is committed
// by providing a callback
nodeC.append('mary', function () {
  console.log(',')
})

// Or, you can use promises
nodeA.append('had').then(function () {
  console.log('!')
})

// Or, you can just cross your fingers and hope that an error
// doesn't happen by neglecting the return result and callback
nodeA.append('a')

// Entry data can also be numbers, arrays, or objects
// we were just using strings here for simplicity
nodeB.append({foo: 'lamb'})

// You can specify a timeout as a second argument
nodeA.append('little', 1000)

// By default, gaggle will wait indefinitely for a message to commit
nodeC.append('a', function () {
  // I may never be called!
})

// This example prints the sentence:
//     "mary , had a little {foo: 'lamb'} !"
// in SOME order; Raft only guarantees that all nodes will commit entries in
// the same order, but nodes sent at different times may not be committed
// in the order that they were sent.
