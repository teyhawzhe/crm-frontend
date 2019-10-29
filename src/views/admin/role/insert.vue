<template>
  <div class="app-container">
    <el-form :model="dataForm" :rules="rule" ref="dataForm" width="100" label-width="100px">
      <el-form-item label="權限角色" prop="role">
        <el-input v-model="dataForm.role" @input="uppercase()" />
      </el-form-item>
      <el-form-item label="權限敘述" prop="def">
        <el-input v-model="dataForm.def" />
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
import { Message } from 'element-ui'
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
            responseHandler(res, res => {
              Message({
                message: res.data,
                showClose: true,
                type: 'success'
              })
            })
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
