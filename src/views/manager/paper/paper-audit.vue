<template>
  <el-dialog
      :title="title"
      width="400px"
      :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="论文名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="论文名称"></el-input>
      </el-form-item>
      <el-form-item label="第一作者" prop="firstAuthorId">
        <el-input v-model="dataForm.firstAuthorId" placeholder="第一作者"></el-input>
      </el-form-item>
      <el-form-item label="通讯作者" prop="correspondingAuthorId">
        <el-input v-model="dataForm.correspondingAuthorId" placeholder="通讯作者"></el-input>
      </el-form-item>
      <el-form-item label="刊物" prop="publication">
        <el-input v-model="dataForm.publication" placeholder="刊物"></el-input>
      </el-form-item>
      <el-form-item label="发表时间" prop="publishDate">
        <el-input v-model="dataForm.publishDate" placeholder="发表时间"></el-input>
      </el-form-item>
      <el-form-item label="发表年份及卷（期）数" prop="publicationVersion">
        <el-input v-model="dataForm.publicationVersion" placeholder="发表年份及卷（期）数"></el-input>
      </el-form-item>
      <el-form-item label="论文级别" prop="paperLevelId">
        <el-input v-model="dataForm.paperLevelId" placeholder="论文级别"></el-input>
      </el-form-item>
      <el-form-item label="创建者" prop="createBy">
        <el-input v-model="dataForm.createBy" placeholder="创建者"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
      </el-form-item>
      <el-form-item label="更新者" prop="updateBy">
        <el-input v-model="dataForm.updateBy" placeholder="更新者"></el-input>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input v-model="dataForm.version" placeholder="版本"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import paperApi from '@/api/manager/paper'

export default {
  data () {
    return {
      title: '',
      visible: false,
      dataForm: {
        id: 0,
        name: '',
        firstAuthorId: '',
        correspondingAuthorId: '',
        publication: '',
        publishDate: '',
        publicationVersion: '',
        paperLevelId: '',
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime: '',
        version: ''
      },
      dataRule: {
        name: [
          { required: true, message: '论文名称不能为空', trigger: 'blur' }
        ],
        firstAuthorId: [
          { required: true, message: '第一作者不能为空', trigger: 'blur' }
        ],
        correspondingAuthorId: [
          { required: true, message: '通讯作者不能为空', trigger: 'blur' }
        ],
        publication: [
          { required: true, message: '刊物不能为空', trigger: 'blur' }
        ],
        publishDate: [
          { required: true, message: '发表时间不能为空', trigger: 'blur' }
        ],
        publicationVersion: [
          { required: true, message: '发表年份及卷（期）数不能为空', trigger: 'blur' }
        ],
        paperLevelId: [
          { required: true, message: '论文级别不能为空', trigger: 'blur' }
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
          const submit = this.dataForm.id ? paperApi.modify : paperApi.add
          submit(Object.assign({}, this.dataForm)).then(({ data }) => {
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
