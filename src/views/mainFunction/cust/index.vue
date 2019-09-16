<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="會員基本資料">
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-alert>
  </div>
</template>
