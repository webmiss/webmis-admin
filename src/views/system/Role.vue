<template>
  <div>
    <!-- 地址栏 -->
    <div class="app_addr flex">
      <div class="addr flex">
        <span>{{ state.menuTitle[1] }}</span>
        <span><i class="ui ui_arrow_right" /></span>
        <span class="link" @click="$router.replace({path:'/refresh'})">{{ state.menuTitle[2] }}</span>
      </div>
      <div class="app_addr_more flex">
        <span class="info">&nbsp;</span>
        <span class="reload" title="刷新" @click="loadData()"><i class="ui ui_refresh" /></span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="app_content flex">
      <div class="app_ct_left" v-show="sea.show">
        <!-- 搜索 -->
        <wm-search v-model:show="sea.show" @update:submit="subSea()">
          <li>
            <wm-input v-model:value="sea.form.name" maxlength="16" placeholder="角色名称" clearable @keyup.enter="subSea()" />
          </li>
        </wm-search>
        <!-- 搜索 End -->
      </div>
      <div class="app_ct_right" :style="{width: sea.show?'calc(100% - 260px)':''}">
        <!-- 动作菜单 -->
        <div class="app_action_body flex">
          <ul class="app_action_list flex_left">
            <li><wm-button type="primary" effect="text" padding="0 4px" class="flex" @click="sea.show=!sea.show"><i class="ui ui_search"></i>&nbsp;搜索</wm-button></li>
            <li class="line">|</li>
            <li v-if="getters.actionShow('add')"><wm-button effect="text" padding="0 4px" @click="add.show=true">添加</wm-button></li>
            <li v-if="getters.actionShow('edit')"><wm-button type="primary" effect="text" padding="0 4px" @click="editData()">编辑</wm-button></li>
            <li v-if="getters.actionShow('del')"><wm-button type="danger" effect="text" padding="0 4px" @click="delData()">删除</wm-button></li>
          </ul>
          <ul class="app_action_list flex_left">
            <li><wm-button type="primary" effect="text" padding="0 2px">导出</wm-button></li>
            <li class="line">|</li>
            <li><wm-button type="primary" effect="text" padding="0 2px">打印</wm-button></li>
          </ul>
        </div>
        <!-- 动作菜单 End -->
        <!-- List -->
        <div class="app_table scrollbar">
          <wm-table ref="Table" :data="page.list">
            <template #title>
              <td width="60">ID<wm-table-order :value="oby.list.id" @update:value="OrderBy('id', $event)" /></td>
              <td width="120">名称<wm-table-order :value="oby.list.name" @update:value="OrderBy('name', $event)" /></td>
              <td width="100">更新时间<wm-table-order :value="oby.list.utime" @update:value="OrderBy('utime', $event)" /></td>
              <td width="60" class="tCenter">权限</td>
              <td>权限值</td>
            </template>
            <tr v-for="(v,k) in page.list" :key="k">
              <td width="30" class="checkbox wm-table_checkbox">
                <wm-checkbox :value="v.id"></wm-checkbox>
              </td>
              <td>{{ v.id }}</td>
              <td><b>{{ v.name }}</b></td>
              <td>
                <wm-tag size="medium" :title="'创建: '+v.ctime+'\n更新: '+v.utime">{{ v.utime.substr(0,10) }}</wm-tag>
              </td>
              <td class="tCenter">
                <wm-button type="danger" effect="text" padding="0 4px"  v-if="getters.actionShow('perm') && !v.perm" @click="permData(v.id,v.perm)">设置</wm-button>
                <wm-button type="primary" effect="text" padding="0 4px" v-else-if="getters.actionShow('perm')" @click="permData(v.id,v.perm)">编辑</wm-button>
                <span v-else>-</span>
              </td>
              <td>{{ v.perm }}</td>
            </tr>
            <tr v-if="page.list.length==0">
              <td height="160" class="null" colspan="6"></td>
            </tr>
          </wm-table>
        </div>
        <wm-page :page="page.page" :limit="page.limit" :total="page.total" @update:page="subPage"></wm-page>
        <!-- List End -->
      </div>
    </div>
    <!-- 内容 End -->

    <!-- Add -->
    <wm-dialog title="添加" width="420px" v-model:show="add.show">
      <wm-table-form>
        <tr>
          <td class="lable">名称</td>
          <td>
            <wm-input v-model:value="add.form.name" maxlength="16" placeholder="角色名称" />
          </td>
        </tr>
      </wm-table-form>
      <template #footer>
        <wm-button type="primary" @click="subAdd()">确 认</wm-button>
      </template>
    </wm-dialog>
    <!-- Add End -->

    <!-- Edit -->
    <wm-dialog title="编辑" width="420px" v-model:show="edit.show">
      <wm-table-form>
        <tr>
          <td class="lable">名称</td>
          <td>
            <wm-input v-model:value="edit.form.name" maxlength="16" placeholder="角色名称" />
          </td>
        </tr>
      </wm-table-form>
      <template #footer>
        <wm-button type="primary" @click="subEdit()">确 认</wm-button>
      </template>
    </wm-dialog>
    <!-- Edit End -->

    <!-- Del -->
    <wm-dialog title="删除" width="360px" v-model:show="del.show">
      <wm-row>是否删除已选择数据？</wm-row>
      <template #footer>
        <wm-button type="danger" @click="subDel()">彻底删除</wm-button>
      </template>
    </wm-dialog>
    <!-- Del End -->

    <!-- Perm -->
    <wm-dialog title="权限" width="540px" v-model:show="perm.show">
      <wm-tree ref="perm" :data="perm.permList"></wm-tree>
      <template #footer>
        <wm-button type="primary" @click="subPerm()">确 认</wm-button>
      </template>
    </wm-dialog>
    <!-- Perm End -->

  </div>
</template>

<style scoped>
</style>

<script lang="ts" src="./Role.ts"></script>
