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
			<el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="orderId" label="订单ID" width="120" sortable>
				</el-table-column>
				<el-table-column prop="orderTel" label="下单人账号" width="120" sortable>
				</el-table-column>
				<el-table-column prop="payStatus" label="支付状态" width="100" :formatter="formatPay"  sortable>
				</el-table-column>
				<el-table-column prop="status" label="订单状态" width="120" :formatter="formatOrder" sortable>
				</el-table-column>
				<el-table-column prop="ordTime" label="下单时间" min-width="180" sortable>
				</el-table-column>
				<el-table-column prop="money" label="订单金额" min-width="100" sortable>
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>
<script>
	import { getOrderDetail } from '../../api/api';
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				loading: false,
				users: [
				]
			}
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
			//获取商品相关的 订单明细列表
			getUser: function () {
				// let para = {
				// 	name: this.filters.name
				// };
				this.loading = true;
				//NProgress.start();

                getOrderDetail().then((res) => {
                    if(res.data.status="0"){
                        this.users = res.data.dataList;
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