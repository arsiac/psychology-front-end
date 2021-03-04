<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input size="small" v-model="dataForm.name" placeholder="名称" clearable/>
      </el-form-item>
      <el-form-item>
        <el-select size="small" v-model="dataForm.type" placeholder="类型">
          <el-option label="无" :value="null"/>
          <el-option label="分组" :value="1"/>
          <el-option label="菜单" :value="2"/>
          <el-option label="权限" :value="3"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getDataList()">查询</el-button>
        <el-button
            v-if="$auth('centre/resource', 'post')"
            size="small"
            type="primary"
            @click="addOrUpdateHandle()"
        >新增
        </el-button>
        <el-button
            v-if="$auth('centre/resource', 'delete')"
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
          prop="name"
          header-align="center"
          align="center"
          label="资源名称">
      </el-table-column>
      <el-table-column
          prop="icon"
          header-align="center"
          align="center"
          label="图标"
          width="80"
      >
        <template slot-scope="scope">
          <i v-if="scope.row.icon && scope.row.icon !== ''" :class="'fa ' + scope.row.icon"></i>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="uri"
          header-align="center"
          align="center"
          label="URI">
        <template slot-scope="scope">
          <span v-if="scope.row.uri">{{ scope.row.uri }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="type"
          header-align="center"
          align="center"
          label="类型"
          width="100"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 1" type="warning">分组</el-tag>
          <el-tag v-else-if="scope.row.type === 2" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.type === 3" type="info">权限</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="parent"
          header-align="center"
          align="center"
          label="所属">
        <template slot-scope="scope">
          <span v-if="scope.row.parent">{{ scope.row.parent }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          width="150"
          label="操作"
      >
        <template slot-scope="scope">
          <el-button
              v-if="$auth('centre/resource', 'put')"
              type="text"
              size="small"
              @click="addOrUpdateHandle(scope.row)"
          >修改
          </el-button>
          <el-button
              v-if="$auth('centre/resource', 'delete')"
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
  </div>
</template>

<script>
import resourceApi from '@/api/centre/resource'
import AddOrUpdate from './resource-add-or-update'

export default {
  data () {
    return {
      dataForm: {
        name: null,
        type: null
      },
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
  mounted () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      resourceApi.fuzzy(Object.assign({}, this.dataForm, {
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
    // 删除
    deleteHandle (row) {
      const rows = row ? [row] : this.dataListSelections
      this.$confirm(`确定对[${rows.map(item => item.name).join(',')}]进行[${row ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resourceApi.batchRemove(rows).then(({ data }) => {
          if (data.data) {
            this.$notify.success({
              message: '删除成功',
              title: '删除'
            })
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
@import "public/theme.less";
</style>
