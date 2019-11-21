<template>
  <div class="app-container">
    <el-form ref="dataForm" :model="dataForm" :rules="rule" width="100" label-width="100px">
      <el-form-item label="權限角色" prop="role">
        <el-input v-model="dataForm.role" @input="uppercase()" />
      </el-form-item>
      <el-form-item label="權限敘述" prop="def">
        <el-input v-model="dataForm.def" />
      </el-form-item>
      <el-form-item label="狀態" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio-button label="true">已啟用</el-radio-button>
          <el-radio-button label="false">未啟用</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="insertAction('dataForm')">新增</el-button>
        <el-button type="primary" @click="reset('dataForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { insertForm } from './entity'
import { validInsertForm } from './rule'
import { insert } from './action'
export default {
  data() {
    return {
      dataForm: insertForm(),
      rule: validInsertForm()
    }
  },
  methods: {
    uppercase: function() {
      this.dataForm.role = this.dataForm.role.toUpperCase()
    },
    insertAction: function(dataForm) {
      this.$refs[dataForm].validate(valid => {
        if (valid) {
          insert(this.dataForm).then(res => {
            if (res.status === 'OK') {
              alert('新增成功!')
            } else {
              alert('新增失敗!')
            }
          })
        }
      })
    },
    reset: function(dataForm) {
      this.$refs[dataForm].resetFields()
    }
  }
}
</script>
