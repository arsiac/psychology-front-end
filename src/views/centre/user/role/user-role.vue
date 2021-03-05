<template>
  <div>
    <el-dialog
        :title="title"
        :visible.sync="visible"
        width="400px"
    >
      <el-table
          :data="dataList"
          border
          v-loading="dataListLoading"
          style="width: 100%;"
          max-height="300"
      >
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
            prop="roleName"
            header-align="center"
            align="center"
            label="角色">
        </el-table-column>
        <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            width="150"
            label="操作">
          <template slot="header">
            <el-button type="primary" @click="addOrUpdateHandle" icon="el-icon-plus" circle :disabled="!$auth('centre/user', 'post')"></el-button>
          </template>
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteHandle(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="init(user)"></add-or-update>
  </div>
</template>

<script>
import userRoleApi from '@/api/centre/user-role'
import AddOrUpdate from './user-role-add-or-update'

export default {
  data () {
    return {
      title: '',
      user: {},
      visible: false,
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  methods: {
    // 获取数据列表
    init (row) {
      this.user            = Object.assign({}, row)
      this.visible         = true
      this.dataListLoading = true
      this.title           = `查看: ${row.username}`

      userRoleApi.queryByUserId(row.id).then(({ data }) => {
        this.dataList        = data.data
        this.dataListLoading = false
      }).catch(_ => {
        this.$notify.error({
          title: '提示',
          message: '加载用户的角色失败'
        })
        this.dataListLoading = false
      })
    },
    // 新增 / 修改
    addOrUpdateHandle () {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(this.user)
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
        userRoleApi.batchRemove(rows).then(({ data }) => {
          if (data.data) {
            this.$notify.success({
              message: '删除成功',
              title: '删除'
            })
            this.init(this.role)
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
