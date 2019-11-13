<template>
  <div class="app-container">
    <el-form :model="dataForm">
      <el-form-item label="權限" prop="role">
        <el-select v-model="dataForm.role">
          <el-option v-for="(i,index) in roles" :key="index" :label="i.role" :value="i.role" />
        </el-select>
      </el-form-item>
      <el-form-item label="api" prop="apis">
        <el-checkbox-group v-model="dataForm.apis">
          <el-checkbox v-for="(i,index) in apiPaths" :key="index" :label="i.value">{{ i.key }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="findCheckApiAction">查詢</el-button>
        <el-button @click="saveAction">新增</el-button>
        <el-button @click="resetAction">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { query as roleQuery } from '@/views/admin/role/action'
import { findAll, save, findCheckApi } from './action'
export default {
  data() {
    return {
      roles: [],
      apiPaths: [],
      dataForm: {
        role: '',
        apis: []
      }
    }
  },
  mounted: function() {
    this.getAllRoleAction()
    this.getFindAllAction()
  },
  methods: {
    resetAction: function() {
      this.dataForm.role = ''
      this.dataForm.apis = []
    },
    findCheckApiAction: function() {
      this.dataForm.apis = []
      findCheckApi(this.dataForm).then(res => {
        if (res.status === 'OK') {
          this.dataForm.apis = res.data
        }
      })
    },
    saveAction: function() {
      save(this.dataForm).then(res => {
        if (res.status === 'OK') {
          alert(res.message)
        }
      })
    },
    getAllRoleAction: function() {
      roleQuery().then(res => {
        if (res.status === 'OK') {
          this.roles = res.data
        }
      })
    },
    getFindAllAction: function() {
      findAll().then(res => {
        if (res.status === 'OK') {
          this.apiPaths = res.data
          console.log(this.apiPaths)
        }
      })
    }
  }
}
</script>
