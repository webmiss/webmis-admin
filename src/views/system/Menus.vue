<template>
  <!-- Total -->
  <div class="app_total flex">
    <div class="total scrollbar">
      统计信息: <b>123</b>
    </div>
    <div class="refresh flex">
      <span class="time">2024/08/24 09:21:34</span>
      <i class="ui ui_refresh"></i>
    </div>
  </div>
  <!-- Content -->
  <div class="app_ct">
    <!-- Action -->
    <div class="app_action flex">
      <div class="botton">
        <wm-button effect="dark" type="primary" icon="ui ui_add" padding="0 16px 0 8px">添加</wm-button>
        <wm-button effect="plain" type="primary" icon="ui ui_edit" padding="0 16px 0 8px" :disabled="list.num!=1" @click="edit()">编辑</wm-button>
        <wm-button effect="plain" type="danger" icon="ui ui_del" padding="0 16px 0 8px" :disabled="list.num==0">删除({{ list.num }})</wm-button>
      </div>
      <div class="search flex">
        <wm-search v-model:show="sea.show" @search="sea.show=false" @reset="sea.show=false">
          <wm-main overflowY="auto">
            <wm-table-form>
              <tr>
                <td colspan="2">
                  <wm-input v-model:value="sea.form.title" placeholder="菜单名称" maxlength="16"></wm-input>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <wm-input v-model:value="sea.form.en" placeholder="英文名称" maxlength="16"></wm-input>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <wm-input v-model:value="sea.form.url" placeholder="前端路由" maxlength="32"></wm-input>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <wm-input v-model:value="sea.form.controller" placeholder="接口地址" maxlength="32"></wm-input>
                </td>
              </tr>
            </wm-table-form>
          </wm-main>
        </wm-search>
      </div>
    </div>
    <!-- Action End -->
    <!-- List -->
    <wm-table ref="tableList" :columns="list.columns" :options="list.data" @partially="selectState" height="calc(100% - 52px)">
      <template #id="d">
        <div class="tCenter">{{ d.id }}</div>
      </template>
      <template #title="d">
        {{ d.title }}
      </template>
    </wm-table>
    <!-- List End -->
  </div>
  <!-- Page -->
   <div class="app_page">
    <wm-page v-model:total="total.total"></wm-page>
   </div>
</template>

<style lang="less" scoped>
</style>

<script lang="ts" src="./Menus.ts"></script>