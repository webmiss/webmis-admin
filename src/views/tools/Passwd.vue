<template>
  <wm-dialog v-model:show="state.isPasswd" title="修改密码" width="420px" bottom="40px">
    <wm-main>
      <table class="app_table">
        <tr>
          <td class="lable">手机号</td>
          <td>
            <wm-input v-model:value="form.tel" placeholder="手机号码" maxlength="11" textLen icon="ui ui_user" padding="0 10px 0 40px"></wm-input>
          </td>
        </tr>
        <tr>
          <td class="lable">验证码</td>
          <td>
            <wm-input v-model:value="form.vcode" placeholder="输入验证码" maxlength="4" icon="ui ui_safety" padding="0 10px 0 40px" :text="form.text" @textClick="getVcode()"></wm-input>
          </td>
        </tr>
      </table>
    </wm-main>
    <template #bottom>
      <span>按钮</span>
    </template>
  </wm-dialog>
</template>

<style lang="less" scoped>
</style>

<script lang="ts" src="./Passwd.ts"></script>