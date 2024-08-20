<template>
  <wm-dialog v-model:show="state.isPasswd" title="修改密码" width="420px" bottom="40px">
    <wm-main>
      <wm-table-form>
        <template  v-if="!form.is_vcode">
          <tr>
            <td>
              <wm-input v-model:value="form.uname" disabled placeholder="手机号码" maxlength="32" icon="ui ui_user" padding="0 10px 0 40px"></wm-input>
            </td>
          </tr>
          <tr>
            <td>
              <wm-input v-model:value="form.vcode" placeholder="输入验证码" maxlength="4"  icon="ui ui_safety" padding="0 10px 0 40px" :text="form.text" @textClick="getVcode()"></wm-input>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td class="lable">新密码</td>
            <td>
              <wm-input type="password" v-model:value="form.passwd1" placeholder="请输入新密码" maxlength="16"></wm-input>
            </td>
          </tr>
          <tr>
            <td class="lable">重复密码</td>
            <td>
              <wm-input type="password" v-model:value="form.passwd2" placeholder="请确认新密码" maxlength="16"></wm-input>
            </td>
          </tr>
        </template>
      </wm-table-form>
    </wm-main>
    <template #bottom>
      <wm-button effect="plain" type="primary" v-if="!form.is_vcode" @click="changePwd()">下一步</wm-button>
      <wm-button effect="plain" type="primary" v-if="form.is_vcode" @click="form.is_vcode=false">上一步</wm-button>
      <wm-button effect="dark" type="primary"  v-if="form.is_vcode" @click="changePwd()">确 认</wm-button>
    </template>
  </wm-dialog>
</template>

<style lang="less" scoped>
</style>

<script lang="ts" src="./Passwd.ts"></script>