<template>
  <el-tabs v-model="show" type="card" @tab-click="refreshAction">
    <el-tab-pane name="mainPath" label="主要目錄設定">
      <component :is="show" />
    </el-tab-pane>
    <el-tab-pane name="subPath" label="子目錄設定">
      <component :is="show" />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import mainPath from './mainMenu/index'
import subPath from './subMenu/index'
export default {
  components: { mainPath, subPath },
  data() {
    return {
      show: 'mainPath'
    }
  },
  methods: {
    refreshAction: function(tab, event) {
      this.show = tab.name
    }
  }
}
</script>
