<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" size="small" @keyup.enter.native="query">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="query">查询</el-button>
        <el-button v-if="$auth(authUrl, 'post')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="$auth(authUrl, 'delete')" type="danger" @click="deleteHandle()"
                   :disabled="dataListSelections.length <= 0">批量删除
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="dataList"
        border
        v-loading="dataListLoading"
        @selection-change="selectionChangeHandle"
        max-height="500"
        style="width: 100%;">
      <el-table-column
          type="selection"
          header-align="center"
          align="center"
          fixed="left"
          width="50">
      </el-table-column>
      <el-table-column
          header-align="center"
          align="center"
          label="序号"
          width="80"
          fixed="left"
      >
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="name"
          header-align="center"
          align="center"
          label="著作">
      </el-table-column>
      <el-table-column
          prop="authorName"
          header-align="center"
          align="center"
          label="作者">
      </el-table-column>
      <el-table-column
          prop="achievementTypeName"
          header-align="center"
          align="center"
          label="成果类型">
      </el-table-column>
      <el-table-column
          prop="publishingHouse"
          header-align="center"
          align="center"
          label="出版社">
      </el-table-column>
      <el-table-column
          prop="publishDate"
          header-align="center"
          align="center"
          label="出版时间">
        <template slot-scope="scope">
          <span v-if="scope.row.publishDate">{{ $dateString(scope.row.publishDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="isbn"
          header-align="center"
          align="center"
          label="ISBN">
      </el-table-column>
      <el-table-column
          prop="status"
          header-align="center"
          align="center"
          label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0">未提交</el-tag>
          <el-tag type="info" v-else-if="scope.row.status === 1">已提交</el-tag>
          <el-tag type="success" v-else-if="scope.row.status === 2">审核通过</el-tag>
          <el-tooltip v-else-if="scope.row.status === 3" class="item" effect="dark" :content="scope.row.returnMessage" placement="top">
            <el-tag type="danger">退回修改</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          width="150"
          label="操作">
        <template slot-scope="scope">
          <el-button
              type="text"
              size="small"
              @click="auditHandle(scope.row)"
              v-if="$auth(authUrl, 'audit')"
              :disabled="scope.row.status !== 1"
          >审核
          </el-button>
          <el-button
              type="text"
              size="small"
              @click="addOrUpdateHandle(scope.row)"
              :disabled="!$auth(authUrl, 'put')"
          >修改
          </el-button>
          <el-button
              type="text"
              size="small"
              @click="deleteHandle(scope.row)"
              :disabled="!$auth(authUrl, 'delete')"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        style="margin-top: 20px;"
        layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <!-- 审核 -->
    <audit v-if="auditVisible" ref="audit" @refreshDataList="getDataList"></audit>
  </div>
</template>

<script>
import opusApi     from '@/api/manager/opus'
import AddOrUpdate from './opus-add-or-update'
import Audit from './opus-audit'

export default {
  data () {
    return {
      authUrl: 'manager/opus',
      dataForm: {
        name: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      auditVisible: false
    }
  },
  components: {
    AddOrUpdate,
    Audit
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.dataForm.createBy = this.$auth(this.authUrl, 'audit') ? 0 : null
      opusApi.fuzzy(Object.assign({}, this.dataForm, {
        pageNum: this.pageIndex,
        pageSize: this.pageSize
      })).then(({ data }) => {
        this.dataList        = data.data
        this.totalPage       = parseInt(data.total)
        this.dataListLoading = false
      }).catch(_ => {
        this.dataListLoading = false
      })
    },
    query () {
      this.pageIndex = 1
      this.getDataList()
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize  = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(row)
      })
    },
    // 审核
    auditHandle (row) {
      this.auditVisible = true
      this.$nextTick(() => {
        this.$refs.audit.init(row, this.$auth(this.authUrl, 'audit'))
      })
    },
    // 删除
    deleteHandle (row) {
      const rows = row ? [row] : this.dataListSelections
      this.$confirm(`确定对[${rows.map(item => item.name).join(',')}]进行[${row ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        opusApi.batchRemove(rows).then(({ data }) => {
          if (data.data) {
            this.$notify.success({
              message: '删除成功',
              title: '删除'
            })
            this.getDataList()
          }
        })
      }).catch(_ => {
        this.$notify.info({
          message: '用户取消操作',
          title: '删除'
        })
      })
    }
  }
}
</script>
