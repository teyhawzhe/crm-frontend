<template>
  <div class="app-container">
    <el-select v-model="parent">
      <el-option :label="i.title" :value="i.id.path" v-for="(i,index) in mainMenu" :key="index"></el-option>
    </el-select>
    <el-button @click="queryAction" type="primary" round>查詢</el-button>
    <el-button @click="sortAction" type="primary" round>更新排序</el-button>
    <el-button @click="pathAction" type="primary" round>PATH</el-button>
    <el-divider></el-divider>
    <el-table :data="table" ref="table" border style="width: 100%">
      <el-table-column label="編輯" fixed="left">
        <template slot-scope="scope">
          <el-button size="mini" @click="editAction(scope.$index, scope.row)">檢視</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed prop="title" label="子標題"></el-table-column>
      <el-table-column prop="id.path" label="子路徑"></el-table-column>
      <el-table-column prop="icon" label="大頭照">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column label="排序" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="moveUp(scope.$index, scope.row)">上移</el-button>
          <el-button size="mini" type="danger" @click="moveDown(scope.$index, scope.row)">下移</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="修改資料"
      :visible.sync="dialogFormVisible"
      label-width="100px"
      :close-on-click-modal="false"
    >
      <el-form :model="dialogData">
        <el-form-item label="主標題" prop="title">
          <el-select v-model="dialogData.parent">
            <el-option
              :label="i.title"
              :value="i.id.path"
              v-for="(i,index) in mainMenu"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="子標題" prop="title">
          <el-input v-model="dialogData.title" />
        </el-form-item>
        <el-form-item label="子路徑" prop="path">
          <el-input v-model="dialogData.path" />
        </el-form-item>
        <el-form-item label="ICON" prop="icon">
          <el-select v-model="dialogData.icon">
            <el-option :label="i" :value="i" v-for="(i,index) in iconItems.icons" :key="index">
              <span style="float: left">{{ i }}</span>
              <span style="float: right;">
                <svg-icon :icon-class="i" />
              </span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateAction">資料更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { query, sort, update, path } from './action'
import { responseHandler } from '@/utils/responseHandle'
import { Message } from 'element-ui'
import { insertValid } from './rule'
import { formData, iconItems } from './entity'
export default {
  data() {
    return {
      parent: '',
      mainMenu: [],
      formData: formData(),
      iconItems: iconItems(),
      rule: insertValid(),
      dialogFormVisible: false,
      dialogData: [],
      table: []
    }
  },
  mounted: function() {
    this.queryMainMenuAction()
  },
  methods: {
    pathAction: function() {
      path()
    },
    queryMainMenuAction: function() {
      query({ tier: 1 }).then(res => {
        if (res.status === 'ok') {
          this.mainMenu = res.data
        }
      })
    },
    updateAction: function() {
      update(this.dialogData).then(res => {
        responseHandler(res, res => {
          Message({
            message: res.data,
            showClose: true,
            type: 'success'
          })
          query({ tier: 2, parent: this.parent }).then(res => {
            if (res.status === 'ok') {
              this.table = res.data
            }
          })
        })
      })
    },
    editAction: function(index, row) {
      const dialogData = {
        oldParent: row.parent,
        oldPath: row.id.path,
        oldTitle: row.title,
        oldIcon: row.icon,
        path: row.id.path,
        title: row.title,
        icon: row.icon,
        parent: row.parent
      }
      this.dialogData = dialogData
      this.dialogFormVisible = true
    },
    sortAction: function() {
      var list = {
        list: this.table
      }
      sort(list).then(res => {
        responseHandler(res, res => {
          Message({
            message: res.data,
            showClose: true,
            type: 'success'
          })
          query({ tier: 2, parent: this.parent }).then(res => {
            if (res.status === 'ok') {
              this.table = res.data
            }
          })
        })
      })
    },
    queryAction: function() {
      if (this.parent === '') {
        alert('請選擇主目錄!')
        return false
      }

      query({ tier: 2, parent: this.parent }).then(res => {
        if (res.status === 'ok') {
          this.table = res.data
          Message({
            message: res.message,
            showClose: true,
            type: 'success'
          })
        }
      })
    },
    moveUp: function(index, row) {
      if (index > 0) {
        const upData = this.table[index - 1]
        this.table.splice(index - 1, 1)
        this.table.splice(index, 0, upData)
      } else {
        alert('已經是第一筆了!')
      }
    },
    moveDown: function(index, row) {
      if (index < this.table.length - 1) {
        const upData = this.table[index + 1]
        this.table.splice(index + 1, 1)
        this.table.splice(index, 0, upData)
      } else {
        alert('已經是最後一筆了!')
      }
    }
  }
}
</script>
