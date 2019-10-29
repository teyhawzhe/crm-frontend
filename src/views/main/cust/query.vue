<template>
  <div class="app-container">
    <el-form v-if="!showTable" ref="form" :model="formData" label-width="120px">
      <el-form-item label="地區代號" prop="regionId">
        <el-select v-model="formData.regionId" placeholder="請選擇地區代號">
          <el-option label="" value="" />
          <el-option label="台北" value="TP" />
          <el-option label="台中" value="TZ" />
          <el-option label="台南" value="TN" />
          <el-option label="台東" value="TD" />
        </el-select>
      </el-form-item>
      <el-form-item label="客戶代號" prop="custId">
        <el-input v-model="formData.custId" placeholder="請輸入客戶代號" :width="217" />
      </el-form-item>
      <el-form-item label="客戶類別" prop="personType">
        <el-radio-group v-model="formData.personType">
          <el-radio label="1">本國人</el-radio>
          <el-radio label="2">外國人</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="本地名字" prop="locName">
        <el-input v-model="formData.locName" placeholder="請輸入本地名字" />
      </el-form-item>
      <el-form-item label="英文名字" prop="engName">
        <el-input v-model="formData.engName" placeholder="請輸入英文名字" />
      </el-form-item>
      <el-form-item label="客戶等級" prop="custLevel">
        <el-select v-model="formData.custLevel" placeholder="請選擇客戶等級">
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
    <div v-if="showTable">
      <el-button circle @click="show()"><v-icon name="arrow-circle-left" scale="2" /></el-button>
      <HR />
      <el-table v-if="showTable" :data="tableData" height="500" border style="width: 1000px;">
        <el-table-column
          fixed="left"
          label="編輯"
          width="50"
        >
          <template slot-scope="scope">
            <el-button icon="el-icon-search" circle type="primary" size="small" @click="handleClick(scope.row)"></el-button>
          </template>
        </el-table-column>
        <el-table-column v-if="false" prop="regionId" label="地區代號" />
        <el-table-column fixed prop="regionIdName" label="地區代號" width="100" />
        <el-table-column prop="custId" label="客戶代號" width="100" />
        <el-table-column prop="personType" label="客戶類別" width="120" />
        <el-table-column prop="locName" label="本地名字" width="120" />
        <el-table-column prop="engName" label="英文名字" width="120" />
        <el-table-column v-if="false" prop="custLevel" label="客戶等級" />
        <el-table-column v-if="false" prop="personId" label="身分證號" />
        <el-table-column prop="custLevelName" label="客戶等級" width="auto" />
      </el-table>
      <div class="block">
        <el-pagination
          :page-size="formData.pageSize"
          :total="formData.total"
          :current-page.sync="formData.current"
          layout="prev, pager, next, jumper"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <el-dialog title="修改資料" :visible.sync="dialogFormVisible" label-width="100px" :close-on-click-modal="false">
        <el-form :model="dialogData">
          <el-form-item label="地區代號" prop="regionId">
            <el-select v-model="dialogData.regionId" disabled placeholder="請選擇地區代號">
              <el-option label="" value="" />
              <el-option label="台北" value="TP" />
              <el-option label="台中" value="TZ" />
              <el-option label="台南" value="TN" />
              <el-option label="台東" value="TD" />
            </el-select>
          </el-form-item>
          <el-form-item label="客戶代號" prop="custId">
            <el-input v-model="dialogData.custId" disabled placeholder="請輸入客戶代號" style="width:217px;" />
          </el-form-item>
          <el-form-item label="客戶類別" prop="personType">
            <el-radio-group v-model="dialogData.personType">
              <el-radio label="1">本國人</el-radio>
              <el-radio label="2">外國人</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="本地名字" prop="locName">
            <el-input v-model="dialogData.locName" placeholder="請輸入本地名字" style="width:217px;" />
          </el-form-item>
          <el-form-item label="英文名字" prop="engName">
            <el-input v-model="dialogData.engName" placeholder="請輸入英文名字" style="width:217px;" />
          </el-form-item>
          <el-form-item label="身份證字號" prop="personId">
            <el-input v-model="dialogData.personId" placeholder="請輸入身份證字號" style="width:217px;" />
          </el-form-item>
          <el-form-item label="客戶等級" prop="custLevel">
            <el-select v-model="dialogData.custLevel" placeholder="請選擇客戶等級">
              <el-option label="Normal" value="1" />
              <el-option label="Middle" value="2" />
              <el-option label="VIP" value="3" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="update()">資料更新</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { query, modify } from '@/api/cust'
// import { queryXml } from '@/api/custXml'
import { Message } from 'element-ui'
import json from '@/dataModel/query/custForm'
import { responseHandler } from '@/utils/responseHandle'

export default {
  data() {
    return {
      formData: Object.assign({}, json),
      tableData: [],
      dialogFormVisible: false,
      dialogData: [],
      showTable: false
    }
  },
  methods: {
    onSubmit: function() {
      this.tableData = []
      this.formData.total = 0
      this.formData.pageSize = 10
      this.current = 1
      this.queryMethod()
    },
    queryMethod: function() {
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
          this.tableData = response.data
          this.formData.total = response.total
        }
      })
    },
    reset: function(formName) {
      // Object.keys(this.formData).forEach(key => (this.formData[key] = ''))
      this.$refs[formName].resetFields()
      this.showTable = false
    },
    handleCurrentChange: function(val) {
      this.queryMethod()
    },
    show: function() {
      this.showTable = false
      this.tableData = []
    },
    handleClick: function(val) {
      console.log(val)
      this.dialogFormVisible = true
      this.dialogData = Object.assign({}, val)
    },
    update: function() {
      modify(this.dialogData).then(response => {
        responseHandler(response,
          response => {
            this.queryMethod()
          }
        )
      })
    }
  }
}
</script>
