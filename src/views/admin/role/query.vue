<template>
  <div class="app-container">
    <el-button type="primary" @click="queryAction">查詢</el-button>
    <el-divider></el-divider>
    <el-table border :data="formData" style="width: 100%">
      <el-table-column fixed="left" label="編輯" width="100">
        <template slot-scope="scope">
          <el-button @click="dialogAction(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="role" label="權限角色" width="180"></el-table-column>
      <el-table-column prop="def" label="權限敘述" width="180"></el-table-column>
    </el-table>

    <el-dialog title="編輯" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm">
        <el-form-item label="權限角色" prop="role">
          <el-input v-model="dialogForm.role" @input="uppercase()" />
        </el-form-item>
        <el-form-item label="權限敘述" prop="def">
          <el-input v-model="dialogForm.def" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary">刪除</el-button>
        <el-button type="primary">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { query } from './action'
import { responseHandler } from '@/utils/responseHandle'
export default {
  data() {
    return {
      formData: [],
      dialogFormVisible: false,
      dialogForm: []
    }
  },
  methods: {
    dialogAction: function(row) {
      this.dialogForm = row
      this.dialogFormVisible = true
    },
    queryAction: function() {
      query().then(res => {
        if (res.status === 'ok') {
          this.formData = res.data
        }
      })
    }
  }
}
</script>
