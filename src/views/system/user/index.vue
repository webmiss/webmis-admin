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
          {action: 'save', slot: 'add', is_action: true},
          {action: 'save', slot: 'edit', is_action: true},
          {action: 'del', slot: 'del', is_action: true},
          {action: 'export', slot: 'export', is_action: true},
        ]">
          <template #add>
            <wm-button effect="dark" type="primary" icon="ui ui_add" padding="0 16px 0 8px" @click="saveData('add')">添加</wm-button>
          </template>
          <template #edit>
            <wm-button effect="plain" type="primary" icon="ui ui_edit" padding="0 16px 0 8px" :disabled="list.num!=1" @click="saveData('edit')">编辑</wm-button>
          </template>
          <template #del>
            <wm-button effect="plain" type="danger" icon="ui ui_del" padding="0 16px 0 8px" :disabled="list.num==0" @click="delData()">删除({{ list.num }})</wm-button>
          </template>
          <template #export>
            <wm-button effect="plain" icon="ui ui_export" padding="0 16px 0 8px" :disabled="!total.list.total" @click="exportData(total.list.total)">导出({{ total.list.total }})</wm-button>
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
    <wm-table class="table" ref="tableList" :columns="list.columns" :options="list.data" @orderBy="orderBy" @partially="selectState" height="calc(100% - 58px)">
      <template #id="d">
        <div class="tCenter">{{ d.id }}</div>
      </template>
      <template #type="d">
        <div class="tCenter">{{ d.type_name || '-' }}</div>
      </template>
      <template #img="d">
        <div class="flex_center">
          <wm-img v-model:img="d.img"></wm-img>
        </div>
      </template>
      <template #uname="d">
        {{ d.uname || d.tel || d.email }}
      </template>
      <template #state="d">
        <div class="tCenter">
          <span :class="d.state?'c_success':'c_danger'">{{ d.state?'正常':'禁用' }}</span>
        </div>
      </template>
      <template #action="d">
        <div class="tCenter">
          <wm-button @click="saveData('copy', d)">复制</wm-button>
        </div>
      </template>
      <template #perm="d">
        <div class="tCenter">
          <wm-button v-if="d.perm" effect="text" type="danger" @click="saveData('edit', d)">私有</wm-button>
          <wm-button v-else-if="d.role" effect="text" type="primary" @click="saveData('edit', d)">{{ d.role_name }}</wm-button>
          <wm-button v-else effect="text" type="info" @click="saveData('edit', d)">设置</wm-button>
        </div>
      </template>
      <template #gender="d">
        <div class="tCenter">{{ d.gender || '-' }}</div>
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