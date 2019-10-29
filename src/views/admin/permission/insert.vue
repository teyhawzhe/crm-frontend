<template>
  <div class="app-container">
    <el-form :model="dataForm" label-width="100">
      <el-form-item label="路徑" prop="path">
        <el-select v-model="dataForm.path">
          <el-option :label="i.title" :value="i.path" v-for="(i,index) in paths" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="權限" prop="role">
        <el-checkbox-group v-model="dataForm.role">
          <el-checkbox-button
            :label="i.role"
            :value="i.role"
            v-for="(i,index) in roles"
            :key="index"
          ></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="insertAction">新增</el-button>
        <el-button v-test="testAction">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getAllPath } from './action'
import { query as roleQuery } from '@/views/admin/role/action'
export default {
  data() {
    return {
      paths: [],
      roles: [],
      dataForm: {
        path: '',
        role: []
      }
    }
  },
  mounted: function() {
    this.getAllPathAction()
    this.getAllRoleAction()
  },
  methods: {
    test: function(val) {
      console.log(this)
    },
    testAction: function() {
      alert(123123)
    },
    insertAction: function() {
      console.log(this.dataForm)
    },
    getAllRoleAction: function() {
      roleQuery().then(res => {
        if (res.status === 'ok') {
          this.roles = res.data
        }
      })
    },
    getAllPathAction: function() {
      getAllPath().then(res => {
        if (res.status === 'ok') {
          this.paths = JSON.parse(res.data)
        }
      })
    }
  }
}
</script>
