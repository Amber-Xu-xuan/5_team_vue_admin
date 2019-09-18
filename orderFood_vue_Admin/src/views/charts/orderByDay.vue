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
	import { selectOrdeByDay } from '../../api/api';
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

                selectOrdeByDay().then((res) => {
                    if(res.data.status="0"){
                        this.users = res.data.data;
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