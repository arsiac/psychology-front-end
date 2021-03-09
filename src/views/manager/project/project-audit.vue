<template>
  <el-dialog
      title="审核"
      :visible.sync="visible">
    <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        @keyup.enter.native="dataFormSubmit()"
        label-width="80px">
      <el-row :gutter="20">
        <!-- left -->
        <el-col :span="12">
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="项目名称" disabled/>
          </el-form-item>
          <el-form-item label="校内编码" prop="schoolCode">
            <el-input v-model="dataForm.schoolCode" placeholder="校内编码" disabled/>
          </el-form-item>
          <el-form-item label="课题类型" prop="subjectTypeId">
            <el-input v-model="dataForm.subjectTypeName" placeholder="课题类型" disabled/>
          </el-form-item>
          <el-form-item label="结束时间" prop="projectEndDate">
            <el-date-picker
                v-model="dataForm.projectEndDate"
                type="date"
                placeholder="选择日期"
                disabled>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="负责人" prop="managerId">
            <el-input v-model="dataForm.teacherName" placeholder="负责人" disabled/>
          </el-form-item>
        </el-col>
        <!-- right -->
        <el-col :span="12">
          <el-form-item label="项目编码" prop="code">
            <el-input v-model="dataForm.code" placeholder="项目编码" disabled/>
          </el-form-item>
          <el-form-item label="项目来源" prop="projectSourceId">
            <el-input v-model="dataForm.projectSourceName" placeholder="项目来源" disabled/>
          </el-form-item>
          <el-form-item label="立项时间" prop="projectStartDate">
            <el-date-picker
                v-model="dataForm.projectStartDate"
                type="date"
                placeholder="选择日期"
                disabled>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="经费" prop="money">
            <el-input v-model.number="dataForm.money" placeholder="经费(万元)" disabled/>
          </el-form-item>
          <el-form-item label="是否结题" prop="projectIsEnd">
            <el-select v-model="dataForm.projectIsEnd" placeholder="是否结题" disabled>
              <el-option label="未结题" :value="0"/>
              <el-option label="已结题" :value="1"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="审核结果" prop="status">
        <el-select v-model="dataForm.status">
          <el-option label="审核通过" :value="2"/>
          <el-option label="审核退回" :value="3"/>
        </el-select>
      </el-form-item>
      <el-form-item label="退回建议" prop="returnMessage">
        <el-input type="textarea" v-model="dataForm.returnMessage"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import projectApi from '@/api/manager/project'

export default {
  data () {
    const validateReturnMessage = (rule, value, callback) => {
      // 审核退回，并且没有修改信息
      if (this.dataForm.status === 3 && (!value || value.trim() === '')) {
        callback(new Error('审核退回信息不能为空'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      dataForm: {},
      dataRule: {
        status: [
          { required: true, message: '审核结果不能为空', trigger: 'blur' }
        ],
        returnMessage: [
          { validate: validateReturnMessage, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init (row) {
      this.dataForm = Object.assign({}, row) || {}
      this.visible  = true
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          projectApi.add(Object.assign({}, this.dataForm)).then(({ data }) => {
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
