<template>
  <el-dialog
      :title="title"
      width="400px"
      :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="角色名"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import roleApi     from '@/api/centre/role'

export default {
  data () {
    return {
      title: '',
      visible: false,
      dataForm: {},
      dataRule: {
        name: [
          { required: true, message: '角色名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init (row) {
      this.dataForm = Object.assign({}, row) || {}
      this.title    = !row ? '新增' : '修改'
      this.visible  = true
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const submit = this.dataForm.id ? roleApi.modify : roleApi.add
          submit(this.dataForm).then(({ data }) => {
            if (data.data) {
              this.$notify.success({
                title: this.title,
                message: '操作成功'
              })
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        }
      })
    }
  }
}
</script>
