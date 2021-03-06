<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.username" size="small" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getDataList()">查询</el-button>
        <el-button
            v-if="$auth(authUrl, 'post')"
            size="small"
            type="primary"
            @click="addOrUpdateHandle()"
        >新增
        </el-button>
        <el-button
            v-if="$auth(authUrl, 'delete')"
            size="small"
            type="danger"
            @click="deleteHandle()"
            :disabled="dataListSelections.length <= 0"
        >批量删除
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="dataList"
        border
        v-loading="dataListLoading"
        @selection-change="selectionChangeHandle"
        style="width: 100%;">
      <el-table-column
          type="selection"
          header-align="center"
          align="center"
          width="50"
          fixed="left"
      >
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
          prop="username"
          header-align="center"
          align="center"
          label="用户名">
      </el-table-column>
      <el-table-column
          prop="password"
          header-align="center"
          align="center"
          label="密码">
      </el-table-column>
      <el-table-column
          prop="salt"
          header-align="center"
          align="center"
          label="盐">
      </el-table-column>
      <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          width="150"
          label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="userRoleHandle(scope.row)">查看</el-button>
          <el-button
              :disabled="!$auth(authUrl, 'put')"
              type="text"
              size="small"
              @click="addOrUpdateHandle(scope.row)"
          >修改
          </el-button>
          <el-button
              :disabled="!$auth(authUrl, 'delete')"
              type="text"
              size="small"
              @click="deleteHandle(scope.row)"
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
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px;"
    >
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <!-- 用户-角色 -->
    <user-role v-if="userRoleVisible" ref="userRole"></user-role>
  </div>
</template>

<script>
import userApi     from '@/api/centre/user'
import AddOrUpdate from './user-add-or-update'
import UserRole from './role/user-role'

export default {
  data () {
    return {
      authUrl: 'centre/user',
      dataForm: {
        username: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      userRoleVisible: false
    }
  },
  components: {
    AddOrUpdate,
    UserRole
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      userApi.fuzzy(Object.assign({}, this.dataForm, {
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
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 用户-角色管理
    userRoleHandle (row) {
      this.userRoleVisible = true
      this.$nextTick(() => {
        this.$refs.userRole.init(row)
      })
    },
    // 删除
    deleteHandle (row) {
      const rows = row ? [row] : this.dataListSelections
      this.$confirm(`确定对[${rows.map(item => item.username).join(',')}]进行[${row ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userApi.batchRemove(rows).then(({ data }) => {
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
