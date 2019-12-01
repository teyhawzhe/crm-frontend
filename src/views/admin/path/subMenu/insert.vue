<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form label-width="120px" :rules="rule" ref="formData" :model="formData">
        <el-form-item label="主目錄" prop="parent">
          <el-select v-model="formData.parent">
            <el-option
              :label="i.title"
              v-for="(i,index) in mainMenu"
              :value="i.id.path"
              :key="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="子標題" prop="title">
          <el-input v-model="formData.title" />
        </el-form-item>
        <el-form-item label="子路徑" prop="path">
          <el-input v-model="formData.path" />
        </el-form-item>
        <el-form-item label="ICON" prop="icon">
          <el-select v-model="formData.icon">
            <el-option :label="i" v-for="(i,index) in iconItems.icons" :value="i" :key="index">
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
import { query, insert } from './action'
import { responseHandler } from '@/utils/responseHandle'
import { insertValid } from './rule'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      mainMenu: [],
      formData: formData(),
      iconItems: iconItems(),
      rule: insertValid()
    }
  },
  mounted: function() {
    this.queryMainMenuAction()
  },
  methods: {
    queryMainMenuAction: function() {
      query({ tier: 1 }).then(res => {
        if (res.status === 'OK') {
          this.mainMenu = res.data
        }
      })
    },
    insert: function(formData) {
      this.$refs[formData].validate(valid => {
        if (valid) {
          insert(this.formData).then(res => {
            responseHandler(res, res => {
              Message({
                message: res.message,
                showClose: true,
                type: 'success'
              })
            })
          })
        }
      })
    },
    reset: function(formData) {
      this.$refs[formData].resetFields()
    }
  }
}
</script>
