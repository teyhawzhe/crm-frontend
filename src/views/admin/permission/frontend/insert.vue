<template>
  <div class="app-container">
    <el-form ref="dataForm" :rules="rule" :model="dataForm" label-width="100">
      <el-form-item label="路徑" prop="path">
        <el-select v-model="dataForm.path">
          <el-option v-for="(i,index) in paths" :key="index" :label="i.title" :value="i.path" />
        </el-select>
      </el-form-item>
      <el-form-item label="權限" prop="role">
        <el-checkbox-group v-model="dataForm.role">
          <el-checkbox-button
            v-for="(i,index) in roles"
            :key="index"
            :label="i.role"
            :value="i.role"
          />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="insertAction">新增</el-button>
        <el-button @click="resetAction">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getAllPath, save } from './action'
import { save as saveValid } from './rule'
import { query as roleQuery } from '@/views/admin/role/action'
export default {
  data() {
    return {
      paths: [],
      roles: [],
      rule: saveValid(),
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
    resetAction: function() {
      this.$refs.dataForm.resetFields()
    },
    insertAction: function() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          save(this.dataForm)
        }
      })
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
