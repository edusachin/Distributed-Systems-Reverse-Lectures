//var gaggle = require('gaggle')
//var uuid = require('uuid')
var defaults = require('lodash/defaults')

var gaggle = require('gaggle')
    // uuids are recommended, but you can use any string id
  , uuid = require('uuid')
  , g = gaggle({
      /**
      * Required settings
      */

      id: uuid.v4()
    , clusterSize: 5
    , channel: {
        name: 'redis', // or "memory", etc ...
        channelName: 'foobar'

        // ... additional keys are passed as options to the
        // "redis" channel. see channel docs for available
        // options.
      }

      /**
      * Optional settings
      */

      // Can be called through dispatchOnLeader()
    , rpc: {
        foo: function foo (a, b, c, d) {
          // "this" inside here refers to the leader Gaggle instance
          // so you can do things like this...
          console.log("*******************************I am here")
          if (this.hasUncommittedEntriesFromPreviousTerms()) {
            this.append('noop')

            return new Error('I am not ready yet, try again in a few seconds')
          }
          else {
            return 'foo'
          }
          console.log("I am here as well************************")
        }
      }

      // How long to wait before declaring the leader dead?
    , electionTimeout: {
        min: 300
      , max: 3000
      }
      // Should the leader send a heartbeat if it would speed
      // up the commit of a message?
    , accelerateHeartbeats: false
    })
//
// g.on('committed', function (data) {
//   console.log(data)
// })
//
// // You can be notified when a specific message is committed
// // by providing a callback
// g.append('mary', function () {
//   console.log(',')
// })
//
// // Or, you can use promises
// g.append('had').then(function () {
//   console.log('!')
// })
//
// // Or, you can just cross your fingers and hope that an error
// // doesn't happen by neglecting the return result and callback
// g.append('a')
//
// // Entry data can also be numbers, arrays, or objects
// // we were just using strings here for simplicity
// g.append({foo: 'lamb'})
//
// // You can specify a timeout as a second argument
// g.append('little', 1000)
//
// // By default, gaggle will wait indefinitely for a message to commit
// g.append('a', function () {
//   // I may never be called!
// })

g.on('committed', function (data) {
  console.log("************** YO *****************")
  console.log(data)
})

// You can be notified when a specific message is committed
// by providing a callback
g.append('Sachin', function () {
  console.log('Sachin')
})

// Or, you can use promises
g.append('Shivani').then(function () {
  console.log('Shivani')
})

// Or, you can just cross your fingers and hope that an error
// doesn't happen by neglecting the return result and callback
g.append('Pranav').then(function() {
  console.log('Pranav')
})


// Entry data can also be numbers, arrays, or objects
// we were just using strings here for simplicity
g.append({foo: 'lamb'}).then(function() {
  console.log('lamb')
})


// You can specify a timeout as a second argument
g.append('little').then(function() {
  console.log('little')
})


g.on('committed', function (entry, index) {
  console.log('on committed')
})


g.on('leaderElected', function () {
  console.log('four! more! years!')
})



//
// g.on('appended', function (data) {
//   console.log(data)
// })

//g.hasUncommittedEntriesInPreviousTerms()

g.isLeader()
//
// g.on('leaderElected', function (data) {
//   console.log(data)
//   console.log('four! more! years!')
// })
//
//
g.getLog()
//
g.getCommitIndex()


// By default, gaggle will wait indefinitely for a message to commit
g.append('END', function () {
   // I may never be called!
})
