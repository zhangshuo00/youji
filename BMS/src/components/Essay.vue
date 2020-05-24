<template>
  	<div id="essay">
		<el-table
			:data="tableData"
			style="width: 92%;margin-left:5%;margin-top:2%"
			max-height="600">
			<el-table-column
			fixed
			prop="chid"
			label="chid"
			width="60">
			</el-table-column>
			<el-table-column
			prop="uid"
			label="uid"
			width="100">
			</el-table-column>
			<el-table-column
			prop="title"
			label="标题"
			width="150">
			</el-table-column>
			<el-table-column
			prop="context"
			label="内容"
			width="680">
			</el-table-column>
			<el-table-column
			prop="chdate"
			label="发布日期"
			width="120">
			</el-table-column>
			<el-table-column
			prop="isShare"
			label="是否分享"
			width="50">
			</el-table-column>
			<el-table-column
			fixed="right"
			label="操作"
			width="80">
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
	name: 'essay',
	    data() {
      	return{
			key: 'admin',
			tableData: []
      	}
    },
    methods:{
		getChapter: function(){
			this.axios.get('/backGetChapter',{
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
		this.getChapter();
	}
}
</script>

<style>

</style>