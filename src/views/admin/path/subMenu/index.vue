<template>
  <el-tabs type="border-card">
    <el-tab-pane label="新增">
      <insert></insert>
    </el-tab-pane>
    <el-tab-pane label="查詢與修改">
      <query></query>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import insert from './insert'
import query from './query'
export default {
  components: { insert, query }
}
</script>
