<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="帳號" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="權限" prop="role">
        <el-select v-model="form.role" placeholder="請選擇">
          <el-option label value></el-option>
          <el-option label="ADMIN" value="ADMIN" />
          <el-option label="USER" value="USER" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-shortkey="['f6']" @shortkey.native="submit()" @click="submit()">查詢[F6]</el-button>
        <el-button
          v-shortkey="['f9']"
          @shortkey.native="reset('form')"
          @click="reset('form')"
        >重置[F9]</el-button>
      </el-form-item>
    </el-form>
    <el-divider>
      <H3>查詢結果</H3>
    </el-divider>
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="IMAGE" label="大頭照">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.IMAGE"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="USERNAME" label="帳號" width="180"></el-table-column>
      <el-table-column prop="NAME" label="姓名" width="180"></el-table-column>
      <el-table-column prop="ROLE" label="權限"></el-table-column>
      <el-table-column prop="CREATER" label="建立者"></el-table-column>
      <el-table-column prop="CREATE_DATE" label="建立時間"></el-table-column>
      <el-table-column prop="ENABLE" label="權限" :formatter="enableFormat"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import { queryForm } from '@/dataModel/entity/user'
import { query } from '@/api/userRegister'
export default {
  data() {
    return {
      form: queryForm(),
      tableData: []
    }
  },
  methods: {
    enableFormat: function(row, column, cellValue, index) {
      if (row.ENABLE === true) {
        return '授權'
      }
      return '被鎖'
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    submit: function() {
      query(this.form).then(response => {
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
            message: response.message,
            showClose: true,
            type: 'success',
            duration: 3 * 1000
          })
          this.showTable = false
          this.tableData = []
        } else if (status === 'ok') {
          Message({
            message: response.message,
            showClose: true,
            type: 'success',
            duration: 1 * 1000
          })
          this.tableData = response.data
        }
      })
    },
    reset: function(formName) {
      this.$refs[formName].resetFields()
      this.tableData = []
    }
  }
}
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
