# Steps to run the setup

1. Go to the RL2 project folder in terminal. Then open 3 new windows of terminal and make sure you are in RL2 directory.
2. If this is your 1st time, then cd into redis-stable and run 'make' and then after that 'make test'. These two will take 5 mins.
3. Then once that is over, run 'sudo cp src/redis-server /usr/local/bin/' and 'sudo cp src/redis-cli /usr/local/bin/' in the redis-stable directory.
4. Now in the same directory, start up redis by entering 'redis-server'. This should start server.
5. Now go to your other terminal window were you should be in RL2 directory. In there type, 'redis-cli SUBSCRIBE foobar'.
6. Now go to another terminal window were you are at RL2 directory folder and type, 'redis-cli PUBSUB CHANNELS' and it should show 'foobar' since you created it in the previous terminal window.
7. Then in the 4th and last unused terminal window, be at the RL2 directory level. There simply type 'node index.js' and run it!

