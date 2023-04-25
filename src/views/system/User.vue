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
            <wm-input v-model:value="sea.form.uname" placeholder="账号" clearable @keyup.enter="subSea()" />
          </li>
          <li>
            <wm-input v-model:value="sea.form.nickname" placeholder="昵称" clearable @keyup.enter="subSea()" />
          </li>
          <li>
            <wm-input v-model:value="sea.form.name" placeholder="姓名" clearable @keyup.enter="subSea()" />
          </li>
          <li>
            <wm-input v-model:value="sea.form.department" placeholder="部门" clearable @keyup.enter="subSea()" />
          </li>
          <li>
            <wm-input v-model:value="sea.form.position" placeholder="职务" clearable @keyup.enter="subSea()" />
          </li>
          <li>
            <wm-input v-model:value="sea.form.remark" placeholder="备注" clearable @keyup.enter="subSea()" />
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
            <li v-if="getters.actionShow('del')"><wm-button type="primary" effect="text" padding="0 2px" @click="exportData()">导出</wm-button></li>
          </ul>
        </div>
        <!-- 动作菜单 End -->
        <!-- List -->
        <div class="app_table scrollbar">
          <wm-table ref="Table" :data="page.list" style="min-width: 1280px;">
            <template #title>
              <td width="100">登录时间<wm-table-order :value="oby.list['a.ltime']" @update:value="OrderBy('a.ltime', $event)" /></td>
              <td width="32" class="tCenter">头像</td>
              <td width="120">账号<wm-table-order :value="oby.list['a.tel']" @update:value="OrderBy('a.tel', $event)" /></td>
              <td width="60" class="tCenter">状态</td>
              <td width="60" class="tCenter">系统权限</td>
              <td width="60" class="tCenter">API权限</td>
              <td width="60" class="tCenter">个人信息</td>
              <td>昵称<wm-table-order :value="oby.list['b.nickname']" @update:value="OrderBy('b.nickname', $event)" /></td>
              <td>姓名<wm-table-order :value="oby.list['b.name']" @update:value="OrderBy('b.name', $event)" /></td>
              <td width="40">性别<wm-table-order :value="oby.list['b.gender']" @update:value="OrderBy('b.gender', $event)" /></td>
              <td width="100">生日<wm-table-order :value="oby.list['b.birthday']" @update:value="OrderBy('b.birthday', $event)" /></td>
              <td>部门<wm-table-order :value="oby.list['b.department']" @update:value="OrderBy('b.department', $event)" /></td>
              <td>职务<wm-table-order :value="oby.list['b.position']" @update:value="OrderBy('b.position', $event)" /></td>
              <td>备注</td>
            </template>
            <tr v-for="(v,k) in page.list" :key="k">
              <td width="30" class="checkbox wm-table_checkbox">
                <wm-checkbox :value="v.uid"></wm-checkbox>
              </td>
              <td>
                <wm-tag size="medium" :title="'注册: '+v.rtime+'\n登录: '+v.ltime+'\n昵称: '+v.nickname+'\n姓名: '+v.name+'\n备注: '+v.remark">{{ v.ltime.substr(0,10) }}</wm-tag>
              </td>
              <td>
                <wm-img width="28px" height="28px" radius="50%" icoSize="16px" :url="v.img" :title="v.uid+''" @click="imgData(v.uid, v.img)"></wm-img>
              </td>
              <td><b>{{ v.tel || v.email || v.uname }}</b></td>
              <td class="tCenter">
                <wm-switch v-if="getters.actionShow('state')" :value="v.state" @update:value="setState($event,v.uid)"></wm-switch>
                <span v-else>-</span>
              </td>
              <td class="tCenter">
                <wm-button type="danger" effect="text" padding="0 4px" v-if="getters.actionShow('perm') && v.sys_perm" @click="permData('admin', v.uid, v.sys_role, v.sys_perm)">私有</wm-button>
                <wm-button type="primary" effect="text" padding="0 4px" v-else-if="getters.actionShow('perm') && v.sys_role" @click="permData('admin', v.uid, v.sys_role, v.sys_perm)">角色</wm-button>
                <wm-button type="info" effect="text" padding="0 4px" v-else-if="getters.actionShow('perm')" @click="permData('admin', v.uid, v.sys_role, v.sys_perm)">分配</wm-button>
                <span v-else>-</span>
              </td>
              <td>
                <wm-button type="danger" effect="text" padding="0 4px" v-if="getters.actionShow('perm') && v.api_perm" @click="permData('api', v.uid, v.api_role, v.api_perm)">私有</wm-button>
                <wm-button type="primary" effect="text" padding="0 4px" v-else-if="getters.actionShow('perm') && v.api_role" @click="permData('api', v.uid, v.api_role, v.api_perm)">角色</wm-button>
                <wm-button type="info" effect="text" padding="0 4px" v-else-if="getters.actionShow('perm')" @click="permData('api', v.uid, v.api_role, v.api_perm)">分配</wm-button>
                <span v-else>-</span>
              </td>
              <td>
                <wm-button type="info" effect="text" padding="0 4px" v-if="getters.actionShow('info')" @click="infoData(v)">修改</wm-button>
                <span v-else>-</span>
              </td>
              <td>{{ v.nickname || '-' }}</td>
              <td>{{ v.name || '-' }}</td>
              <td class="tCenter">{{ v.gender || '-' }}</td>
              <td>{{ v.birthday || '-' }}</td>
              <td>{{ v.department || '-' }}</td>
              <td>{{ v.position || '-' }}</td>
              <td>{{ v.remark }}</td>
            </tr>
            <tr v-if="page.list.length==0">
              <td height="160" class="null" colspan="13"></td>
            </tr>
          </wm-table>
        </div>
        <wm-page :page="page.page" :limit="page.limit" :total="page.total" @update:page="subPage"></wm-page>
        <!-- List End -->
      </div>
    </div>
    <!-- 内容 End -->

    <!-- Add -->
    <wm-dialog title="添加" width="400px" v-model:show="add.show">
      <wm-table-form>
        <tr>
          <td class="lable">手机</td>
          <td>
            <wm-input v-model:value="add.form.tel" maxlength="11" placeholder="输入手机号码" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">密码</td>
          <td>
            <wm-input v-model:value="add.form.passwd" maxlength="16" placeholder="默认密码" clearable />
          </td>
        </tr>
      </wm-table-form>
      <template #footer>
        <wm-button type="primary" @click="subAdd()">确 认</wm-button>
      </template>
    </wm-dialog>
    <!-- Add End -->

    <!-- Edit -->
    <wm-dialog title="编辑" width="400px" v-model:show="edit.show">
      <wm-table-form>
        <tr>
          <td class="lable">手机</td>
          <td>
            <wm-input v-model:value="edit.form.tel" maxlength="11" placeholder="输入手机号码" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">密码</td>
          <td>
            <wm-input v-model:value="edit.form.passwd" maxlength="16" placeholder="默认密码" clearable />
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

    <!-- Info -->
    <wm-dialog title="用户信息" width="640px" v-model:show="info.show">
      <wm-table-form>
        <tr>
          <td class="lable">昵称</td>
          <td>
            <wm-input v-model:value="info.form.nickname" maxlength="16" placeholder="用户昵称" />
          </td>
        </tr>
        <tr>
          <td class="lable">姓名</td>
          <td>
            <wm-input v-model:value="info.form.name" maxlength="16" placeholder="填写姓名" />
          </td>
        </tr>
        <tr>
          <td class="lable">生日</td>
          <td>
            <wm-date v-model:value="info.form.birthday"></wm-date>
          </td>
        </tr>
        <tr>
          <td class="lable">部门</td>
          <td>
            <wm-input v-model:value="info.form.department" maxlength="16" placeholder="部门名称" />
          </td>
        </tr>
        <tr>
          <td class="lable">职务</td>
          <td>
            <wm-input v-model:value="info.form.position" maxlength="16" placeholder="职务、职称" />
          </td>
        </tr>
        <tr>
          <td class="lable">备注</td>
          <td>
            <wm-input v-model:value="info.form.remark" type="textarea" height="64px" maxlength="128" placeholder='请填写备注' />
          </td>
        </tr>
      </wm-table-form>
      <template #footer>
        <wm-button type="primary" @click="subInfo()">确 认</wm-button>
      </template>
    </wm-dialog>
    <!-- Info End -->

    <!-- Perm -->
    <wm-dialog v-model:show="perm.show" title="权限" width="540px" tabsActive="role" :tabs="[{label:'角色', value:'role'},{label:'私有', value:'perm'}]">
      <template #role>
        <wm-radio :data="perm.roleList" v-model:value="perm.role"></wm-radio>
      </template>
      <template #perm>
        <wm-tree ref="perm" :data="perm.permList"></wm-tree>
      </template>
      <template #footer>
        <wm-button type="primary" @click="subPerm()">确 认</wm-button>
      </template>
    </wm-dialog>
    <!-- Perm End -->

    <!-- 图片 -->
    <wm-dialog :title="img.uid" width="240px" v-model:show="img.show" :footer="0" :bgClose="true">
      <div class="img_body">
        <img v-if="img.img" :src="img.img" alt="用户头像">
        <div v-else class="null"></div>
      </div>
    </wm-dialog>
    <!-- 图片 End -->

  </div>
</template>

<style scoped>
</style>

<script lang="ts" src="./User.ts"></script>
