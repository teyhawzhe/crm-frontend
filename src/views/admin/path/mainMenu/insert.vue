<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form label-width="120px" :rules="rule" :model="formData" ref="formData">
        <el-form-item label="主目錄" prop="title">
          <el-input v-model="formData.title" />
        </el-form-item>
        <el-form-item label="主路徑" prop="path">
          <el-input v-model="formData.path" />
        </el-form-item>
        <el-form-item label="ICON" prop="icon">
          <el-select v-model="formData.icon">
            <el-option :label="i" :value="i" v-for="(i,index) in iconItems.icons" :key="index">
              <span style="float: left">{{ i }}</span>
              <span style="float: right;">
                <svg-icon :icon-class="i" />
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="insert('formData')">新增</el-button>
          <el-button type="primary" @click="reset('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { formData, iconItems } from './entity'
import { insert } from './action'
import { responseHandler } from '@/utils/responseHandle'
import { insertValid } from './rule'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      formData: formData(),
      iconItems: iconItems(),
      rule: insertValid()
    }
  },
  methods: {
    insert: function(formData) {
      this.$refs[formData].validate(valid => {
        if (valid) {
          insert(this.formData).then(res => {
            responseHandler(res, res => {
              Message({
                message: res.data,
                showClose: true,
                type: 'success'
              })
            })
          })
          console.log(this.formData)
        }
      })
    },
    reset: function(formData) {
      this.$refs[formData].resetFields()
    }
  }
}
</script>
