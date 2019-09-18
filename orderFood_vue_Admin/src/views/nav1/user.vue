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
				<el-table-column prop="goodId" label="商品ID" width="120" sortable>
				</el-table-column>
				<el-table-column prop="goodsName" label="商品名称" width="120" sortable>
				</el-table-column>
				<el-table-column prop="goodsNum" label="商品销售量" width="100" :formatter="formatSex" sortable>
				</el-table-column>
				<el-table-column prop="goodsTotalPrice" label="商品总销售额" width="120" :formatter="formatPrice"  sortable>
				</el-table-column>
				<el-table-column prop="orderCount" label="订单数量" min-width="180" sortable>
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>
<script>
	import { getGoodsList } from '../../api/api';
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
			//null 处理
			formatSex: function (row, column) {
				return row.goodsNum == null ? '0' : row.goodsNum;
			},
            formatPrice :function(row, column){
                return row.goodsTotalPrice == null ? '0' : row.goodsTotalPrice;
			},
			//获取商品相关的 订单明细列表
			getUser: function () {
				// let para = {
				// 	name: this.filters.name
				// };
				this.loading = true;
				//NProgress.start();

                getGoodsList().then((res) => {
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