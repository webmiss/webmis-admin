<template>
  <!-- Total -->
  <div class="app_total flex">
    <div class="total scrollbar">
      统计: 共 <b>{{ total.list.total }}</b> 条
    </div>
    <div class="refresh flex">
      <span class="time">{{ total.time }}</span>
      <i class="ui ui_refresh" @click="loadData()"></i>
    </div>
  </div>
  <!-- Content -->
  <div class="app_ct">
    <!-- Action -->
    <div class="app_action flex">
      <div class="botton">
        <wm-action :columns="[
          {action: 'add', slot: 'add', is_action: true},
          {action: 'edit', slot: 'edit', is_action: true},
          {action: 'del', slot: 'del', is_action: true},
        ]">
          <template #add>
            <wm-button effect="dark" type="primary" icon="ui ui_add" padding="0 16px 0 8px" @click="addData()">添加</wm-button>
          </template>
          <template #edit>
            <wm-button effect="plain" type="primary" icon="ui ui_edit" padding="0 16px 0 8px" :disabled="list.num!=1" @click="editData()">编辑</wm-button>
          </template>
          <template #del>
            <wm-button effect="plain" type="danger" icon="ui ui_del" padding="0 16px 0 8px" :disabled="list.num==0" @click="delData()">删除({{ list.num }})</wm-button>
          </template>
        </wm-action>
      </div>
      <div class="search flex">
        <!-- Search -->
        <wm-search v-model:show="sea.show" v-model:keys="sea.key" :columns="sea.columns" :placeholder="sea.placeholder" @keyup.enter="loadData()" @search="loadData()" @reset="resetData()">
          <template #time="d">
            <wm-date-picker v-model:value="sea.time" range :maxDate="sea.maxDate" :placeholder="d.label"></wm-date-picker>
          </template>
        </wm-search>
        <!-- Search End -->
      </div>
    </div>
    <!-- Action End -->
    <!-- List -->
    <wm-table class="table" ref="tableList" :columns="list.columns" :options="list.data" @orderBy="orderBy" @partially="selectState" height="calc(100% - 52px)">
      <template #id="d">
        <div class="tCenter">{{ d.id }}</div>
      </template>
      <template #fid="d">
        <div class="tCenter">{{ d.fid }}</div>
      </template>
      <template #ico="d">
        <div class="tCenter icon">
          <i v-if="d.ico" :class="d.ico"></i>
          <span v-else>-</span>
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
  <menus-save v-model:show="save.show" :type="save.type" :data="save.form" @submit="saveSubmit($event)"></menus-save>
  <!-- Del -->
  <menus-del v-model:show="del.show" :data="del.form" @submit="delSubmit($event)"></menus-del>
</template>

<style lang="less" scoped>
.table .icon i{display: inline-block; width: 32px; height: 32px; line-height: 32px; text-align: center; font-size: 20px;}
</style>

<script lang="ts" src="./index.ts"></script>