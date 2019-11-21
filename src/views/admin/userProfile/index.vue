<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="查詢用戶">
        <query />
      </el-tab-pane>
      <el-tab-pane label="新增用戶">
        <insert />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import insert from './insert'
import query from './query'
export default {
  components: {
    insert,
    query
  }
}
</script>
