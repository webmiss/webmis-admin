<template>
  <div class="wm-tree_body" :style="{width: width}">
    <!-- One -->
    <div class="wm-tree" v-for="(v1, k1) in listData" :key="k1">
      <div class="wm-tree_content flex_left" :style="{padding: padding, paddingLeft: '4px'}" @click="v1.display=!v1.display">
        <i :class="v1.children?'ui ui_arrow_right':''" :style="{transform: v1.display?'rotate(90deg)':'rotate(0deg)'}"></i>
        <wm-checkBox :partially="v1.children&&v1.checked&&v1.partially" @update:value="selectClick($event, '1', [k1, -1, -1, -1])" :options="{label:'', value:v1.value, checked:v1.checked, disabled:v1.disabled}"></wm-checkBox>
        <span class="label">{{ v1.label }}</span>
      </div>
      <!-- two -->
      <template v-if="v1.children&&v1.display">
        <div class="wm-tree" v-for="(v2, k2) in v1.children" :key="k2">
          <div class="wm-tree_content flex_left" :style="{padding: padding, paddingLeft: '20px'}" @click="v2.display=!v2.display">
            <i :class="v2.children?'ui ui_arrow_right':''" :style="{transform: v2.display?'rotate(90deg)':'rotate(0deg)'}"></i>
            <wm-checkBox :partially="v2.children&&v2.checked&&v2.partially" @update:value="selectClick($event, '2', [k1, k2, -1, -1])" :options="{label:'', value:v2.value, checked:v2.checked, disabled:v2.disabled}"></wm-checkBox>
            <span class="label">{{ v2.label }}</span>
          </div>
          <!-- three -->
          <template v-if="v2.children&&v2.display">
            <div class="wm-tree" v-for="(v3, k3) in v2.children" :key="k3">
              <div class="wm-tree_content flex_left" :style="{padding: padding, paddingLeft: '36px'}" @click="v3.display=!v3.display">
                <i :class="v3.children?'ui ui_arrow_right':''" :style="{transform: v3.display?'rotate(90deg)':'rotate(0deg)'}"></i>
                <wm-checkBox :partially="v3.children&&v3.checked&&v3.partially" @update:value="selectClick($event, '3', [k1, k2, k3, -1])" :options="{label:'', value:v3.value, checked:v3.checked, disabled:v3.disabled}"></wm-checkBox>
                <span class="label">{{ v3.label }}</span>
              </div>
              <!-- four -->
              <template v-if="v3.children&&v3.display">
                <div class="wm-tree" v-for="(v4, k4) in v3.children" :key="k4">
                  <div class="wm-tree_content flex_left" :style="{padding: padding, paddingLeft: '52px'}">
                    <i></i>
                    <wm-checkBox @update:value="selectClick($event, '4', [k1, k2, k3, k4])" :options="{label:'', value:v4.value, checked:v4.checked, disabled:v4.disabled}"></wm-checkBox>
                    <span class="label">{{ v4.label }}</span>
                  </div>
                </div>
              </template>
              <!-- four End -->
            </div>
          </template>
          <!-- three End -->
        </div>
      </template>
      <!-- two End -->
    </div>
    <!-- One End -->
  </div>
</template>

<style lang="less" scoped>
.wm-tree_body{color: @BrandText;}
.wm-tree{display: inline; transition: @Transition;}
.wm-tree_content{position: relative; cursor: pointer; height: 24px; line-height: 24px;}
.wm-tree_content:hover{background-color: @PageBackground;}
.wm-tree_content i{width: 16px; font-size: 10px; text-align: center;}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import wmCheckBox from '@/components/form/checkbox/index.vue'
@Options({
  components: { wmCheckBox },
  props: {
    value: {default: ''},                                   // 默认值: 
    options: {type: Array, default: []},                    // 数据: [{label:'一级菜单', value:'m1', children: []}]
    width: {type: String, default: '100%'},                 // 宽
    padding: {type: String, default: '2px 0'},              // 内部间距
    level: {type: Number, default: 3},                      // 菜单级数
  }
})
export default class Tree extends Vue {

  // 参数
  value!: any;
  options!: any;
  width!: string;
  height!: string;
  padding!: string;
  level!: number;
  // 变量
  show: boolean = false;
  selectObj: any = null;
  listData: Array<any> = [];

  /* 创建成功 */
  created(): void {
    // 监听
    this.$watch('value', (val:Array<any>)=>{
      let level: string = '';
      let k1: number = -1;
      let k2: number = -1;
      let k3: number = -1;
      let k4: number = -1;
      console.log(val);
      // // 一级
      // this.listData.forEach((v1: any, i1: number)=>{
      //   if(val[0]==v1.value) { level='1'; k1=i1; }
      //   // 二级
      //   if(v1.children) {
      //     v1.children.forEach((v2: any, i2: number)=>{
      //       if(val[1]==v2.value) { level='2'; k2=i2; }
      //       // 三级
      //       if(v2.children) {
      //         v2.children.forEach((v3: any, i3: number)=>{
      //           if(val[2]==v3.value) { level='3'; k3=i3; }
      //           // 四级
      //           if(v3.children) {
      //             v3.children.forEach((v4: any, i4: number)=>{
      //               if(val[3]==v4.value) { level='4'; k4=i4; }
      //             });
      //           }
      //         });
      //       }
      //     });
      //   }
      // });
      // if(level) this.selectClick(level, [k1, k2, k3, k4], false);
      // else this.clear();
    }, { deep: true });
    this.$watch('options', (val:Array<any>)=>{
      this.listData = val;
    }, { deep: true });
  }

  /* 创建完成 */
  public mounted(): void {
  }

  /* 选择 */
  selectClick(val: string, level: string, pos: Array<number>, isStatus: boolean=true): void {
    let d1: any, d2: any, d3: any, d4: any;
    // 层级
    if(level=='1') {
      // 选中
      d1 = this.listData[pos[0]];
      d1.checked = val?true:false;
      if(val) {
        // 勾选下级
        if(d1.children) this.selectChecked(d1.children, true);
      } else {
        if(d1.children) this.selectChecked(d1.children, false);
      }
    } else if(level=='2') {
      // 选中
      d2 = this.listData[pos[0]].children[pos[1]];
      d2.checked = val?true:false;
      if(val) {
        // 勾选上级
        this.listData[pos[0]].checked = true;
        // 勾选下级
        if(d2.children) this.selectChecked(d2.children, true);
      } else {
        if(d2.children) this.selectChecked(d2.children, false);
      }
      // 部分选择
      d1 = this.listData[pos[0]];
      this.isPartially(d1);
    } else if(level=='3') {
      // 选中
      d3 = this.listData[pos[0]].children[pos[1]].children[pos[2]];
      d3.checked = val?true:false;
      if(val) {
        // 勾选上级
        this.listData[pos[0]].checked = true;
        this.listData[pos[0]].children[pos[1]].checked = true;
        // 勾选下级
        if(d3.children) this.selectChecked(d3.children, true);
      } else {
        if(d3.children) this.selectChecked(d3.children, false);
      }
      // 部分选择
      d1 = this.listData[pos[0]];
      d2 = this.listData[pos[0]].children[pos[1]];
      this.isPartially(d2);
      this.isPartially(d1);
    } else if(level=='4') {
      // 选中、勾选上级
      d4 = this.listData[pos[0]].children[pos[1]].children[pos[2]].children[pos[3]];
      d4.checked = val?true:false;
      if(val) {
        this.listData[pos[0]].checked = true;
        this.listData[pos[0]].children[pos[1]].checked = true;
        this.listData[pos[0]].children[pos[1]].children[pos[2]].checked = true;
      }
      // 部分选择
      d1 = this.listData[pos[0]];
      d2 = this.listData[pos[0]].children[pos[1]];
      d3 = this.listData[pos[0]].children[pos[1]].children[pos[2]];
      this.isPartially(d3);
      this.isPartially(d2);
      this.isPartially(d1);
    }
    // 事件
    if(isStatus) {
      this.$emit('update:value', this.getData());
      this.$emit('data', this.listData);
    }
  }
  /* 是否选择 */
  private isPartially(d: any): void {
    let n: number = this.checkedNum(d.children);
    if(n==0){
      d.checked = false;
      d.partially = false;
    } else if(n==d.children.length){
      d.checked = true;
      d.partially = false;
    } else {
      d.checked = true;
      d.partially = true;
    }
  }
  /* 获取选中数量 */
  private checkedNum(data: any): number {
    let n: number = 0;
    for(let v of data) if(v.checked) n++;
    return n; 
  }

  /* 勾选下级 */
  selectChecked(data: any, checked: boolean): void {
    for(let i in data){
      data[i].checked = checked;
      if(data[i].children) this.selectChecked(data[i].children, checked);
    }
  }

  /* 获取数据 */
  getData(): Array<string> {
    let values: Array<string> = [];
    for(let v1 of this.listData) {
      if(v1.checked && !v1.children) values.push(v1.value);
      if(!v1.children) continue;
      for(let v2 of v1.children) {
        if(v2.checked && !v2.children) values.push(v2.value);
        if(!v2.children) continue;
        for(let v3 of v2.children) {
          if(v3.checked && !v3.children) values.push(v3.value);
          if(!v3.children) continue;
          for(let v4 of v3.children) {
            if(v4.checked && !v4.children) values.push(v4.value);
          }
        }
      }
    }
    return values;
  }

  /* 清空 */
  clear(): void {
    // this.$emit('update:value', '');
    this.selectChecked(this.listData, false);
  }

}
</script>