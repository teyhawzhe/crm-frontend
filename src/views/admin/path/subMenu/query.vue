<template>
  <div class="app-container">
    <el-select v-model="parent">
      <el-option v-for="(i,index) in mainMenu" :key="index" :label="i.title" :value="i.id.path" />
    </el-select>
    <el-button type="primary" round @click="queryAction">查詢</el-button>
    <el-button type="primary" round @click="sortAction">更新排序</el-button>
    <el-button type="primary" round @click="pathAction">PATH</el-button>
    <el-divider />
    <el-table ref="table" :data="table" border style="width: 100%">
      <el-table-column label="編輯" fixed="left">
        <template slot-scope="scope">
          <el-button size="mini" @click="editAction(scope.$index, scope.row)">檢視</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed prop="id.path" label="子路徑" />
      <el-table-column prop="title" label="子標題" />
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
          <el-select v-model="dialogData.parent" disabled>
            <el-option
              v-for="(i,index) in mainMenu"
              :key="index"
              :label="i.title"
              :value="i.id.path"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="子路徑" prop="path">
          <el-input v-model="dialogData.path" disabled />
        </el-form-item>
        <el-form-item label="子標題" prop="title">
          <el-input v-model="dialogData.title" />
        </el-form-item>
        <el-form-item label="ICON" prop="icon">
          <el-select v-model="dialogData.icon">
            <el-option v-for="(i,index) in iconItems.icons" :key="index" :label="i" :value="i">
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
        <el-button @click="dialogDeleteAction">刪 除</el-button>
        <el-button type="primary" @click="updateAction">更 新</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { query, sort, update, path, deletePath } from './action'
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
    dialogDeleteAction: function() {
      deletePath(this.dialogData).then(res => {
        if (res.status === 'OK') {
          alert(res.message)
          this.queryAction()
          this.dialogFormVisible = false
        } else {
          alert(res.message)
        }
      })
    },
    pathAction: function() {
      path()
    },
    queryMainMenuAction: function() {
      query({ tier: 1 }).then(res => {
        if (res.status === 'OK') {
          this.mainMenu = res.data
        }
      })
    },
    updateAction: function() {
      update(this.dialogData).then(res => {
        responseHandler(res, res => {
          Message({
            message: res.message,
            showClose: true,
            type: 'success'
          })
          query({ tier: 2, parent: this.parent }).then(res => {
            if (res.status === 'OK') {
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
        parent: row.parent,
        tier: row.id.tier
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
            message: res.message,
            showClose: true,
            type: 'success'
          })
          query({ tier: 2, parent: this.parent }).then(res => {
            if (res.status === 'OK') {
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
        if (res.status === 'OK') {
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
