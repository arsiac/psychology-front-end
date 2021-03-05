<template>
  <el-dialog
      :title="title"
      :visible.sync="visible"
      width="400px"
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="角色" prop="roleId">
        <el-autocomplete
            v-model="searchData"
            :fetch-suggestions="queryRole"
            placeholder="请输入内容"
            value-key="name"
            @select="handleRoleSelect"
        ></el-autocomplete>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import userRoleApi from '@/api/centre/user-role'
import roleApi from '@/api/centre/role'

export default {
  data () {
    return {
      title: '',
      searchData: '',
      visible: false,
      dataForm: {
        userId: null,
        roleId: null
      },
      dataRule: {
        roleId: [
          { required: true, message: '角色不能为空', trigger: 'input' }
        ]
      }
    }
  },
  methods: {
    init (row) {
      this.title           = `新增角色: ${row.username}`
      this.dataForm.userId = row.id
      this.visible         = true
      this.searchData      = ''
    },
    queryRole (name, cb) {
      roleApi.fuzzy({ name }).then(({ data }) => {
        let list = []
        if (Array.isArray(data.data)) {
          list = data.data
        }
        if (list.length === 0) {
          // 查询为空,清空选择
          this.dataForm.roleId = null
        }
        cb(list)
      })
    },
    handleRoleSelect (value) {
      this.dataForm.roleId = value.id
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          userRoleApi.add(Object.assign({}, this.dataForm)).then(({ data }) => {
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
