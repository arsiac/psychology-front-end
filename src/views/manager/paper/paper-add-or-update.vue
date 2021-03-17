<template>
  <el-dialog
      :title="title"
      :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="100px">
      <el-row :gutter="20">
        <!-- left -->
        <el-col :span="12">
          <el-form-item label="论文名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="论文名称"></el-input>
          </el-form-item>
          <el-form-item label="通讯作者" prop="correspondingAuthorId">
            <el-autocomplete
                value-key="name"
                popper-class="two-line-autocomplete"
                v-model="searchDataCorrespondingAuthor"
                placeholder="请输入内容"
                :fetch-suggestions="queryCorrespondingAuthor"
                @select="handleCorrespondingAuthorSelect">
              <template slot-scope="{ item }">
                <div class="name">{{ item.name }}</div>
                <span class="code">{{ item.code }}</span>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="发表时间" prop="publishDate">
            <el-date-picker
                v-model="dataForm.publishDate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="论文级别" prop="paperLevelId">
            <el-autocomplete
                value-key="name"
                v-model="searchDataPaperLevel"
                placeholder="请输入内容"
                :fetch-suggestions="queryPaperLevel"
                @select="handlePaperLevelSelect"
            ></el-autocomplete>
          </el-form-item>
        </el-col>
        <!-- right -->
        <el-col :span="12">
          <el-form-item label="第一作者" prop="firstAuthorId">
            <el-autocomplete
                value-key="name"
                popper-class="two-line-autocomplete"
                v-model="searchDataFirstAuthor"
                placeholder="请输入内容"
                :fetch-suggestions="queryFirstAuthor"
                @select="handleFirstAuthorSelect"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.name }}</div>
                <span class="code">{{ item.code }}</span>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="刊物" prop="publication">
            <el-input v-model="dataForm.publication" placeholder="刊物"></el-input>
          </el-form-item>
          <el-form-item label="年份/卷(期)" prop="publicationVersion">
            <el-input v-model="dataForm.publicationVersion" placeholder="发表年份及卷（期）数"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button v-if="!hasAudit" type="primary" @click="dataFormSubmit(0)">保存</el-button>
      <el-button v-if="!hasAudit" type="primary" @click="dataFormSubmit(1)">提交</el-button>
      <!-- 有审核权限 -->
      <el-button v-if="hasAudit" type="primary" @click="dataFormSubmit(2)">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
import paperApi      from '@/api/manager/paper'
import teacherApi    from '@/api/base/teacher'
import paperLevelApi from '@/api/base/paper-level'

export default {
  data () {
    const validateAuthor = (rule, value, callback) => {
      if (!this.dataForm.correspondingAuthorId && !this.dataForm.firstAuthorId) {
        callback(new Error('第一作者和通讯作者至少填写一个'))
      } else {
        callback()
      }
    }
    return {
      title: '',
      visible: false,
      hasAudit: false,
      dataForm: {
        id: 0,
        name: '',
        firstAuthorId: '',
        correspondingAuthorId: '',
        publication: '',
        publishDate: '',
        publicationVersion: '',
        paperLevelId: ''
      },
      dataRule: {
        name: [
          { required: true, message: '论文名称不能为空', trigger: 'blur' }
        ],
        firstAuthorId: [
          { validator: validateAuthor, trigger: 'input' }
        ],
        correspondingAuthorId: [
          { validator: validateAuthor, trigger: 'input' }
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
          { required: true, message: '论文级别不能为空', trigger: 'input' }
        ]
      },
      searchDataFirstAuthor: '',
      searchDataCorrespondingAuthor: '',
      searchDataPaperLevel: ''
    }
  },
  methods: {
    init (row, audit) {
      this.dataForm = Object.assign({}, row) || {}
      this.title    = !row ? '新增' : '修改'
      this.visible  = true
      this.hasAudit = audit || false

      this.searchDataFirstAuthor         = row ? row.firstAuthorName : ''
      this.searchDataCorrespondingAuthor = row ? row.correspondingAuthorName : ''
      this.searchDataPaperLevel          = row ? row.paperLevelName : ''
    },
    queryCorrespondingAuthor (name, cb) {
      teacherApi.fuzzy({ name }).then(({ data }) => {
        let list = []
        if (Array.isArray(data.data)) {
          list = data.data
        }
        if (list.length === 0) {
          // 查询为空,清空选择
          this.dataForm.correspondingAuthorId = null
        }
        cb(list)
      })
    },
    queryFirstAuthor (name, cb) {
      teacherApi.fuzzy({ name }).then(({ data }) => {
        let list = []
        if (Array.isArray(data.data)) {
          list = data.data
        }
        if (list.length === 0) {
          // 查询为空,清空选择
          this.dataForm.firstAuthorId = null
        }
        cb(list)
      })
    },
    handleCorrespondingAuthorSelect (value) {
      this.dataForm.correspondingAuthorId = value.id
    },
    handleFirstAuthorSelect (value) {
      this.dataForm.firstAuthorId = value.id
    },
    queryPaperLevel (name, cb) {
      paperLevelApi.fuzzy({ name }).then(({ data }) => {
        let list = []
        if (Array.isArray(data.data)) {
          list = data.data
        }
        if (list.length === 0) {
          // 查询为空,清空选择
          this.dataForm.paperLevelId = null
        }
        cb(list)
      })
    },
    handlePaperLevelSelect (value) {
      this.dataForm.paperLevelId = value.id
    },
    // 表单提交
    dataFormSubmit (status) {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const submit         = this.dataForm.id ? paperApi.modify : paperApi.add
          this.dataForm.status = status
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
