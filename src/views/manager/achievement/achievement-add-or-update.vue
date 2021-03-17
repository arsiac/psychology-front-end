<template>
  <el-dialog
      :title="title"
      :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-row :gutter="20">
        <!-- left -->
        <el-col :span="12">
          <el-form-item label="成果名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="成果名称"></el-input>
          </el-form-item>
          <el-form-item label="奖励名称" prop="awardName">
            <el-input v-model="dataForm.awardName" placeholder="奖励名称"></el-input>
          </el-form-item>
          <el-form-item label="颁奖单位" prop="unit">
            <el-input v-model="dataForm.unit" placeholder="颁奖单位"></el-input>
          </el-form-item>
          <el-form-item label="证书编号" prop="code">
            <el-input v-model="dataForm.code" placeholder="证书编号"></el-input>
          </el-form-item>
        </el-col>
        <!-- right -->
        <el-col :span="12">
          <el-form-item label="成果类型" prop="achievementTypeId">
            <el-autocomplete
                value-key="name"
                v-model="searchDataAchievementType"
                placeholder="请输入内容"
                :fetch-suggestions="queryAchievementType"
                @select="handleAchievementTypeSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="获奖等级" prop="rewordLevelId">
            <el-autocomplete
                value-key="name"
                v-model="searchDataRewordLevel"
                placeholder="请输入内容"
                :fetch-suggestions="queryRewordLevel"
                @select="handleRewordLevelSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="获奖时间" prop="date">
            <el-date-picker
                v-model="dataForm.date"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
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
import achievementApi     from '@/api/manager/achievement'
import achievementTypeApi from '@/api/base/achievement-type'
import rewordLevelApi     from '@/api/base/reword-level'

export default {
  data () {
    return {
      title: '',
      hasAudit: false,
      visible: false,
      dataForm: {},
      dataRule: {
        name: [
          { required: true, message: '成果名称不能为空', trigger: 'blur' }
        ],
        achievementTypeId: [
          { required: true, message: '成果类型不能为空', trigger: 'input' }
        ],
        awardName: [
          { required: true, message: '奖励名称不能为空', trigger: 'blur' }
        ],
        rewordLevelId: [
          { required: true, message: '获奖等级不能为空', trigger: 'input' }
        ],
        unit: [
          { required: true, message: '颁奖单位不能为空', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '获奖时间不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '证书编号不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ]
      },
      searchDataAchievementType: '',
      searchDataRewordLevel: ''
    }
  },
  methods: {
    init (row, audit) {
      this.dataForm = Object.assign({}, row) || {}
      this.title    = !row ? '新增' : '修改'
      this.visible  = true
      this.hasAudit = audit || false

      this.searchDataAchievementType = this.dataForm.achievementTypeName || ''
      this.searchDataRewordLevel     = this.dataForm.rewordLevelName || ''
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
    queryRewordLevel (name, cb) {
      rewordLevelApi.fuzzy({ name }).then(({ data }) => {
        let list = []
        if (Array.isArray(data.data)) {
          list = data.data
        }
        if (list.length === 0) {
          // 查询为空,清空选择
          this.dataForm.rewordLevelId = null
        }
        cb(list)
      })
    },
    handleRewordLevelSelect (value) {
      this.dataForm.rewordLevelId = value.id
    },
    // 表单提交
    dataFormSubmit (status) {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dataForm.status = status
          const submit         = this.dataForm.id ? achievementApi.modify : achievementApi.add
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
