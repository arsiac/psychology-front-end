<template>
  <el-dialog
      title="审核"
      :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-row :gutter="20">
        <!-- left -->
        <el-col :span="12">
          <el-form-item label="著作名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="著作名称" disabled></el-input>
          </el-form-item>
          <el-form-item label="成果类型" prop="achievementTypeId">
            <el-input v-model="dataForm.achievementTypeName" placeholder="著作名称" disabled></el-input>
          </el-form-item>
          <el-form-item label="出版时间" prop="publishDate">
            <el-date-picker
                v-model="dataForm.publishDate"
                type="date"
                placeholder="选择日期"
                disabled>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <!-- right -->
        <el-col :span="12">
          <el-form-item label="作者" prop="authorId">
            <el-input v-model="dataForm.authorName" placeholder="著作名称" disabled></el-input>
          </el-form-item>
          <el-form-item label="出版社" prop="publishingHouse">
            <el-input v-model="dataForm.publishingHouse" placeholder="出版社" disabled></el-input>
          </el-form-item>
          <el-form-item label="ISBN" prop="isbn">
            <el-input v-model="dataForm.isbn" placeholder="ISBN" disabled></el-input>
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
      <el-button type="primary" @click="dataFormSubmit()">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
import opusApi from '@/api/manager/opus'

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
          { validator: validateReturnMessage, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init (row) {
      this.dataForm        = Object.assign({}, row)
      this.dataForm.status = null
      this.visible         = true
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const submit = this.dataForm.id ? opusApi.modify : opusApi.add
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
