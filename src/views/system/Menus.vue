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
        <!-- Search -->
        <wm-search v-model:show="sea.show" v-model:keys="sea.keys" :columns="sea.columns" @keyup.enter="loadData()" @search="loadData()" @reset="resetData()">
          <template #time="d">
            <wm-date-picker v-model:value="sea.time" range :maxDate="sea.maxDate" :placeholder="d.label"></wm-date-picker>
          </template>
        </wm-search>
        <!-- Search End -->
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
    <wm-page v-model:total="page.total" v-model:page="page.num" @update:page="loadData()" v-model:limit="page.limit" @update:limit="page.num=1;loadData()"></wm-page>
   </div>
   <!-- Page End -->
</template>

<style lang="less" scoped>
</style>

<script lang="ts" src="./Menus.ts"></script>