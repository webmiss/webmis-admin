<template>
  <!-- Total -->
  <wm-total :time="total.time" @refresh="loadData()">
    <span v-html="langs.sys_role_total(page.total)"></span>
  </wm-total>
  <!-- Action -->
  <div class="app_action flex">
    <div class="app_action_tools scrollbar">
      <wm-action :columns="[
        {action: 'save', slot: 'add', is_action: true},
        {action: 'del', slot: 'del', is_action: true},
        {action: 'line', slot: 'line'},
        {action: 'export', slot: 'export', is_action: true},
      ]">
        <template #add>
          <wm-button effect="dark" type="primary" icon="ui ui_add" padding="0 16px 0 8px" @click="saveData('add')">{{ langs.add }}</wm-button>
        </template>
        <template #del>
          <wm-button effect="plain" type="danger" icon="ui ui_del" padding="0 16px 0 8px" :disabled="list.num==0" @click="delData()">{{ langs.del }}({{ list.num }})</wm-button>
        </template>
        <template #line>
          <span class="line">|</span>
        </template>
        <template #export>
          <wm-button effect="plain" icon="ui ui_export" padding="0 16px 0 8px" :disabled="!page.total" @click="exportData(page.total)">{{ langs.export }}({{ page.total }})</wm-button>
        </template>
      </wm-action>
    </div>
    <div class="app_action_search flex">
      <!-- Search -->
      <wm-search v-model:show="sea.show" v-model:keys="sea.key" :columns="sea.columns" @keyup.enter="loadData()" @search="loadData()" @reset="resetData()">
      </wm-search>
      <!-- Search End -->
    </div>
  </div>
  <!-- Action End -->
  <!-- Content -->
  <div class="app_ct">
    <!-- List -->
   <wm-table ref="tableList" overflow="auto" :columns="list.columns" :options="list.data" @orderBy="orderBy" @partially="selectState">
      <template #id="d">
        <div class="tCenter">{{ d.id }}</div>
      </template>
      <template #perm="d">
        <div class="tCenter">
          <wm-button @click="saveData('edit', d)" v-if="isAction('edit')">{{ langs.edit }}</wm-button>
        </div>
      </template>
      <template #date="d">
        <div class="tCenter">
          <wm-tag :title="'创建: '+d.ctime+'\n更新: '+d.utime">{{ d.utime.substr(0, 10) }}</wm-tag>
        </div>
      </template>
    </wm-table>
    <!-- List End -->
  </div>
  <!-- Page -->
  <div class="app_page">
    <wm-page v-model:total="page.total" v-model:page="page.num" @update:page="loadData()" v-model:limit="page.limit" @update:limit="page.num=1;loadData()"></wm-page>
  </div>
  <!-- Save -->
  <action-save v-model:show="save.show" :title="save.title" :data="save.data" @submit="saveSubmit($event)"></action-save>
  <!-- Del -->
  <action-del v-model:show="del.show" :data="del.data" @submit="delSubmit($event)"></action-del>
  <!-- Export -->
  <action-export v-model:show="exp.show" :data="getWhere()" :order="list.order" :num="exp.num" @submit="exportSubmit($event)"></action-export>
</template>

<style lang="less" scoped>
.table .icon i{display: inline-block; width: 32px; height: 32px; line-height: 32px; text-align: center; font-size: 20px;}
</style>

<script lang="ts" src="./index.ts"></script>