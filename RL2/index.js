var gaggle = require('gaggle')
var uuid = require('uuid')
var defaults = require('lodash/defaults')

const start = Date.now()

var nodeA = gaggle(defaults({
  id: uuid.v4(),
  clusterSize: 750,
  channel: {
    name: 'redis',
    // required, the channel to pub/sub to
   channelName: 'foobar'
  },
  rpc: {
        foo: function foo (a, b, c, d) {
          // "this" inside here refers to the leader Gaggle instance
          // so you can do things like this...
          if (this.hasUncommittedEntriesFromPreviousTerms()) {
            this.append('noop')

            return new Error('I am not ready yet, try again in a few seconds')
          }
          else {
            return 'foo'
          }
        }
  },
  electionTimeout: {
     min: 300, max: 3000
   }
  }
)
)
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

nodeA.isLeader()

nodeA.on('leaderElected', function (data) {
  console.log('***************** LeaderElected *******************')
  console.log(Date.now() - start);
  //console.log(data)
})

nodeA.isLeader()
nodeA.getCommitIndex()


// You can be notified when a specific message is committed
// by providing a callback
// nodeC.append('mary', function () {
//   console.log(',')
// })

nodeA.dispatchOnLeader('foo', ['bar', 'baz'], 5000, function (err, result) {
})

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
nodeA.getCommitIndex()
nodeA.append('Sachin').then(function() {
  console.log('Sachin')
})

// By default, gaggle will wait indefinitely for a message to commit
// nodeC.append('a', function () {
//   // I may never be called!
// })
nodeA.getCommitIndex()
nodeA.append('John').then(function() {
  console.log('John')
})

nodeA.dispatchOnLeader('foo', ['bar', 'baz'], 5000, function (err, result) {
})

nodeA.getCommitIndex()
nodeA.on('appended', function (data) {
  console.log('***************** Appended *******************')
  console.log(data)
})

nodeA.on('committed', function (data) {
  console.log('***************** Committed *******************')
  console.log(data)
})

nodeA.getCommitIndex()


nodeA.getLog()

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
