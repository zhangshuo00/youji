<template>
    <div id="echarts">
        <div id="amount"></div>
    </div>
</template>

<script>
export default {
    name: 'echarts',
    data() {
        return {
            key: 'admin',
            audate: [],
            user_amount: [],
            user_than: [],
            chapter_amount: [],
            chapter_than: [],
            share_amount: [],
            share_than: []
        }
    },
    methods: {
        amount: function(){
            var chart = this.$echarts.init(document.getElementById('amount'));
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: ['用户数量', '笔记数量', '笔记分享数量']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.audate,
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '用户数量',
                        axisLabel: {
                            formatter: '{value} 人'
                        }
                    },
                    {
                        type: 'value',
                        name: '笔记数量',
                        axisLabel: {
                            formatter: '{value} 篇'
                        }
                    },
                    {

                    }
                ],
                series: [
                    {
                        name: '用户数量',
                        type: 'bar',
                        data: this.user_amount
                    },
                    {
                        name: '笔记数量',
                        type: 'bar',
                        data: this.chapter_amount
                    },
                    {
                        name: '笔记分享数量',
                        type: 'line',
                        yAxisIndex: 1,
                        data: this.share_amount
                    }
                ]
            };
            chart.setOption(option)
        },
        getAmount: function(){
            this.axios.get('/getAmount',{
                params: {
                    key: this.key
                }
            }).then(res=>{
                for(var i=0;i<res.data.length;i++){
                    this.audate.push(res.data[i].audate);
                    this.user_amount.push(parseInt(res.data[i].user_amount));
                    this.user_than.push(parseInt(res.data[i].user_than));
                    this.chapter_amount.push(parseInt(res.data[i].chapter_amount));
                    this.chapter_than.push(parseInt(res.data[i].chapter_than));
                    this.share_amount.push(parseInt(res.data[i].share_amount));
                    this.share_than.push(parseInt(res.data[i].share_than));
                }
                this.amount();
            })
        }
    },
    mounted() {
        this.getAmount();
    }
}
</script>

<style>
#amount{
    width:70%;
    height:500px;
    margin-left: 10%;
    margin-top: 5%;
}
</style>