<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="商品名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="goodId" label="商品ID" width="120" sortable>
			</el-table-column>
			<el-table-column prop="goodName" label="名称" width="100"  sortable>
			</el-table-column>
			<el-table-column prop="introdece" label="描述" width="180" sortable>
			</el-table-column>
            <el-table-column prop="img" label="图片" width="100"  sortable>
            </el-table-column>
			<el-table-column prop="price" label="价格" width="120" sortable>
			</el-table-column>
			<el-table-column prop="total" label="数量" min-width="100" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="8" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="商品名" prop="goodName">
                    <el-input v-model="editForm.goodName" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="价格">
                    <el-input v-model="editForm.price" ></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input-number  v-model="editForm.total"></el-input-number>
                </el-form-item>

                <el-form-item label="描述">
                    <el-input type="textarea" v-model="editForm.introdece"></el-input>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="商品名" prop="goodName">
					<el-input v-model="addForm.goodName" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="价格">
					<el-input v-model="addForm.price" ></el-input>
				</el-form-item>
				<el-form-item label="数量">
					<el-input-number  v-model="addForm.total"></el-input-number>
				</el-form-item>

				<el-form-item label="描述">
					<el-input type="textarea" v-model="addForm.introdece"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeGood, batchRemoveUser, editGood, addGood } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
                    goodName: 'dd',
                    price:'3',
                    introdece: 'dd',
                    total: '44',
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
                    goodName: '',
                    price: 0,
                    introdece: '',
                    total: '',
                    //img:''
				}

			}
		},
		methods: {

			formatSex: function (row, column) {
			//	return row.sex == 1 ? 'sd' : row.sex == 0 ? 'df' : '未知';
				return null;
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取商品列表
			getUsers() {
				let para = {
					page: this.page,
                    pageSize: 8,
                    sort:1,
                    priceLevel:'all'
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
                    this.total = res.data.count;
					this.users = res.data.datalist;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { goodId: row.goodId };
                    removeGood(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
                        if(res.data.status="0"){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getUsers();
                        }else{
                            this.$message({
                                message: '删除失败',
                               // type: 'success'
                            });
                        }
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;

				this.editForm = Object.assign({}, row);
                //this.editForm=row;

			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
                    goodName: '',
                    price: 0.0,
                    introdece: '',
                    total: '0'
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let goods = Object.assign({}, this.editForm);

							editGood(goods).then((res) => {
								this.editLoading = false;
								//NProgress.done();
                                if(res.status="0"){
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.$refs['editForm'].resetFields();
                                    this.editFormVisible = false;
                                    this.getUsers();
                                }else{
                                    this.$message({
                                        message: '提交失败',
                                        type: ''
                                    });
                                }


							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();

							let goods = Object.assign({}, this.addForm);
						//	para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            addGood(goods).then((res) => {
                                if(res.status="0"){
                                    this.addLoading = false;
                                    //NProgress.done();
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.$refs['addForm'].resetFields();
                                    this.addFormVisible = false;
                                    this.getUsers();
                                }else{
                                    this.$message({
                                        message: '提交失败',
                                        type: ''
                                    });
                                }

							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>