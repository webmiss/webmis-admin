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
        <span class="info">行业动态: <b>0</b> 条&nbsp;&nbsp;企业资讯: <b>0</b> 条</span>
        <span class="reload" title="刷新" @click="loadData()"><i class="ui ui_refresh" /></span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="app_content mtop10 flex">
      <div class="app_ct_left" v-show="sea.show">
        <!-- 搜索 -->
        <wm-search v-model:show="sea.show" @update:submit="subSea()">
          <li>
            <wm-select v-model:value="sea.form.cid" placeholder="选择分类" :data="menus.data" clearable />
          </li>
          <li>
            <wm-input v-model:value="sea.form.title" placeholder="新闻标题" clearable @keyup.enter="subSea()" />
          </li>
          <li>
            <wm-input v-model:value="sea.form.source" placeholder="来源" clearable @keyup.enter="subSea()" />
          </li>
          <li>
            <wm-input v-model:value="sea.form.author" placeholder="作者" clearable @keyup.enter="subSea()" />
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
            <li><wm-button type="primary" effect="text" padding="0 2px">导出</wm-button></li>
            <li class="line">|</li>
            <li><wm-button type="primary" effect="text" padding="0 2px">打印</wm-button></li>
          </ul>
        </div>
        <!-- 动作菜单 End -->
        <!-- List -->
        <div class="app_table scrollbar">
          <wm-table ref="Table" :data="page.list" style="min-width: 1200px;">
            <template #title>
              <td width="40">ID<wm-table-order :value="oby.list.id" @update:value="OrderBy('id', $event)" /></td>
              <td width="28">封面</td>
              <td>标题<wm-table-order :value="oby.list.title" @update:value="OrderBy('title', $event)" /></td>
              <td width="80">所属</td>
              <td width="120">时间<wm-table-order :value="oby.list.utime" @update:value="OrderBy('utime', $event)" /></td>
              <td width="60" class="tCenter">状态</td>
              <td width="60" class="tCenter">内容</td>
              <td>来源<wm-table-order :value="oby.list.source" @update:value="OrderBy('source', $event)" /></td>
              <td>作者<wm-table-order :value="oby.list.author" @update:value="OrderBy('author', $event)" /></td>
            </template>
            <tr v-for="(v,k) in page.list" :key="k">
              <td width="30" class="checkbox wm-table_checkbox">
                <wm-checkbox :value="v.id"></wm-checkbox>
              </td>
              <td>{{ v.id }}</td>
              <td>
                <wm-img width="28px" height="28px" radius="2px" icoSize="24px" :url="v.img" :title="v.title" @click="openShow(val)"></wm-img>
              </td>
              <td><div class="news_title" @click="openShow(v)">{{ v.title }}</div></td>
              <td>{{ menusName[v.cid] }}</td>
              <td>
                <wm-tag size="medium" :title="'创建: '+v.ctime+'\n更新: '+v.utime">{{ v.utime.substr(0,10) }}</wm-tag>
              </td>
              <td class="tCenter">
                <wm-switch v-if="getters.actionShow('state')" :value="v.state" @update:value="setState($event,v.id)"></wm-switch>
                <span v-else>-</span>
              </td>
              <td class="tCenter">
                <wm-button type="text" v-if="getters.actionShow('edit')" @click="setContent(v.id)">编辑</wm-button>
                <span v-else>-</span>
              </td>
              <td>{{ v.source }}</td>
              <td>{{ v.author }}</td>
            </tr>
            <tr v-if="page.list.length==0">
              <td height="160" class="null" colspan="10"></td>
            </tr>
          </wm-table>
        </div>
        <wm-page :page="page.page" :limit="page.limit" :total="page.total" @update:page="subPage"></wm-page>
        <!-- List End -->
      </div>
    </div>
    <!-- 内容 End -->

    <!-- Add -->
    <wm-dialog title="添加" width="720px" v-model:show="add.show">
      <wm-table-form>
        <tr>
          <td class="lable">封面图</td>
          <td>
            <wm-img width="120px" height="120px" radius="4px" :url="add.form.img" @click="upImg('add')"></wm-img>
          </td>
        </tr>
        <tr>
          <td class="lable">所属</td>
          <td>
            <wm-select v-model:value="add.form.cid" width="240px" placeholder="选择分类" :data="menus.data" />
          </td>
        </tr>
        <tr>
          <td class="lable">标题</td>
          <td>
            <wm-input v-model:value="add.form.title" maxlength="30" maxWidth="90%" placeholder="新闻标题" />
          </td>
        </tr>
        <tr>
          <td class="lable">来源</td>
          <td>
            <wm-input v-model:value="add.form.source" maxlength="16" maxWidth="240px" />
          </td>
        </tr>
        <tr>
          <td class="lable">作者</td>
          <td>
            <wm-input v-model:value="add.form.author" maxlength="16" maxWidth="240px" />
          </td>
        </tr>
        <tr>
          <td class="lable">摘要</td>
          <td>
            <wm-input v-model:value="add.form.summary" maxlength="300" maxWidth="90%" placeholder="新闻简介" />
          </td>
        </tr>
      </wm-table-form>
      <template #footer>
        <wm-button type="primary" @click="subAdd()">确 认</wm-button>
      </template>
    </wm-dialog>
    <!-- Add End -->

    <!-- Edit -->
    <wm-dialog title="编辑" width="720px" v-model:show="edit.show">
      <wm-table-form>
        <tr>
          <td class="lable">封面图</td>
          <td>
            <wm-img width="120px" height="120px" radius="4px" :url="edit.form.img" @click="upImg('edit')"></wm-img>
          </td>
        </tr>
        <tr>
          <td class="lable">所属</td>
          <td>
            <wm-select v-model:value="edit.form.cid" width="240px" placeholder="选择分类" :data="menus.data" />
          </td>
        </tr>
        <tr>
          <td class="lable">标题</td>
          <td>
            <wm-input v-model:value="edit.form.title" maxlength="30" maxWidth="90%" placeholder="新闻标题" />
          </td>
        </tr>
        <tr>
          <td class="lable">来源</td>
          <td>
            <wm-input v-model:value="edit.form.source" maxlength="16" maxWidth="240px" />
          </td>
        </tr>
        <tr>
          <td class="lable">作者</td>
          <td>
            <wm-input v-model:value="edit.form.author" maxlength="16" maxWidth="240px" />
          </td>
        </tr>
        <tr>
          <td class="lable">摘要</td>
          <td>
            <wm-input v-model:value="edit.form.summary" maxlength="300" maxWidth="90%" placeholder="新闻简介" />
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

    <!-- Show -->
    <wm-dialog title="预览" width="720px" v-model:show="content.show" :isFooter="false">
      <div class="news_body">
        <h1 class="title">{{content.form.title}}</h1>
        <div class="info">{{content.form.utime}} | 作者: {{content.form.author}} | 来源：{{content.form.source}}</div>
        <div class="news_html" v-html="content.form.content"></div>
      </div>
    </wm-dialog>
    <!-- Show End -->

    <!-- Content -->
    <wm-dialog title="新闻内容" width="760px" v-model:show="content.edit">
      <wm-tinymce class="form" v-model:value="content.form.content" :menubar="true" :height="500" :upload="content.upload" placeholder="新闻内容"></wm-tinymce>
      <template #footer>
        <wm-button type="primary" @click="subContent()">确 认</wm-button>
      </template>
    </wm-dialog>
    <!-- Content End -->

  </div>
</template>

<style lang="less" scoped>
/* 标题 */
.news_title{cursor: pointer; line-height: 20px; padding: 8px 0;}
.news_title:hover{color: @Primary;}
.form{padding-top: 10px;}
/* 预览 */
.news_body{padding: 16px;}
.news_body .title{padding: 8px 0; line-height: 1.5em; font-size: 28px; font-weight: 700;}
.news_body .info{line-height: 1.5em; color: #999;}
.news_html{overflow: hidden; line-height: 1.8em; font-size: 14px; padding: 16px 0 40px 0;}
.news_html p{margin: 10px 0;}
.news_html h1{font-size: 20px; font-weight: 700; padding: 16px 0 8px 0;}
.news_html h2{font-size: 18px; font-weight: 700; padding: 16px 0 8px 0;}
.news_html img{width: 100%;}
.news_html video{width: 100%;}
</style>

<script lang="ts" src="./News.ts"></script>