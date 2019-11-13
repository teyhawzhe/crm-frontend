<template>
  <el-tabs type="border-card">
    <el-tab-pane label="前端權限管理">
      <frontend />
    </el-tab-pane>
    <el-tab-pane label="後端API管理">
      <backend />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import frontend from './frontend/index'
import backend from './backend/index'
export default {
  components: { frontend, backend }
}
</script>
