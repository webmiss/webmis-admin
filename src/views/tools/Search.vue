<template>
  <div class=".wm-search_body">
    <div class="flex">
      <wm-input v-model:value="seaKey" @update:value="serachVal($event)" @iconClick="search()" :placeholder="placeholder || langs.keyword" width="210px" height="32px" lineHeight="32px" maxlength="32" icon="ui ui_search" iconAlign="right" padding="0 40px 0 10px" margin="0 5px 0 0"></wm-input>
      <wm-button effect="plain" @click="reset()">{{ langs.reset }}</wm-button>
      <wm-button effect="plain" icon="ui ui_arrow_right" padding="0 4px" @click="seaShow=true"></wm-button>
    </div>
    <!-- Content -->
    <div class="wm-search" :style="{visibility:seaShow?'inherit':'hidden'}">
      <wm-popup height="100%" :width="width" v-model:show="seaShow" position="right" bgColor="#FFF">
        <div class="wm-search_title flex">
          <h2>{{ title || langs.search }}</h2>
          <i class="ui ui_close" @click="close"></i>
        </div>
        <div class="wm-search_ct">
          <wm-main overflowY="auto">
            <wm-table-form>
              <tr v-for="(v, k) in columns" :key="k">
                <td>
                  <slot v-if="v.slot" v-bind="v" :name="v.slot" :index="k"></slot>
                  <wm-input v-else v-model:value="columns[k].value" :placeholder="v.label" :maxlength="v.maxlength?v.maxlength:''"></wm-input>
                </td>
              </tr>
            </wm-table-form>
          </wm-main>
        </div>
        <div class="wm-search_bottom flex">
          <div class="reset" @click="reset()">{{ langs.reset }}</div>
          <div class="search flex_center" @click="search()">{{ langs.confirm }}</div>
        </div>
      </wm-popup>
    </div>
  </div>
  
</template>

<style lang="less" scoped>
.wm-search{position: absolute; top: 50px; right: 0; width: 100%; height: calc(100% - 50px);}
.wm-search_title{padding: 8px 16px; height: 32px; line-height: 32px;}
.wm-search_title h2{font-size: 16px; font-weight: bold;}
.wm-search_title i{cursor: pointer; width: 32px; height: 32px; font-size: 12px; text-align: center; border-radius: 50%;}
.wm-search_title i:hover{color: @Primary; background-color: @Minor8;}
.wm-search_ct{height: calc(100% - 96px); border: @LighterBorder 1px solid;}
.wm-search_bottom{height: 48px; line-height: 48px; text-align: center;}
.wm-search_bottom div{cursor: pointer; width: 50%;}
.wm-search_bottom .reset{color: @RegularText; background-color: #FFF;}
.wm-search_bottom .reset:hover{background: linear-gradient(@BaseFill, @DarkerFill);}
.wm-search_bottom .search{color: #FFF; background-color: @Primary; font-weight: bold;}
.wm-search_bottom .search:hover{background: linear-gradient(@Primary, @Primary1);}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';
/* 组件 */
import wmMain from '@/components/container/main.vue'
import wmPopup from '@/components/popup/index.vue'
import wmTableForm from '@/components/table/form.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'

@Options({
  components: { wmMain, wmPopup, wmTableForm, wmInput, wmButton },
  props: {
    show: {type: Boolean, default: false},              // 是否显示
    keys: {type: String, default: ''},                  // 关键字
    columns: {type: Array, default: []},                // 字段: [{label: '名称', value: '', slot: 'name'}]
    title: {type: String, default: ''},                 // 标题
    width: {type: String, default: '360px'},            // 宽
    placeholder: {type: String, default: ''},           // 提示
  }
})
export default class Search extends Vue {
  // 参数
  show!: boolean;
  keys!: string;
  columns!: Array<any>;
  title!: string;
  width!: string;
  placeholder!: string;
  // 状态
  private store: any = useStore();
  state: any = this.store.state;
  // 语言
  langs: any = this.state.langs;
  // 变量
  seaShow: boolean = false;
  seaKey: string = '';

  /* 创建成功 */
  created(): void {
    this.$watch('show', (val:boolean)=>{
      this.seaShow = val;
    }, { deep: true });
    this.$watch('keys', (val:string)=>{
      this.seaKey = val;
    }, { deep: true });
    this.$watch('seaShow', (val:boolean)=>{
     this.$emit('update:show', val);
    }, { deep:  true });
  }
  /* 创建完成 */
  public mounted(): void {
    this.seaKey = this.keys;
  }

  /* 搜索内容 */
  serachVal(val: string): void {
    this.$emit('update:keys', val);
  }

  /* 搜索 */
  search(): void {
    this.$emit('search');
  }

  /* 重置 */
  reset(): void {
    this.$emit('reset');
  }

  /* 关闭 */
  close(): void {
    this.$emit('update:show', false);
  }

}
</script>