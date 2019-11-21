<template>
  <div class="app-container">
    <el-form ref="form" label-width="150px" :model="form" :rules="rules">
      <el-form-item prop="image">
        <el-upload
          class="avatar-uploader"
          accept="image/jpeg, image/png"
          action
          :auto-upload="false"
          :show-file-list="false"
          :multiple="false"
          :limit="101"
          :on-change="handleAvatarSuccess"
        >
          <img v-if="form.image" :src="form.image" class="avatar" >
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="帳號" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="權限" prop="roles">
        <el-checkbox-group v-model="form.roles">
          <el-checkbox-button v-for="(i,index) in roles" :key="index" :label="i.role" name="roles" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click="reset('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { insert, queryRole } from './action'
import { insertForm } from './entity'
import { insertFormRules } from './rule'
export default {
  data() {
    return {
      form: insertForm(),
      rules: insertFormRules(),
      roles: []
    }
  },
  mounted() {
    this.queryRoleAction()
  },
  methods: {
    queryRoleAction: function() {
      queryRole().then(res => {
        if (res.status === 'OK') {
          this.roles = res.data
        }
      })
    },
    onSubmit: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          insert(this.form)
        } else {
          return false
        }
      })
    },
    handleAvatarSuccess: function(file, fileList) {
      const isLt2M = file.raw.size / 1024 / 1024 < 2
      const isJPG =
        file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
        return false
      }

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = () => {
        this.form.image = reader.result
      }
    },
    reset: function(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
