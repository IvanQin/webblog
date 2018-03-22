# webblog
My personal web blog

### run test
- npm run test (run scripts defined in package.json)
- run test configuration in WebStorm (cannot use babel-core/register, do not know why)

### fix bugs
- unique field in mongodb : restart mongod (unstable? do not know why...)

### comments
- promise/ async await
- [Marked](https://github.com/chjj/marked) A markdown parser and compiler. Built for speed.
- [Mongoose type](http://blog.csdn.net/zccz14/article/details/51298545) Types reference in mongoose.
- CommonJS vs ES6: (module.exports,exports,require) vs (export,export default,import)
- Using ES6 in Express: [Tutorial](https://segmentfault.com/a/1190000006707756) (`npm install --save-dev babel-cli`)
- MapReduce on mongoose. Implement `map``reduce` functions. See [tutorial1](http://blog.csdn.net/huntzw/article/details/7753527) [tutorial2](http://www.runoob.com/mongodb/mongodb-map-reduce.html)
- [Mongoose operation](https://www.jianshu.com/p/2f54b90efe15)

### problems encountered
- If you think the router is not updated, restart the server !db

### Issue
- The cross-domain cookie cannot be set. [See 1](https://stackoverflow.com/questions/26987815/ajax-cross-domain-response-cookie-ignored-by-chrome) [See 2](https://www.v2ex.com/t/153576)
- How to create session in mongodb [tutor](http://blog.csdn.net/pretent/article/details/45204909)
- How to use html files instead of 'jade' in Node.js express [some discussion](http://cnodejs.org/topic/50c60035637ffa41550d7a87)

### TODO
- [ x ] how to output log on the server side.
- [ x ] establish mongodb on the server.
- [ x ] install node on the server.
- [ ] deploy html on the node. 


### About deployment
- `yum install -y`, `-y` means choose 'yes' all the time.
- [Yum install mongodb](https://segmentfault.com/a/1190000000664683) How to install mongodb in RedHat.
- use `ctrl-A + ctrl-D` to exit the `screen` in linux. 