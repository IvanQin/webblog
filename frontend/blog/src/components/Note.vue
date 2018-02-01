<template>
    <div id="note">
        <el-container>
            <el-header>

            </el-header>
            <el-main>
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item v-for="(note,index) in notesList" :key="note.id" :id="note._id">
                        <template slot="title">
                            <el-tooltip :content="note.status ? 'Finished' : 'Pending' " placement="top">
                                <el-switch
                                    v-model="note.status"
                                    active-color="#13ce66"
                                    inactive-color="#909399"
                                    style="margin-left: 10px; margin-right: 10px"
                                    @change="noteChange(note.status,note._id,index)"
                                    :disabled="note.disabled"
                                >
                                </el-switch>
                            </el-tooltip>
                            {{note.description}}<span style="margin-left: 10px; margin-right: 10px"><el-tag
                            :type="note.tagColor">{{note.tag}}</el-tag>
                            <el-tag
                                type="warning"
                                v-if="progressColor(note.progressPercentage) == 'exception'">Urgent</el-tag>
                        </span>
                        </template>
                        <span>
                        <i class="el-icon-date"></i> Start date : {{note.updateTime | formatDate}}
                        <i class="el-icon-date"></i> Due date : {{note.expectedTime | formatDate}}
                        </span>
                        <span>
                        <el-progress :text-inside="true" :stroke-width="18"
                                     :percentage="note.progressPercentage"
                                     :status="progressColor(note.progressPercentage)"></el-progress></span>
                        <div v-html="note.details"></div>
                    </el-collapse-item>
                </el-collapse>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    const marked = require('marked');
    const utils = require('../utils/utils');

    function colorFilter(tag) {
        let tagNameToType = {
            'Study': "",
            'Love': "danger",
            'Life': "info"
        };
        if (tag in tagNameToType)
            return tagNameToType[tag];
        return "";
    }
    function progressCalculate(dStart, dEnd) {
        let dStartD = new Date(dStart);
        let dEndD = new Date(dEnd);
        if (Date.now() >= dEndD) return 0;
        //console.log(parseInt((dEndD - dStartD)),dEndD-Date.now());
        return parseInt(100 * (dEndD - Date.now()) / (dEndD - dStartD));
    }
    function setNoteFinish(id, vm) {
        let data = {
            "document": {
                "id": id
            },
            "updateDoc": {
                "$set": {"status": true}
            }
        };
//        console.log("set Note Finish");
        let setNoteFinishRequest = utils.getDbOperationTemplate(6, "note", data);
        // never use 'this' outside Vue!
//        this.$http.post('/db', setNoteFinishRequest).then(res => {
//            console.log(res)
//        }).catch(err => console.log(err));
        vm.$http.post('/db', setNoteFinishRequest).then(res => {
            console.log(res)
        }).catch(err => console.log(err));

    }
    export default{
        data(){
            return {

                notesList: [],
                activeNames: ['1'],

            }
        },
        methods: {
            handleChange(val) {
                console.log(val);
            },
            progressColor(percentage){
                if (percentage > 70)
                    return "success";
                if (percentage < 30)
                    return "exception";
                return "";
            },
            noteChange(status, id, index) {
                if (status == false) {
                    this.$confirm('Have you done with the task?', 'Confirmation', {
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        type: 'info'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: 'Confirmed',

                        });
                        let oldNote = this.notesList[index];
                        oldNote.status = true;
                        oldNote.disabled = true;
                        this.notesList.splice(index, 1, oldNote); // For the use of this API, please refer https://cn.vuejs.org/v2/guide/list.html
                        setNoteFinish(id, this);

                    }).catch(() => {
                        //console.log("Enter catch");
                        this.$message({
                            type: 'info',
                            message: 'Cancelled'
                        });
                        let oldNote = this.notesList[index];
                        oldNote.status = false;
                        oldNote.disabled = false;
                        this.notesList.splice(index, 1, oldNote);
                    });
                }
                else {
                    console.log("Status is true here.When status is true, the switch should be disabled!")
                }
            }
        },
        mounted: function () {
            let loadContentRequest = utils.getDbOperationTemplate(2, "note", {"document": {"status": false}});
            this.$http.post('/db', loadContentRequest).then(res => {
                let receiveData = res.data;
                for (let i in receiveData) {
                    if (receiveData.hasOwnProperty(i)) {
                        let d = receiveData[i];
                        let note = {
                            "description": d.description,
                            "details": marked(d.details),
                            "tag": d.tag,
                            "tagColor": colorFilter(d.tag),
                            "updateTime": d.updateTime,
                            "expectedTime": d.expectedTime,
                            "progressPercentage": progressCalculate(d.updateTime, d.expectedTime),
                            "status": d.status,
                            "_id": d._id,
                            "disabled": false
                        };
                        this.notesList.push(note);
                    }
                }
                console.log(this.notesList);
            }).catch(error => console.log(error));
        },
        filters: {
            formatDate (timeString){
                let d = new Date(Date.parse(timeString));
                return d.toLocaleDateString();
            }
        },


    }
</script>
<style>

</style>
