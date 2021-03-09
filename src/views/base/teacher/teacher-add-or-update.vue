<template>
  <el-dialog
      :title="title"
      width="800px"
      :visible.sync="visible">
    <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        label-width="80px"
        label-position="top"
    >
      <el-row :gutter="40">
        <!-- 1 -->
        <el-col :span="8">
          <el-form-item label="教师编号" prop="code">
            <el-input :style="inputStyle" v-model="dataForm.code" placeholder="教师编号"></el-input>
          </el-form-item>
          <el-form-item label="生日" prop="birthday">
            <el-date-picker
                v-model="dataForm.birthday"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="职称" prop="titleId">
            <el-autocomplete
                v-model="searchData"
                :fetch-suggestions="queryTitle"
                placeholder="请输入内容"
                value-key="name"
                @select="handleTitleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="政治面貌" prop="politic">
            <el-select v-model="dataForm.politic" placeholder="政治面貌">
              <el-option label="党员" value="党员"/>
              <el-option label="共青团员" value="共青团员"/>
              <el-option label="群众" value="群众"/>
            </el-select>
          </el-form-item>
          <el-form-item label="最高学位" prop="degree">
            <el-select v-model="dataForm.degree" placeholder="最高学位">
              <el-option label="博士" value="博士"/>
              <el-option label="硕士" value="硕士"/>
              <el-option label="学士" value="学士"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 2 -->
        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input :style="inputStyle" v-model="dataForm.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="海外经历" prop="oversea">
            <el-select v-model="dataForm.oversea" placeholder="海外经历">
              <el-option label="是" :value="1"/>
              <el-option label="否" :value="0"/>
            </el-select>
          </el-form-item>
          <el-form-item label="导师类型" prop="type">
            <el-select v-model="dataForm.type" placeholder="导师类型">
              <el-option label="博导" value="博导"/>
              <el-option label="硕导" value="硕导"/>
            </el-select>
          </el-form-item>
          <el-form-item label="最高学位获取单位" prop="degreeUnit">
            <el-input :style="inputStyle" v-model="dataForm.degreeUnit" placeholder="最高学位获取单位"></el-input>
          </el-form-item>
          <el-form-item label="工作类别" prop="jobType">
            <el-select v-model="dataForm.jobType">
              <el-option label="教学为主" value="教学为主"/>
              <el-option label="科研为主" value="科研为主"/>
              <el-option label="教学科研并重" value="教学科研并重"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 3 -->
        <el-col :span="8">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="dataForm.sex" placeholder="性别">
              <el-option label="男" :value="1"/>
              <el-option label="女" :value="-1"/>
            </el-select>
          </el-form-item>
          <el-form-item label="系别" prop="departmentId">
            <el-autocomplete
                v-model="searchDataDept"
                :fetch-suggestions="queryDepartment"
                placeholder="请输入内容"
                value-key="name"
                @select="handleDepartmentSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="学缘关系" prop="relation">
            <el-select v-model="dataForm.relation" placeholder="学缘关系">
              <el-option label="本校" value="本校"/>
              <el-option label="外校(国内)" value="外校(国内)"/>
              <el-option label="外校(国外)" value="外校(国外)"/>
            </el-select>
          </el-form-item>
          <el-form-item label="学历" prop="education">
            <el-select v-model="dataForm.education" placeholder="学历">
              <el-option label="博士研究生" value="博士研究生"/>
              <el-option label="硕士研究生" value="硕士研究生"/>
              <el-option label="本科" value="本科"/>
            </el-select>
          </el-form-item>
          <el-form-item label="研究方向" prop="researchDirection">
            <el-input :style="inputStyle" v-model="dataForm.researchDirection" placeholder="研究方向"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="在国际国内重要学术组织或行业协会任职情况" prop="position">
        <el-input type="textarea" v-model="dataForm.position" placeholder="任职情况"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import teacherApi  from '@/api/base/teacher'
import departmentApi from '@/api/base/department'
import titleApi    from '@/api/base/title'

export default {
  data () {
    return {
      title: '',
      searchData: '',
      searchDataDept: '',
      inputStyle: 'width: 220px;',
      visible: false,
      dataForm: {},
      dataRule: {
        code: [
          { required: true, message: '教师编号不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        age: [
          { type: 'number', message: '年龄必须为数字值' }
        ]
      }
    }
  },
  methods: {
    init (row) {
      this.dataForm = Object.assign({}, row) || {}
      this.title    = !row ? '新增' : '修改'
      this.visible  = true
      this.searchData = ''
      this.searchDataDept = ''
    },
    queryTitle (name, cb) {
      titleApi.fuzzy({ name }).then(({ data }) => {
        let list = []
        if (Array.isArray(data.data)) {
          list = data.data
        }
        if (list.length === 0) {
          // 查询为空,清空选择
          this.dataForm.titleId = null
        }
        cb(list)
      })
    },
    handleTitleSelect (value) {
      this.dataForm.titleId = value.id
    },
    queryDepartment (name, cb) {
      departmentApi.fuzzy({ name }).then(({ data }) => {
        let list = []
        if (Array.isArray(data.data)) {
          list = data.data
        }
        if (list.length === 0) {
          // 查询为空,清空选择
          this.dataForm.departmentId = null
        }
        cb(list)
      })
    },
    handleDepartmentSelect (value) {
      this.dataForm.departmentId = value.id
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const submit = this.dataForm.id ? teacherApi.modify : teacherApi.add
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
