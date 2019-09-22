<template>
    <section>
        <!--工具条-->
        <!--<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">-->
        <!--<el-form :inline="true" :model="filters">-->
        <!--<el-form-item>-->
        <!--<el-input v-model="filters.name" placeholder="姓名"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
        <!--<el-button type="primary" v-on:click="getUser">查询</el-button>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</el-col>-->

        <!--列表-->
        <template>
            <div :class="className" :id="id" :style="{height:height,width:width}" ref="statisticGoodsEchart">
            </div>
            <el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
                <el-table-column type="index" width="60">
                </el-table-column>
                <el-table-column prop="goodId" label="商品ID" width="120" sortable>
                </el-table-column>
                <el-table-column prop="goodsName" label="商品名称" width="120" sortable>
                </el-table-column>
                <el-table-column prop="goodsNum" label="商品销售量" width="100" :formatter="formatSex" sortable>
                </el-table-column>
                <el-table-column prop="goodsTotalPrice" label="商品总销售额" width="120" :formatter="formatPrice" sortable>
                </el-table-column>
                <el-table-column prop="orderCount" label="订单数量" min-width="180" sortable>
                </el-table-column>
            </el-table>
        </template>

    </section>
</template>
<script>
//<!--引入echart-->
import echarts from 'echarts';
import {getGoodsList} from '../../api/api';
//import NProgress from 'nprogress'
export default {
    props: {
        className: {
            type: String,
            default: 'staticGood'
        },
        id: {
            type: String,
            default: 'staticGoods'
        },
        width: {
            type: String,
            default: '800px'
        },
        height: {
            type: String,
            default: '400px'
        }
    },
    data() {
        return {
            filters: {
                name: ''
            },
            loading: false,
            users: [],
            goodIdList: [],
            goodsNameList: [],
            goodsNumList: [],
            goodsTotalPriceList: [],
            orderCountList: [],
            chart: null,

        }
    },
    methods: {
        //null 处理
        formatSex: function (row, column) {
            return row.goodsNum == null ? '0' : row.goodsNum;
        },
        formatPrice: function (row, column) {
            return row.goodsTotalPrice == null ? '0' : row.goodsTotalPrice;
        },
        initChart() {
            this.chart = echarts.init(this.$refs.statisticGoodsEchart);
            // 从后端请求数据
            this.$message.success("统计数据如下");
            this.chart.setOption({
                color: ['#3398DB'],
                title: {
                    text: '商品数据分析'
                },
                //提示框组件
                tooltip: {
                    trigger: 'axis', // 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。，item
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: (datas) => {
                        var res = datas[0].name + '<br/>'
                        for (var i = 0, length = datas.length; i < length; i++) {
                            res += datas[i].seriesName + '：'
                                + datas[i].data + '<br/>'
                        }
                        return res;
                    }
                },
                // legend: {
                //     left: 'center',
                //     data:['商品名称','商品销售量','商品总销售额','订单数量']
                // },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: this.goodIdList,
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    type: 'value',
                    name: '商品销售量(个)',
                    boundaryGap: false, // 坐标轴两端空白策略，数组内数值代表百分比
                    axisLabel: {
                        formatter: function (value) {
                            let num = value
                            return num + '个'
                        }
                    }
                }],
                //折线图上方的工具箱
                // toolbox: {
                //     left: 'center',
                //     feature: {
                //         dataZoom: {
                //             yAxisIndex: 'none'
                //         },
                //         restore: {},
                //         saveAsImage: {}
                //     }
                // },
                //区域缩放
                dataZoom: [{
                    //绝对数值形式
                    startValue: '1004'
                }, {
                    type: 'inside'
                }],
                series: [
                    {
                    name: '商品销售量',
                    //bar：柱状图 line为折线图
                    type: 'bar',
                    //区域颜色
                    areaStyle: {},
                    smooth: true,
                    data: this.goodsNumList,
                    markLine: {
                        silent: true,
                        data: [{
                            yAxis: 10
                        }, {
                            yAxis: 20
                        }, {
                            yAxis: 50
                        }, {
                            yAxis: 100
                        }, {
                            yAxis: 200
                        }]
                    }
                },
                    // {
                    //     name: '商品总销售额',
                    //     //bar：柱状图 line为折线图
                    //     type: 'bar',
                    //     //区域颜色
                    //     areaStyle: {},
                    //     smooth: true,
                    //     data: this.goodsTotalPriceList,
                    //     markLine: {
                    //         silent: true,
                    //         data: [{
                    //             yAxis: 10
                    //         }, {
                    //             yAxis: 20
                    //         }, {
                    //             yAxis: 50
                    //         }, {
                    //             yAxis: 100
                    //         }, {
                    //             yAxis: 200
                    //         }]
                    //     }
                    // },
                    {
                        name: '订单数量',
                        //bar：柱状图 line为折线图
                        type: 'bar',
                        //区域颜色
                        areaStyle: {},
                        smooth: true,
                        data: this.orderCountList,
                        markLine: {
                            silent: true,
                            data: [{
                                yAxis: 10
                            }, {
                                yAxis: 20
                            }, {
                                yAxis: 50
                            }, {
                                yAxis: 100
                            }, {
                                yAxis: 200
                            }]
                        }
                    },

                ],
                //  折线图的颜色
                visualMap: {
                    top: 10,
                    right: 10,
                    pieces: [{
                        gt: 0,
                        lte: 5,
                        color: '#096'
                    }, {
                        gt: 5,
                        lte: 10,
                        color: '#ffde33'
                    }, {
                        gt: 10,
                        lte: 20,
                        color: '#ff9933'
                    }, {
                        gt: 20,
                        lte: 30,
                        color: '#cc0033'
                    }, {
                        gt: 30,
                        lte: 40,
                        color: '#660099'
                    }, {
                        gt: 40,
                        color: '#7e0023'
                    }],
                    outOfRange: {
                        color: '#999'
                    }
                },
            })

        },
        //获取商品相关的 订单明细列表
        getUser: function () {
            // let para = {
            // 	name: this.filters.name
            // };
            this.loading = true;
            //NProgress.start();

            getGoodsList().then((res) => {
                if (res.data.status = "0") {
                    this.users = res.data.data;
                    this.users = res.data.data;
                    for (var user of res.data.data) {
                        this.goodIdList.push(user.goodId);
                        this.goodsNumList.push(user.goodsNum);
                        this.goodsTotalPriceList.push(user.goodsTotalPrice);
                        this.orderCountList.push(user.orderCount);

                    }
                    this.initChart();
                    this.loading = false;
                } else {
                    this.loading = true;
                }
            });
        }
    },
    mounted() {
        this.getUser();
    }
};

</script>

<style scoped>

</style>
