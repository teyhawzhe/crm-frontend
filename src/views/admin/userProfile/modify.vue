<template>
  <div class="app-container">
    <el-form :model="form" label-width="150px">
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
        <el-button @click="submit()">查詢</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { queryForm } from '@/dataModel/entity/user'
export default {
  data() {
    return {
      form: queryForm()
    }
  },
  methods: {
    submit: function() {
      console.log(this.form)
    }
  }
}
</script>
