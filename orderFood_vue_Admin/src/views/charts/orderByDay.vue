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

			<div :class="className" :id="id" :style="{height:height,width:width}" ref="statisticOrderEchart">
			</div>
			<el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="time" label="日期" width="180" sortable>
				</el-table-column>
				<el-table-column prop="orderCount" label="订单数量" width="100" sortable>
				</el-table-column>
				<el-table-column prop="priceTotal" label="总金额" width="180"   sortable>
				</el-table-column>

			</el-table>
		</template>

	</section>
</template>
<script>
// <!--引入echart-->
import echarts from 'echarts'
	import { selectOrdeByDay } from '../../api/api';
	//import NProgress from 'nprogress'
	export default {
        props: {
            className: {
                type: String,
                default: 'yourClassName'
            },
            id: {
                type: String,
                default: 'staticOrder'
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
				users: [
				],
                orderCountList: [],
                priceTotalList: [],
				timeList: [],
                chart: null,
			}
		},
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose();
            this.chart = null;
        },
		methods: {
			//支付状态转换
			formatPay: function (row, column) {
				return row.payStatus == 1 ? '未支付' : row.payStatus == 0 ? '已支付' : '未知';
			},
            //订单状态转换
            formatOrder: function (row, column) {
                return row.status == 1 ? '配送中' : row.payStatus == 0 ? '已取消' : '配送完成';
            },
            initChart() {
                this.chart = echarts.init(this.$refs.statisticOrderEchart);
                // 从后端请求数据
                        this.$message.success("统计数据如下");
                        this.chart.setOption({
                            color: ['#3398DB'],
                            title: {
                                text: '订餐数据分析'
                            },
                            //提示框组件
                            tooltip: {
                                trigger: 'axis', // 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。，item
                                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                data: this.timeList,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }],
                            yAxis: [{
                                type: 'value',
                                boundaryGap: false,
                            }],
                            //折线图上方的工具箱
                            toolbox: {
                                left: 'center',
                                feature: {
                                    dataZoom: {
                                        yAxisIndex: 'none'
                                    },
                                    restore: {},
                                    saveAsImage: {}
                                }
                            },
                            //区域缩放
                            dataZoom:[{
                                //绝对数值形式
                                startValue: '2014-06-01'
                            }, {
                                type: 'inside'
                            }],
                            series: [{
                                name: '订餐数量',
                                //bar：柱状图 line为折线图
                                type: 'line',
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
                            }],
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
                //前端测试
                // 把配置和数据放这里

            },
			//获取商品相关的 订单明细列表
			getUser: function () {
				// let para = {
				// 	name: this.filters.name
				// };
				this.loading = true;
				//NProgress.start();

                selectOrdeByDay().then((res) => {
                    if(res.data.status="0"){
                        this.users = res.data.data;
                        for (var user of res.data.data){
                            this.timeList.push(user.time);
							this.orderCountList.push(user.orderCount);
							this.priceTotalList.push(user.priceTotal);
						}
                        this.initChart();
                        this.loading = false;
					}else{
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
