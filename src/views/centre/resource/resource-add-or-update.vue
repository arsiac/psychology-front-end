<template>
  <el-dialog
      :title="title"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        @keyup.enter.native="dataFormSubmit()"
        label-width="80px"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="资源名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型" prop="type">
            <el-select v-model="dataForm.type">
              <el-option label="分组" :value="1"/>
              <el-option label="菜单" :value="2"/>
              <el-option label="权限" :value="3"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item v-if="dataForm.type !== 1" label="父节点" prop="parent">
            <el-autocomplete
                v-model="searchData"
                :fetch-suggestions="queryResource"
                placeholder="请输入内容"
                value-key="name"
                @select="handleResourceSelect"
            ></el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="dataForm.type === 2" label="URI" prop="uri">
            <el-input v-model="dataForm.uri" placeholder="URI"></el-input>
          </el-form-item>
          <el-form-item v-if="dataForm.type === 3" label="权限" prop="uri">
            <el-select v-model="dataForm.uri">
              <el-option label="查看" value="op:get"/>
              <el-option label="添加" value="op:post"/>
              <el-option label="修改" value="op:put"/>
              <el-option label="删除" value="op:delete"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item v-if="dataForm.type === 2" label="图标" prop="icon">
            <el-input v-model="dataForm.icon" placeholder="图标"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import resourceApi from '@/api/centre/resource'

export default {
  data () {
    return {
      visible: false,
      title: '',
      dataForm: { id: 0 },
      searchData: '',
      dataRule: {
        name: [
          { required: true, message: '资源名称不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '类型(1分组,2菜单,3按钮)不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init (row) {
      this.dataForm   = Object.assign({}, row) || {}
      this.title      = !row ? '新增' : '修改'
      this.visible    = true
      this.searchData = null
    },
    queryResource (name, cb) {
      resourceApi.fuzzy({ name }).then(({ data }) => {
        let list = []
        if (Array.isArray(data.data)) {
          list = data.data
        }
        if (list.length === 0) {
          // 查询为空,清空选择
          this.dataForm.parent = null
        }
        cb(list)
      })
    },
    handleResourceSelect (value) {
      this.dataForm.parent = value.id
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const submit = this.dataForm.id ? resourceApi.modify : resourceApi.add
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
