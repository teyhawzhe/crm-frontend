<template>
  <el-tabs type="border-card">
    <el-tab-pane label="主要目錄設定">
      <mainPath></mainPath>
    </el-tab-pane>
    <el-tab-pane label="子目錄設定">
      <subPath></subPath>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import mainPath from './mainMenu/index'
import subPath from './subMenu/index'
export default {
  components: { mainPath, subPath }
}
</script>
