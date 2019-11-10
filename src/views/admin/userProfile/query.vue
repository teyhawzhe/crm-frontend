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
          <el-option label value />
          <el-option v-for="(i,index) in roles" :key="index" :label="i.role" :value="i.role" />
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
      <el-table-column fixed="left" label="編輯" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogAction(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="IMAGE" label="大頭照">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.IMAGE" />
        </template>
      </el-table-column>
      <el-table-column prop="USERNAME" label="帳號" width="180" />
      <el-table-column prop="NAME" label="姓名" width="180" />
      <el-table-column prop="ROLE" label="權限" />
      <el-table-column prop="CREATER" label="建立者" />
      <el-table-column prop="CREATE_DATE" label="建立時間" />
      <el-table-column prop="ENABLE" label="權限" :formatter="enableFormat" />
    </el-table>

    <el-dialog title="編輯" :visible.sync="dialogDisplay">
      <el-form ref="dialogForm" label-width="150px" :model="dialogForm" :rules="rules">
        <el-form-item prop="image">
          <el-upload
            class="avatar-uploader"
            accept="image/jpeg, image/png"
            action
            :auto-upload="false"
            :show-file-list="false"
            :multiple="false"
            :limit="101"
            :on-change="handleAvatarSuccess"
          >
            <img v-if="dialogForm.image" :src="dialogForm.image" class="avatar" >
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="dialogForm.name" />
        </el-form-item>
        <el-form-item label="帳號" prop="username">
          <el-input v-model="dialogForm.username" disabled />
        </el-form-item>
        <el-form-item label="權限" prop="roles">
          <el-checkbox-group v-model="dialogForm.roles">
            <el-checkbox-button
              v-for="(i,index) in roles"
              :key="index"
              :label="i.role"
              name="roles"
            />
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDisplay = false">取 消</el-button>
        <el-button @click="dialogDeleteAction">刪除</el-button>
        <el-button @click="dialogUpdateAction">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import { queryForm } from './entity'
import { query, queryRole, deleteUser, update } from './action'
import { insertFormRules } from './rule'
export default {
  data() {
    return {
      form: queryForm(),
      tableData: [],
      roles: [],
      rules: insertFormRules(),
      dialogDisplay: false,
      dialogForm: {
        image: '',
        name: '',
        username: '',
        roles: []
      }
    }
  },
  mounted() {
    this.queryRoleAction()
  },
  methods: {
    dialogUpdateAction: function() {
      console.log(this.dialogForm)
      update(this.dialogForm).then(res => {
        alert(res.message)
      })
    },
    dialogDeleteAction: function() {
      deleteUser({ username: this.dialogForm.username }).then(res => {
        alert(res.message)
      })
    },
    handleAvatarSuccess: function(file, fileList) {
      const isLt2M = file.raw.size / 1024 / 1024 < 2
      const isJPG =
        file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
        return false
      }

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = () => {
        this.form.image = reader.result
      }
    },
    queryRoleAction: function() {
      queryRole().then(res => {
        if (res.status === 'OK') {
          this.roles = res.data
        }
      })
    },
    dialogAction: function(row) {
      this.dialogDisplay = true
      this.dialogForm.image = row.IMAGE
      this.dialogForm.name = row.NAME
      this.dialogForm.username = row.USERNAME
      var str = row.ROLE.split(',')
      this.dialogForm.roles = str
      console.log(row)
    },
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

        if (status === 'EXCEPTION') {
          Message({
            message: response.data,
            showClose: true,
            type: 'error',
            duration: 3 * 1000
          })
        } else if (status === 'EMPTY') {
          Message({
            message: response.message,
            showClose: true,
            type: 'success',
            duration: 3 * 1000
          })
          this.showTable = false
          this.tableData = []
        } else if (status === 'OK') {
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
