<template>
  <el-dialog
      :title="title"
      :close-on-click-modal="false"
      :visible.sync="visible"
      width="400px"
  >
    <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        @keyup.enter.native="dataFormSubmit()"
        label-width="80px"
    >
      <el-form-item label="资源id" prop="resourceId">
        <el-autocomplete
            v-model="searchData"
            :fetch-suggestions="queryResource"
            placeholder="请输入内容"
            value-key="name"
            @select="handleResourceSelect"
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

import roleResourceApi from '@/api/centre/role-resource'
import resourceApi     from '@/api/centre/resource'

export default {
  data () {
    return {
      title: '',
      searchData: '',
      visible: false,
      dataForm: {
        roleId: null,
        resourceId: null
      },
      dataRule: {
        resourceId: [
          { required: true, message: '资源不能为空', trigger: 'input' }
        ]
      }
    }
  },
  methods: {
    init (row) {
      this.title           = `新增资源: ${row.name}`
      this.dataForm.roleId = row.id
      this.visible         = true
      this.searchData      = ''
    },
    queryResource (name, cb) {
      resourceApi.fuzzy({ name }).then(({ data }) => {
        let list = []
        if (Array.isArray(data.data)) {
          list = data.data
        }
        if (list.length === 0) {
          // 查询为空,清空选择
          this.dataForm.resourceId = null
        }
        cb(list)
      })
    },
    handleResourceSelect (value) {
      console.log(value, this.dataForm)
      this.dataForm.resourceId = value.id
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          roleResourceApi.add(Object.assign({}, this.dataForm)).then(({ data }) => {
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
