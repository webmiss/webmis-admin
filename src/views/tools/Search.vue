<template>
  <div class=".wm-search_body">
    <div class="flex">
      <wmInput v-model:value="seaKey" @update:value="serachVal($event)" @iconClick="search()" :placeholder="placeholder || langs.keyword" width="210px" height="32px" lineHeight="32px" maxlength="32" icon="ui ui_search" iconAlign="right" padding="0 40px 0 10px" margin="0 5px 0 0"></wmInput>
      <wmButton effect="plain" @click="reset()">{{ langs.reset }}</wmButton>
      <wmButton effect="plain" icon="ui ui_arrow_right" padding="0 4px" @click="seaShow=true"></wmButton>
    </div>
    <!-- Content -->
    <div class="wm-search" :style="{visibility:seaShow?'inherit':'hidden'}">
      <wmPopup height="100%" :width="width" v-model:show="seaShow" position="right" bgColor="#FFF">
        <div class="wm-search_title flex">
          <h2>{{ title || langs.search }}</h2>
          <i class="ui ui_close" @click="close"></i>
        </div>
        <div class="wm-search_ct">
          <wmMain overflowY="auto">
            <wmTableForm>
              <tr v-for="(v, k) in columns" :key="k">
                <td>
                  <slot v-if="v.slot" v-bind="v" :name="v.slot" :index="k"></slot>
                  <wmInput v-else v-model:value="columns[k].value" :placeholder="v.label" :maxlength="v.maxlength?v.maxlength:''"></wmInput>
                </td>
              </tr>
            </wmTableForm>
          </wmMain>
        </div>
        <div class="wm-search_bottom flex">
          <div class="reset" @click="reset()">{{ langs.reset }}</div>
          <div class="search flex_center" @click="search()">{{ langs.confirm }}</div>
        </div>
      </wmPopup>
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

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
/* 组件 */
import wmMain from '../../components/container/main.vue';
import wmPopup from '../../components/popup/index.vue';
import wmTableForm from '../../components/table/form.vue';
import wmInput from '../../components/form/input/index.vue';
import wmButton from '../../components/form/button/index.vue';

/* 参数 */
const props = defineProps({
  show: {type: Boolean, default: false},              // 是否显示
  keys: {type: String, default: ''},                  // 关键字
  columns: {type: Array<any>, default: []},           // 字段: [{label: '名称', value: '', slot: 'name'}]
  title: {type: String, default: ''},                 // 标题
  width: {type: String, default: '420px'},            // 宽
  placeholder: {type: String, default: ''},           // 提示
});
const emit = defineEmits(['update:show', 'update:keys', 'search', 'reset']);
// 状态
const store = useStore();
const state = store.state;
const langs: any = state.langs;
// 变量
const seaShow = ref(false);
const seaKey = ref('');

/* 监听 */
watch(()=>props.show, (val: boolean)=>{
  seaShow.value = val;
},{ deep: true });
watch(()=>props.keys, (val: string)=>{
  seaKey.value = val;
},{ deep: true });
watch(seaShow, (val: boolean)=>{
  emit('update:show', val);
},{ deep: true });

/* 创建完成 */
onMounted(()=>{
  seaKey.value = props.keys;
});

/* 搜索内容 */
const serachVal = (val: string): void => {
  emit('update:keys', val);
}

/* 搜索 */
const search = (): void => {
  emit('search');
}

/* 重置 */
const reset = (): void => {
  emit('reset');
}

/* 关闭 */
const close = (): void => {
  emit('update:show', false);
}

</script>