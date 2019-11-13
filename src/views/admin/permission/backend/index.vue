<template>
  <el-tabs type="border-card">
    <el-tab-pane label="新增">
      <query />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import query from './query'
export default {
  components: { query }
}
</script>
