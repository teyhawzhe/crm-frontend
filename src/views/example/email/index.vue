<template>
  <div class="app-container">
    <el-button type="primary" @click="sendEmailAction">發生email</el-button>
  </div>
</template>
<script>
import { sendEmail } from './action'
export default {
  methods: {
    sendEmailAction: function() {
      sendEmail().then(res => {
        if (res.status === 'OK') {
          alert(res.message)
        }
      })
    }
  }
}
</script>
