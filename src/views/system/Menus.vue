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
        <wm-button effect="plain" type="primary" icon="ui ui_edit" padding="0 16px 0 8px" :disabled="true">编辑</wm-button>
        <wm-button effect="plain" type="danger" icon="ui ui_del" padding="0 16px 0 8px" :disabled="true">删除</wm-button>
      </div>
      <div class="search flex">
        <wm-search v-model:show="sea.show" @search="sea.show=false" @reset="sea.show=false">
          <wm-main overflowY="auto">
            <wm-table-form>
              <tr>
                <td class="lable">名称</td>
                <td colspan="2">
                  <wm-input v-model:value="sea.form.title" placeholder="菜单名称" maxlength="16"></wm-input>
                </td>
              </tr>
              <tr>
                <td class="lable">英文</td>
                <td colspan="2">
                  <wm-input v-model:value="sea.form.en" placeholder="英文名称" maxlength="16"></wm-input>
                </td>
              </tr>
              <tr>
                <td class="lable">地址</td>
                <td colspan="2">
                  <wm-input v-model:value="sea.form.url" placeholder="路由地址" maxlength="32"></wm-input>
                </td>
              </tr>
              <tr>
                <td class="lable">接口</td>
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
  </div>
  <!-- Page -->
   <div class="app_page"></div>
</template>

<style lang="less" scoped>
.wm-table_form .lable{width: 60px;}
</style>

<script lang="ts" src="./Menus.ts"></script>