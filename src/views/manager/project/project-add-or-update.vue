<template>
  <el-dialog
      :title="title"
      :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-row :gutter="20">
        <!-- left -->
        <el-col :span="12">
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="项目名称"/>
          </el-form-item>
          <el-form-item label="校内编码" prop="schoolCode">
            <el-input v-model="dataForm.schoolCode" placeholder="校内编码"/>
          </el-form-item>
          <el-form-item label="课题类型" prop="subjectTypeId">
            <el-autocomplete
                value-key="name"
                v-model="searchDataSubjectType"
                placeholder="请输入内容"
                :fetch-suggestions="querySubjectType"
                @select="handleSubjectTypeSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="结束时间" prop="projectEndDate">
            <el-date-picker
                v-model="dataForm.projectEndDate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="负责人" prop="managerId">
            <el-autocomplete
                value-key="name"
                popper-class="two-line-autocomplete"
                v-model="searchDataManager"
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
        </el-col>
        <!-- right -->
        <el-col :span="12">
          <el-form-item label="项目编码" prop="code">
            <el-input v-model="dataForm.code" placeholder="项目编码"></el-input>
          </el-form-item>
          <el-form-item label="项目来源" prop="projectSourceId">
            <el-autocomplete
                value-key="name"
                v-model="searchDataProjectSource"
                placeholder="请输入内容"
                :fetch-suggestions="queryProjectSource"
                @select="handleProjectSourceSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="立项时间" prop="projectStartDate">
            <el-date-picker
                v-model="dataForm.projectStartDate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="经费" prop="money">
            <el-input v-model.number="dataForm.money" placeholder="经费(万元)"></el-input>
          </el-form-item>
          <el-form-item label="是否结题" prop="projectIsEnd">
            <el-select v-model="dataForm.projectIsEnd" placeholder="是否结题">
              <el-option label="未结题" :value="0"/>
              <el-option label="已结题" :value="1"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit(0)">保存</el-button>
      <el-button type="primary" @click="dataFormSubmit(1)">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import projectApi       from '@/api/manager/project'
import teacherApi       from '@/api/base/teacher'
import projectSourceApi from '@/api/base/project-source'
import subjectTypeApi   from '@/api/base/subject-type'

export default {
  data () {
    return {
      title: '',
      searchDataManager: '',
      searchDataSubjectType: '',
      searchDataProjectSource: '',
      visible: false,
      dataForm: {},
      dataRule: {
        name: [
          { required: true, message: '项目名称不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '项目编码不能为空', trigger: 'blur' }
        ],
        schoolCode: [
          { required: true, message: '校内编码不能为空', trigger: 'blur' }
        ],
        projectSourceId: [
          { required: true, message: '项目来源不能为空', trigger: 'input' }
        ],
        subjectTypeId: [
          { required: true, message: '课题类型不能为空', trigger: 'input' }
        ],
        projectStartDate: [
          { required: true, message: '立项时间不能为空', trigger: 'blur' }
        ],
        projectEndDate: [
          { required: true, message: '结束时间不能为空', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '经费(万元)不能为空', trigger: 'blur' },
          { type: 'number', message: '请输入数字', trigger: 'blur' }
        ],
        managerId: [
          { required: true, message: '项目负责人不能为空', trigger: 'input' }
        ],
        projectIsEnd: [
          { required: true, message: '是否结题不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init (row) {
      this.dataForm = Object.assign({}, row) || {}
      this.title    = !row ? '新增' : '修改'
      this.visible  = true

      // search data
      this.searchDataManager       = row ? row.teacherName : ''
      this.searchDataSubjectType   = row ? row.subjectTypeName : ''
      this.searchDataProjectSource = row ? row.projectSourceName : ''
    },
    queryTeacher (name, cb) {
      teacherApi.fuzzy({ name }).then(({ data }) => {
        let list = []
        if (Array.isArray(data.data)) {
          list = data.data
        }
        if (list.length === 0) {
          // 查询为空,清空选择
          this.dataForm.managerId = null
        }
        cb(list)
      })
    },
    handleTeacherSelect (value) {
      this.dataForm.managerId = value.id
    },
    querySubjectType (name, cb) {
      subjectTypeApi.fuzzy({ name }).then(({ data }) => {
        let list = []
        if (Array.isArray(data.data)) {
          list = data.data
        }
        if (list.length === 0) {
          // 查询为空,清空选择
          this.dataForm.subjectTypeId = null
        }
        cb(list)
      })
    },
    handleSubjectTypeSelect (value) {
      this.dataForm.subjectTypeId = value.id
    },
    queryProjectSource (name, cb) {
      projectSourceApi.fuzzy({ name }).then(({ data }) => {
        let list = []
        if (Array.isArray(data.data)) {
          list = data.data
        }
        if (list.length === 0) {
          // 查询为空,清空选择
          this.dataForm.projectSourceId = null
        }
        cb(list)
      })
    },
    handleProjectSourceSelect (value) {
      this.dataForm.projectSourceId = value.id
    },
    // 表单提交
    dataFormSubmit (status) {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dataForm.status = status
          const submit         = this.dataForm.id ? projectApi.modify : projectApi.add
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

<style lang="less" scoped>
.two-line-autocomplete {
  li {
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 20px;
    }

    .code {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .code {
      color: #ddd;
    }
  }
}
</style>
