<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" size="small" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.name" size="small" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button
            v-if="$auth('centre/role', 'post')"
            size="small"
            type="primary"
            @click="addOrUpdateHandle()"
        >新增
        </el-button>
        <el-button
            v-if="$auth('centre/role', 'delete')"
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
        max-height="500"
        style="width: 100%;"
    >
      <el-table-column
          type="selection"
          header-align="center"
          align="center"
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
          label="角色名称">
      </el-table-column>
      <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          width="150"
          label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="roleResourceHandle(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row)">删除</el-button>
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
    <!-- 角色-资源 -->
    <role-resource v-if="roleResourceVisible" ref="roleResource"></role-resource>
  </div>
</template>

<script>
import roleApi     from '@/api/centre/role'
import AddOrUpdate from './role-add-or-update'
import RoleResource from './resource/role-resource'

export default {
  data () {
    return {
      dataForm: {
        name: null
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      roleResourceVisible: false
    }
  },
  components: {
    AddOrUpdate,
    RoleResource
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      roleApi.fuzzy(Object.assign({}, this.dataForm, {
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
    addOrUpdateHandle (row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(row)
      })
    },
    // 查看角色资源信息
    roleResourceHandle (row) {
      this.roleResourceVisible = true
      this.$nextTick(() => {
        this.$refs.roleResource.init(row)
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
        roleApi.batchRemove(rows).then(({ data }) => {
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

<style lang="less" scoped>
@import "public/theme";
</style>
