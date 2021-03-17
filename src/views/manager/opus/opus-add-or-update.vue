<template>
  <el-dialog
      :title="title"
      :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-row :gutter="20">
        <!-- left -->
        <el-col :span="12">
          <el-form-item label="著作名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="著作名称"></el-input>
          </el-form-item>
          <el-form-item label="成果类型" prop="achievementTypeId">
            <el-autocomplete
                value-key="name"
                v-model="searchDataAchievementType"
                placeholder="请输入内容"
                :fetch-suggestions="queryAchievementType"
                @select="handleAchievementTypeSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="出版时间" prop="publishDate">
            <el-date-picker
                v-model="dataForm.publishDate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <!-- right -->
        <el-col :span="12">
          <el-form-item label="作者" prop="authorId">
            <el-autocomplete
                value-key="name"
                popper-class="two-line-autocomplete"
                v-model="searchDataAuthor"
                placeholder="请输入内容"
                :fetch-suggestions="queryTeacher"
                @select="handleTeacherSelect"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.name }}</div>
                <span class="code">{{ item.code }}</span>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="出版社" prop="publishingHouse">
            <el-input v-model="dataForm.publishingHouse" placeholder="出版社"></el-input>
          </el-form-item>
          <el-form-item label="ISBN" prop="isbn">
            <el-input v-model="dataForm.isbn" placeholder="ISBN"></el-input>
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
import opusApi            from '@/api/manager/opus'
import teacherApi         from '@/api/base/teacher'
import achievementTypeApi from '@/api/base/achievement-type'

export default {
  data () {
    return {
      title: '',
      visible: false,
      hasAudit: false,
      dataForm: {
        id: 0,
        name: '',
        authorId: '',
        achievementTypeId: '',
        publishingHouse: '',
        publishDate: '',
        isbn: ''
      },
      dataRule: {
        name: [
          { required: true, message: '著作名称不能为空', trigger: 'blur' }
        ],
        authorId: [
          { required: true, message: '作者不能为空', trigger: 'input' }
        ],
        achievementTypeId: [
          { required: true, message: '成果类型不能为空', trigger: 'input' }
        ],
        publishingHouse: [
          { required: true, message: '出版社不能为空', trigger: 'blur' }
        ],
        publishDate: [
          { required: true, message: '出版时间不能为空', trigger: 'blur' }
        ],
        isbn: [
          { required: true, message: 'ISBN不能为空', trigger: 'blur' }
        ]
      },
      searchDataAuthor: '',
      searchDataAchievementType: ''
    }
  },
  methods: {
    init (row, audit) {
      this.dataForm = Object.assign({}, row) || {}
      this.title    = !row ? '新增' : '修改'
      this.visible  = true
      this.hasAudit = audit || false

      this.searchDataAchievementType = this.dataForm.achievementTypeName
      this.searchDataAuthor          = this.dataForm.authorName
    },
    queryTeacher (name, cb) {
      teacherApi.fuzzy({ name }).then(({ data }) => {
        let list = []
        if (Array.isArray(data.data)) {
          list = data.data
        }
        if (list.length === 0) {
          // 查询为空,清空选择
          this.dataForm.authorId = null
        }
        cb(list)
      })
    },
    handleTeacherSelect (value) {
      this.dataForm.authorId = value.id
    },
    queryAchievementType (name, cb) {
      achievementTypeApi.fuzzy({ name }).then(({ data }) => {
        let list = []
        if (Array.isArray(data.data)) {
          list = data.data
        }
        if (list.length === 0) {
          // 查询为空,清空选择
          this.dataForm.achievementTypeId = null
        }
        cb(list)
      })
    },
    handleAchievementTypeSelect (value) {
      this.dataForm.achievementTypeId = value.id
    },
    // 表单提交
    dataFormSubmit (status) {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const submit         = this.dataForm.id ? opusApi.modify : opusApi.add
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
