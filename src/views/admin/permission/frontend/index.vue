<template>
  <el-tabs type="border-card">
    <el-tab-pane label="新增">
      <insert />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import insert from './insert'
export default {
  components: { insert }
}
</script>
