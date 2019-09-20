<template>
  <div class="app-container">
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="地區代號" prop="id.regionId">
        <el-select v-model="formData.id.regionId" placeholder="請選擇地區代號">
          <el-option label="台北" value="tp" />
          <el-option label="台中" value="tz" />
          <el-option label="台南" value="tn" />
          <el-option label="台東" value="td" />
        </el-select>
      </el-form-item>
      <el-form-item label="客戶代號">
        <el-input v-model="formData.id.custId" disabled placeholder="系統給定" />
      </el-form-item>
      <el-form-item label="客戶類別" prop="personType">
        <el-radio-group v-model="formData.personType">
          <el-radio label="1">本國人</el-radio>
          <el-radio label="2">外國人</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份證字號" prop="personId">
        <el-input v-model="formData.personId" placeholder="請輸入身份證字號" />
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
        <el-button type="primary" @click="onSubmit('form')">新增</el-button>
        <el-button @click="reset('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { insert } from '@/api/cust'
import { responseHander } from '@/utils/responseHandle'
import json from '@/dataModel/entity/TbCust'
import validation from '@/dataModel/validation/TbCust_entity'

export default {
  data() {
    return {
      formData: Object.assign({}, json),
      rules: validation
    }
  },
  methods: {
    onSubmit: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          insert(this.formData).then(response => {
            responseHander(response,
              response => {
                this.formData.id.custId = response.data
              }
            )
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    reset: function(formName) {
      // Object.keys(this.formData).forEach(key => (this.formData[key] = ''))
      this.$refs[formName].resetFields()
    }
  }
}
</script>
