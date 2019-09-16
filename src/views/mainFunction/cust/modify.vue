<template>
  <div class="app-container">
    <el-button @click="back()">回上一頁</el-button>
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="地區代號" prop="id.regionId">
        <el-select v-model="formData.regionId" placeholder="請選擇地區代號">
          <el-option label="台北" value="tp" />
          <el-option label="台中" value="tz" />
          <el-option label="台南" value="tn" />
          <el-option label="台東" value="td" />
        </el-select>
      </el-form-item>
      <el-form-item label="客戶代號">
        <el-input v-model="formData.custId" disabled placeholder="系統給定" />
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
        <el-button type="primary" @click="onSubmit('form')">更新</el-button>
        <el-button type="primary" @click="onSubmit('form')">刪除</el-button>
        <el-button @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import json from '@/dataModel/entity/TbCust'
import validation from '@/dataModel/validation/TbCust_entity'

export default {
  data() {
    return {
      formData: json,
      rules: validation,
      defaultValue: []
    }
  },
  mounted() {
    console.log('123', this.$route.query.foo)
    this.formData = this.$route.query.foo
    this.defaultValue = Object.assign({}, this.$route.query.foo)
  },
  methods: {
    onSubmit: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    reset: function() {
      this.formData = Object.assign({}, this.defaultValue)
      // Object.keys(this.formData).forEach(key => (this.formData[key] = ''))
      // this.$refs[formName].resetFields()
    },
    back: function() {
      this.$router.go(-1)
    }
  }
}
</script>
