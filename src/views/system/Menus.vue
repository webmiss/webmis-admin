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
        <wm-search v-model:show="sea.show" @update:submit="subSea('title')">
          <li>
            <wm-input v-model:value="sea.form.title" placeholder="菜单名称" clearable @input="subSea('title')" />
          </li>
          <li>
            <wm-input v-model:value="sea.form.en" placeholder="英文名称" clearable @input="subSea('en')" />
          </li>
          <li>
            <wm-input v-model:value="sea.form.controller" placeholder="API关键字" clearable @input="subSea('controller')" />
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
            <li v-if="getters.actionShow('add')"><wm-button type="primary" padding="0 16px" @click="add.show=true">添加</wm-button></li>
          </ul>
          <ul class="app_action_list flex_left">
            <li v-if="getters.actionShow('del')"><wm-button type="primary" effect="text" padding="0 2px" @click="exportData()">导出</wm-button></li>
          </ul>
        </div>
        <!-- 动作菜单 End -->
        <!-- List -->
        <div class="app_table scrollbar">
          <wm-table ref="Table" :isCheckbox="false" style="min-width: 1280px;">
            <template #title>
              <td width="40" class="tCenter">图标</td>
              <td>菜单名称</td>
              <td width="100" class="tCenter">日期</td>
              <td width="100" class="tCenter">操作</td>
              <td width="60" class="tCenter">权限</td>
              <td width="60" class="tCenter">排序</td>
              <td>英文</td>
              <td>URL</td>
              <td>API</td>
            </template>
            <!-- 一级菜单 -->
            <template v-for="(v1,k1) in page.list" :key="k1">
              <tr v-if="v1.show">
                <td class="tCenter">
                  <span class="menus_icon" v-if="v1.ico"><i :class="v1.ico"></i></span>
                </td>
                <td>- {{ v1.title }}</td>
                <td class="tCenter">
                  <wm-tag size="medium" :title="'创建: '+v1.ctime+'\n更新: '+v1.utime">{{ v1.utime.substr(0,10) }}</wm-tag>
                </td>
                <td class="tCenter">
                  <wm-button type="primary" effect="text" padding="0 4px" v-if="getters.actionShow('edit')" @click="editData(v1)">编辑</wm-button>
                  <wm-button type="danger" effect="text" padding="0 4px" v-if="getters.actionShow('del')" @click="delData(v1.id)">删除</wm-button>
                </td>
                <td class="tCenter">-</td>
                <td class="tCenter">{{ v1.sort }}</td>
                <td>{{ v1.en || '-' }}</td>
                <td>{{ v1.url }}</td>
                <td>{{ v1.controller }}</td>
              </tr>
              <!-- 二级菜单 -->
              <template v-for="(v2,k2) in v1.children" :key="k2">
                <tr v-if="v2.show">
                  <td class="tCenter">
                    <span class="menus_icon" v-if="v2.ico"><i :class="v2.ico"></i></span>
                  </td>
                  <td style="text-indent: 2em;">- {{ v2.title }}</td>
                  <td class="tCenter">
                    <wm-tag size="medium" :title="'创建: '+v2.ctime+'\n更新: '+v2.utime">{{ v2.utime.substr(0,10) }}</wm-tag>
                  </td>
                  <td class="tCenter">
                    <wm-button type="primary" effect="text" padding="0 4px" v-if="getters.actionShow('edit')" @click="editData(v2)">编辑</wm-button>
                    <wm-button type="danger" effect="text" padding="0 4px" v-if="getters.actionShow('del')" @click="delData(v2.id)">删除</wm-button>
                  </td>
                  <td class="tCenter">-</td>
                  <td class="tCenter">{{ v2.sort }}</td>
                  <td>{{ v2.en || '-' }}</td>
                  <td>{{ v2.url }}</td>
                  <td>{{ v2.controller }}</td>
                </tr>
                <!-- 三级级菜单 -->
                <template v-for="(v3,k3) in v2.children" :key="k3">
                  <tr v-if="v3.show">
                    <td class="tCenter">
                      <span class="menus_icon" v-if="v3.ico"><i :class="v3.ico"></i></span>
                    </td>
                    <td style="text-indent: 4em;">{{ v3.title }}</td>
                    <td class="tCenter">
                      <wm-tag size="medium" :title="'创建: '+v3.ctime+'\n更新: '+v3.utime">{{ v3.utime.substr(0,10) }}</wm-tag>
                    </td>
                    <td class="tCenter">
                      <wm-button type="primary" effect="text" padding="0 4px" v-if="getters.actionShow('edit')" @click="editData(v3)">编辑</wm-button>
                      <wm-button type="danger" effect="text" padding="0 4px" v-if="getters.actionShow('del')" @click="delData(v3.id)">删除</wm-button>
                    </td>
                    <td class="tCenter">
                      <wm-button type="danger" effect="text" padding="0 4px" v-if="getters.actionShow('perm') && v3.controller && !v3.action" @click="permData(v3.id, v3.title, v3.controller, v3.action)">设置</wm-button>
                      <wm-button type="primary" effect="text" padding="0 4px" v-else-if="getters.actionShow('perm') && v3.controller && v3.action" @click="permData(v3.id, v3.title, v3.controller, v3.action)">动作</wm-button>
                      <span v-else>-</span>
                    </td>
                    <td class="tCenter">{{ v3.sort }}</td>
                    <td>{{ v3.en || '-' }}</td>
                    <td>{{ v3.url }}</td>
                    <td>{{ v3.controller }}</td>
                  </tr>
                </template>
                <!-- 三级菜单 End -->
              </template>
              <!-- 二级菜单 End -->
            </template>
            <!-- 一级菜单 End -->
          </wm-table>
        </div>
        <wm-page :page="page.page" :limit="page.limit" :total="page.total"></wm-page>
        <!-- List End -->
      </div>
    </div>
    <!-- 内容 End -->

    <!-- Add -->
    <wm-dialog title="添加" width="700px" v-model:show="add.show">
      <wm-table-form>
        <tr>
          <td class="lable">所属</td>
          <td>
            <wm-cascader width="240px" v-model:keys="menus.keys" v-model:values="menus.values" :data="menus.data" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">名称</td>
          <td>
            <wm-input v-model:value="add.form.title" maxlength="16" maxWidth="90%" placeholder="菜单名称" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">英文</td>
          <td>
            <wm-input v-model:value="add.form.en" maxlength="16" maxWidth="90%" placeholder="英文名称" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">URL</td>
          <td>
            <wm-input v-model:value="add.form.url" maxlength="24" maxWidth="90%" placeholder="URL" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">API</td>
          <td>
            <wm-input v-model:value="add.form.controller" maxlength="64" maxWidth="90%" placeholder="例如: /admin/sys_menus" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">图标样式</td>
          <td>
            <wm-input v-model:value="add.form.ico" maxlength="32" maxWidth="90%" placeholder="图标样式" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">排序</td>
          <td>
            <wm-input v-model:value="add.form.sort" maxlength="2" maxWidth="240px" placeholder="例如: 1、2、3" />
          </td>
        </tr>
      </wm-table-form>
      <template #footer>
        <wm-button type="primary" @click="subAdd()">确 认</wm-button>
      </template>
    </wm-dialog>
    <!-- Add End -->

    <!-- Edit -->
    <wm-dialog title="编辑" width="700px" v-model:show="edit.show">
      <wm-table-form>
        <tr>
          <td class="lable">所属</td>
          <td>
            <wm-cascader width="240px" v-model:keys="menus.keys" v-model:values="menus.values" :data="menus.data" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">名称</td>
          <td>
            <wm-input v-model:value="edit.form.title" maxlength="16" maxWidth="90%" placeholder="菜单名称" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">英文</td>
          <td>
            <wm-input v-model:value="edit.form.en" maxlength="16" maxWidth="90%" placeholder="英文名称" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">URL</td>
          <td>
            <wm-input v-model:value="edit.form.url" maxlength="24" maxWidth="90%" placeholder="URL" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">API</td>
          <td>
            <wm-input v-model:value="edit.form.controller" maxlength="64" maxWidth="90%" placeholder="例如: /admin/sys_menus" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">图标样式</td>
          <td>
            <wm-input v-model:value="edit.form.ico" maxlength="32" maxWidth="90%" placeholder="图标样式" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">排序</td>
          <td>
            <wm-input v-model:value="edit.form.sort" maxlength="2" maxWidth="240px" placeholder="例如: 1、2、3" />
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
    <wm-dialog width="640px" :title="perm.title" v-model:show="perm.show">
      <wm-table :isCheckbox="false">
        <template #title>
          <td>名称</td>
          <td>动作</td>
          <td width="100">权限</td>
          <td width="30">
            <span class="center perm_an"><wm-add @click="permAdd()" /></span>
          </td>
        </template>
        <tr v-for="(v,k) in perm.list" :key="k">
          <td><wm-input :value="v.name" @update:value="v.name=$event" /></td>
          <td><wm-input :value="v.action" @update:value="v.action=$event" /></td>
          <td><wm-input :value="v.perm" @update:value="v.perm=$event" /></td>
          <td>
            <div class="center perm_an" ><wm-close @click="permRemove(k)" /></div>
          </td>
        </tr>
        <tr v-if="perm.list.length==0">
          <td height="160" class="null" colspan="4"></td>
        </tr>
      </wm-table>
      <template #footer>
        <wm-button type="primary" @click="subPerm()">确 认</wm-button>
      </template>
    </wm-dialog>
    <!-- Perm End -->

  </div>
</template>

<style lang="less" scoped>
.perm_an{margin-top: 6px;}
.menus_icon{position: absolute; transform: translate(-50%, -50%);}
.menus_icon i{font-size: 20px; color: @Primary;}
</style>

<script lang="ts" src="./Menus.ts"></script>
