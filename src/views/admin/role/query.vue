<template>
  <div class="app-container">
    <el-button type="primary" @click="queryAction">查詢</el-button>
    <el-divider />
    <el-table border :data="formData" style="width: 100%">
      <el-table-column fixed="left" label="編輯" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogAction(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50" />
      <el-table-column prop="role" label="權限角色" width="180" />
      <el-table-column prop="def" label="權限敘述" width="180" />
      <el-table-column prop="status" label="狀態" width="180" :formatter="statusFormatter" />
    </el-table>

    <el-dialog title="編輯" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm">
        <el-form-item label="權限角色" prop="role">
          <el-input v-model="dialogForm.role" disabled @input="uppercase()" />
        </el-form-item>
        <el-form-item label="權限敘述" prop="def">
          <el-input v-model="dialogForm.def" />
        </el-form-item>
        <el-form-item label="狀態" prop="status">
          <el-radio-group v-model="dialogForm.status">
            <el-radio-button label="true">已啟用</el-radio-button>
            <el-radio-button label="false">未啟用</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteAction">刪除</el-button>
        <el-button type="primary" @click="updateAction">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { query, update, deleteRole } from './action'
export default {
  data() {
    return {
      formData: [],
      dialogFormVisible: false,
      dialogForm: []
    }
  },
  methods: {
    statusFormatter: function(row, column) {
      return row.status === true ? '已啟用' : '未啟用'
    },
    deleteAction: function() {
      deleteRole(this.dialogForm).then(res => {
        if (res.status === 'OK') {
          alert('刪除成功!')
          this.queryAction()
          this.dialogFormVisible = false
        } else {
          alert('刪除失敗!')
        }
      })
    },
    updateAction: function() {
      update(this.dialogForm).then(res => {
        if (res.status === 'OK') {
          alert('更新成功!')
          this.queryAction()
          this.dialogFormVisible = false
        } else {
          alert('更新失敗!')
        }
      })
    },
    dialogAction: function(row) {
      this.dialogForm = row
      this.dialogFormVisible = true
    },
    queryAction: function() {
      query().then(res => {
        if (res.status === 'OK') {
          this.formData = res.data
        }
      })
    }
  }
}
</script>
