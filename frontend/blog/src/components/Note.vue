<template>
    <div id="note">
        <el-container>
            <el-header>

            </el-header>
            <el-main>
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item v-for="note in notesList" :key="note.id">
                        <template slot="title">
                            {{note.description}}<span style="margin-left: 10px; margin-right: 10px"><el-tag :type="note.tagColor">{{note.tag}}</el-tag></span>
                        </template>
                        <div v-html="note.details"></div>
                    </el-collapse-item>
                </el-collapse>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    const marked = require('marked');

    function colorFilter(tag){
        let tagNameToType={
            'Study':"",
            'Love':"danger",
            'Life':"info"
        };
        if (tag in tagNameToType)
            return tagNameToType[tag];
        return "";
    }

    export default{
        data(){
            return {
                tag: "",
                description: "",
                status: "",
                author: "",
                updateTime: "",
                expectedTime: "",
                details: "",
                tagColor: "",
                notesList: [],
                activeNames: ['1']

            }
        },
        methods: {
            handleChange(val) {
                console.log(val);
            },

        },
        mounted: function () {
            let loadContentRequest = {
                "dbName": "test",
                "collectionName": "note",
                "operation": 2,
                "document": {
                    //"tag": "Study"
                }
            };
            this.$http.post('/db', loadContentRequest).then(res => {
                let receiveData = res.data;
                console.log("123123");
                console.log(receiveData);
                for (let i in receiveData) {
                    if (receiveData.hasOwnProperty(i)) {
                        let d = receiveData[i];
                        let note = {
                            "description": d.description,
                            "details": marked(d.details),
                            "tag":d.tag,
                            "tagColor":colorFilter(d.tag)
                        };
                        this.notesList.push(note);
                    }
                }
                console.log(this.notesList);
            }).catch(error => console.log(error));
        },
        filters:{

        }


    }
</script>
<style>

</style>
