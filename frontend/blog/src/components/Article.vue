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
                        <i class="el-icon-view"></i> {{viewTimes}} |
                        <i class="el-icon-menu"></i> {{tag}}
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
                viewTimes: 0,
                tag:""
            }
        },
        mounted: function () {

            let loadContentRequest = {
                "dbName": "test",
                "collectionName": "article",
                "operation": 2,
                "document": {
                    "tag": "Tech"
                }
            };

            this.$http.post('/db', loadContentRequest).then(res => {
                console.log(res.data[0]);
                let receiveData = res.data[0];
                this.title = receiveData.title;
                this.viewTimes = receiveData.viewTimes;
                this.author = receiveData.author.name;
                this.content = marked(receiveData.content);
                this.updateTime = receiveData.updateTime;
                this.tag = receiveData.tag;
            }).catch(error => console.log(error));
        },
        filters: {
            formatDate (timeString){
                let d = new Date(Date.parse(timeString));
                return d.toLocaleDateString();
            }
        }
    }
</script>

<style>
    .article-side {
        color: #909399;
        text-align: center;

    }

    .content-container {
        margin: auto;
        padding: 0 10%;
    }
</style>
