<template>
  <div class="app-container">
    <el-form ref="form" :model="formData" label-width="auto">
      <el-form-item label="地區代號" prop="regionId">
        <el-select v-model="formData.regionId" placeholder="請選擇地區代號" style="width:217px">
          <el-option label="" value="" />
          <el-option label="台北" value="TP" />
          <el-option label="台中" value="TZ" />
          <el-option label="台南" value="Tn" />
          <el-option label="台東" value="TD" />
        </el-select>
      </el-form-item>
      <el-form-item label="客戶代號" prop="custId">
        <el-input v-model="formData.custId" placeholder="請輸入客戶代號" style="width:217px" />
      </el-form-item>
      <el-form-item label="客戶類別" prop="personType">
        <el-radio-group v-model="formData.personType">
          <el-radio label="1">本國人</el-radio>
          <el-radio label="2">外國人</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="本地名字" prop="locName">
        <el-input v-model="formData.locName" placeholder="請輸入本地名字" style="width:217px" />
      </el-form-item>
      <el-form-item label="英文名字" prop="engName">
        <el-input v-model="formData.engName" placeholder="請輸入英文名字" style="width:217px" />
      </el-form-item>
      <el-form-item label="客戶等級" prop="custLevel">
        <el-select v-model="formData.custLevel" placeholder="請選擇客戶等級" style="width:217px">
          <el-option label="Normal" value="1" />
          <el-option label="Middle" value="2" />
          <el-option label="VIP" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">查詢</el-button>
        <el-button @click="reset('form')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-if="showTable" :data="tableData" :stripe="true">
      <el-table-column fixed prop="custId" label="地區代號" width="100" />
      <el-table-column prop="regionId" label="客戶代號" width="120" />
      <el-table-column prop="personType" label="客戶類別" width="120" />
      <el-table-column prop="locName" label="本地名字" width="120" />
      <el-table-column prop="engName" label="英文名字" width="120" />
      <el-table-column prop="custLevel" label="客戶等級" width="120" />
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="showTable" class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="formData.currentPage"
        :page-size="pageNum"
        layout="prev, pager, next, jumper"
        :total="formData.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { query } from '@/api/cust'
import { Message } from 'element-ui'
import json from '@/dataModel/query/TbCust'
export default {
  data() {
    return {
      formData: Object.assign({}, json),
      tableData: [],
      showTable: false,
      pageNum: 10
    }
  },
  methods: {
    onSubmit: function() {
      this.formData.total = 0
      this.formData.currentPage = 1
      this.queryData()
    },
    queryData: function() {
      query(this.formData).then(response => {
        var status = response.status
        if (status === 'exception') {
          Message({
            message: response.data,
            showClose: true,
            type: 'error',
            duration: 3 * 1000
          })
        } else if (status === 'empty') {
          Message({
            message: '查無資料',
            showClose: true,
            type: 'success',
            duration: 3 * 1000
          })
          this.showTable = false
          this.tableData = []
        } else if (status === 'ok') {
          Message({
            message: '查詢成功',
            showClose: true,
            type: 'success',
            duration: 1 * 1000
          })
          this.showTable = true
          this.tableData = []
          this.tableData = response.data
          this.formData.total = response.total
          this.formData.currentPage = response.current
          console.log('this.pageSize', response.current)
        }
      })
    },
    reset: function(formName) {
      // Object.keys(this.formData).forEach(key => (this.formData[key] = ''))
      this.$refs[formName].resetFields()
      this.showTable = false
    },
    handleEdit(index, row) {
      this.$router.push({ path: '/mainFunction/cust/modify', query: { foo: row }})
    },
    handleCurrentChange(val) {
      this.formData.currentPage = val
      console.log(`current page: ${val}`)
      this.queryData()
    }
  }
}
</script>
