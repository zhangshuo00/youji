<template>
  	<div id="user">
		<el-table
			:data="tableData"
			style="width: 80%;margin-left:10%;margin-top:2%"
			max-height="600">
			<el-table-column
			fixed
			prop="uid"
			label="uid"
			width="150">
			</el-table-column>
			<el-table-column
			prop="uemail"
			label="邮箱"
			width="200">
			</el-table-column>
			<el-table-column
			prop="uname"
			label="昵称"
			width="120">
			</el-table-column>
			<el-table-column
			prop="usex"
			label="性别"
			width="120">
			</el-table-column>
			<el-table-column
			prop="signature"
			label="个性签名"
			width="300">
			</el-table-column>
			<el-table-column
			prop="registration_date"
			label="注册日期"
			width="120">
			</el-table-column>
			<el-table-column
			fixed="right"
			label="操作"
			width="120">
			<template slot-scope="scope">
				<el-button
				@click.native.prevent="deleteRow(scope.$index, tableData)"
				type="text"
				size="small">
				移除
				</el-button>
			</template>
			</el-table-column>
		</el-table>
  	</div>
</template>

<script>
export default {
    name: 'user',
    data() {
      	return{
			key: 'admin',
			tableData: []
      	}
    },
    methods:{
		getUser: function(){
			this.axios.get('/backGetUsers',{
				params:{
					key: this.key
				}
			}).then(res=>{
				this.tableData = res.data;
			})
		},
		deleteRow(index, rows) {
        	rows.splice(index, 1);
      	}
	},
	mounted(){
		this.getUser();
	}
}
</script>

<style>

</style>