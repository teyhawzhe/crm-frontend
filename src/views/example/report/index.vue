<template>
  <div class="app-container">
    <el-button type="primary" @click="downloadAction">下載PDF</el-button>
  </div>
</template>
<script>
import { report } from './action'
export default {
  methods: {
    downloadAction: function() {
      report().then(res => {
        const blob = new Blob([res.data], { type: res.data.type })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = res.headers.filename
        link.click()
      })
    }
  }
}
</script>
