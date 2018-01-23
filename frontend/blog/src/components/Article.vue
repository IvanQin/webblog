<template>
    <div id="article">
        <el-container>
            <el-header style="text-align: center">
                <h1>{{title}}</h1>


            </el-header>
            <el-main>
                <div class="article-side">
                    <span class="article-side">
                        <i class="el-icon-date"></i> {{updateTime | formatDate}} |
                    <i class="el-icon-edit"></i> {{author}} |
                        <i class="el-icon-view"></i> {{viewTimes}}
                </span>
                </div>

                <div class="content-container" v-html="content">
                </div>

            </el-main>

            <el-footer style="text-align: center"><a>Footer</a></el-footer>

        </el-container>
    </div>
</template>

<script>
    const marked = require('marked');
    export default {
        name: 'Article',
        data () {
            return {
                title: "",
                author: "Ivan Qin",
                updateTime: "",
                content: "",
                viewTimes: 5
            }
        },
        mounted: function () {

            let loadContentRequest = {
                "dbName": "test",
                "collectionName": "article",
                "operation": 2,
                "document": {
                    "content": "Hello world "
                }
            };

            this.$http.post('/db', loadContentRequest).then(res => {
                console.log("asdfa;ldskfja");
                console.log(res.data[0]);
                let receiveData = res.data[0];
                this.title = receiveData.title;
                //this.author = receiveData.author;
//                this.content = receiveData.content;
                this.content = marked('### comments \r\n \
- indentation: turn off "Detect and use existing file indents for editing", which will override the settings in WebStorm. \r\n \
- frontend framework: [Element-UI quick start](http://element.eleme.io/#/en-US/component/quickstart) \r\n\
- Not support vue: preference -> plugin -> vue plugin \r\n\
- axios API: [Axios API](https://www.npmjs.com/package/axios) ');
                this.updateTime = receiveData.updateTime;
            }).catch(error => console.log(error));
        },
        filters: {
            formatDate (timeString){
                let d = new Date(Date.parse(timeString));
                return d.toLocaleDateString();
            },
            dumb (htmlContent){
                return "asdfasdfasdfasdf";
            }
        }
    }
</script>

<style>
    .article-side {
        color: #909399;
        text-align: center;

    }
    .content-container{
        margin: auto;
        padding: 0 10%;
    }
</style>
