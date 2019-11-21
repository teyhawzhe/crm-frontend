<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="dataForm" label-width="100px">
      <el-form-item label="權限" prop="role">
        <el-select v-model="dataForm.role">
          <el-option v-for="(i,index) in roles" :key="index" :label="i.role" :value="i.role" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="queryAction">查詢</el-button>
        <el-button @click="insertAction">新增</el-button>
        <el-button @click="resetAction">重置</el-button>
      </el-form-item>
      <el-form-item label="階層">
        <el-tree
          ref="tree"
          :data="tree"
          show-checkbox
          label="title"
          children="children"
          node-key="id"
          default-expand-all
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getAllPath, save, query } from './action'
import { insertFuncPermissionValid } from './rule'
import { query as roleQuery } from '@/views/admin/role/action'
export default {
  data() {
    return {
      tree: [],
      paths: [],
      roles: [],
      rules: insertFuncPermissionValid(),
      dataForm: {
        excludePaths: [],
        paths: [],
        role: ''
      }
    }
  },
  mounted: function() {
    this.getTreeAction()
    this.getAllRoleAction()
  },
  methods: {
    resetAction: function() {
      this.$refs.form.resetFields()
      this.dataForm.paths = []
      this.dataForm.excludePaths = []
      this.getTreeAction()
    },
    queryAction: function() {
      this.$refs.form.validate(valid => {
        if (valid) {
          query({ role: this.dataForm.role }).then(res => {
            if (res.status === 'OK') {
              if (res.data.length === 0) {
                alert('查無資料!')
                this.resetAction()
              } else {
                const arr = []
                this.checkNode(arr, this.tree, res.data)
                this.$refs.tree.setCheckedNodes(arr)
              }
            }
          })
        }
      })
    },
    checkNode: function(arr, tree, data) {
      tree.forEach(element => {
        if (element.children) {
          this.checkNode(arr, element.children, data)
        } else if (data.includes(element.id)) {
          const json = { id: element.id, label: element.label }
          arr.push(json)
        }
      })
    },
    insertAction: function() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const tree = this.$refs.tree
            .getCheckedKeys()
            .concat(this.$refs.tree.getHalfCheckedKeys())
          tree.forEach(id => {
            this.dataForm.paths.push(id)
          })

          const arr = []
          this.popAllNodeAction(arr, this.tree)
          this.dataForm.excludePaths = arr
          save(this.dataForm).then(res => {
            if (res.status === 'OK') {
              alert('執行成功!')
            } else {
              alert('執行失敗!')
            }
          })
        }
      })
    },
    popAllNodeAction: function(arr, node) {
      node.forEach(element => {
        arr.push(element.id)
        if (element.children) {
          this.popAllNodeAction(arr, element.children)
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
    getTreeAction: function() {
      getAllPath().then(res => {
        if (res.status === 'OK') {
          this.tree = JSON.parse(res.data)
        }
      })
    }
  }
}
</script>
