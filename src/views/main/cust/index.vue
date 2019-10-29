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
import query from './query'
import insert from './insert'
export default {
  components: { insert, query }
}
</script>
