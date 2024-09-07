<template>
  <div class="wm-tree_body" :style="{width: width}">
    <!-- One -->
    <div class="wm-tree" v-for="(v1, k1) in listData" :key="k1">
      <div class="wm-tree_content flex_left" :style="{padding: padding, paddingLeft: '4px'}">
        <i class="ui ui_arrow_right" :style="{transform: 'rotate(90deg)'}"></i>
        <wm-checkBox :partially="v1.children&&v1.checked&&v1.partially" @update:value="selectClick($event, '1', [k1, -1, -1, -1])" :options="{label:'', value:v1.value, checked:v1.checked, disabled:v1.disabled}"></wm-checkBox>
        <span class="label">{{ v1.label }}</span>
      </div>
      <!-- two -->
      <div class="wm-tree" v-for="(v2, k2) in v1.children" :key="k2">
        <div class="wm-tree_content flex_left" :style="{padding: padding, paddingLeft: '20px'}">
          <i class="ui ui_arrow_right" :style="{transform: 'rotate(90deg)'}"></i>
          <wm-checkBox :partially="v2.children&&v2.checked&&v2.partially" @update:value="selectClick($event, '2', [k1, k2, -1, -1])" :options="{label:'', value:v2.value, checked:v2.checked, disabled:v2.disabled}"></wm-checkBox>
          <span class="label">{{ v2.label }}</span>
        </div>
        <!-- three -->
        <div class="wm-tree" v-for="(v3, k3) in v2.children" :key="k3">
          <div class="wm-tree_content flex_left" :style="{padding: padding, paddingLeft: '36px'}">
            <i class="ui ui_arrow_right" :style="{transform: 'rotate(90deg)'}"></i>
            <wm-checkBox :partially="v3.children&&v3.checked&&v3.partially" @update:value="selectClick($event, '3', [k1, k2, k3, -1])" :options="{label:'', value:v3.value, checked:v3.checked, disabled:v3.disabled}"></wm-checkBox>
            <span class="label">{{ v3.label }}</span>
          </div>
          <!-- four -->
          <div class="wm-tree" v-for="(v4, k4) in v3.children" :key="k4">
            <div class="wm-tree_content flex_left" :style="{padding: padding, paddingLeft: '52px'}">
              <i></i>
              <wm-checkBox @update:value="selectClick($event, '4', [k1, k2, k3, k4])" :options="{label:'', value:v4.value, checked:v4.checked, disabled:v4.disabled}"></wm-checkBox>
              <span class="label">{{ v4.label }}</span>
            </div>
          </div>
          <!-- four End -->
        </div>
        <!-- three End -->
      </div>
      <!-- two End -->
    </div>
    <!-- One End -->
  </div>
</template>

<style lang="less" scoped>
.wm-tree_body{color: @BrandText;}
.wm-tree{display: inline;}
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
  k1: number = -1;
  k2: number = -1;
  k3: number = -1;
  k4: number = -1;
  labelName: string = '';

  /* 创建成功 */
  created(): void {
    // 监听
    this.$watch('value', (val:Array<any>)=>{
      let level: string = '';
      let k1: number = -1;
      let k2: number = -1;
      let k3: number = -1;
      let k4: number = -1;
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
    let labels: Array<any> = [];
    let values: Array<any> = [];
    // 位置
    this.k1= pos[0];
    this.k2= pos[1];
    this.k3= pos[2];
    this.k4= pos[3];
    // 层级
    if(level=='1') {
      // 选中
      this.listData[this.k1].checked = val?true:false;
      // this.selectClear(this.listData);
      // this.listData[this.k1].checked = true;
      // // 数据
      // labels = [this.listData[this.k1].label];
      // values = [this.listData[this.k1].value];
    } else if(level=='2') {
      // 选中、勾选上级
      this.listData[this.k1].children[this.k2].checked = val?true:false;
      if(val) {
        this.listData[this.k1].checked = true;
      }
      // 部分选择
      this.listData[this.k1].partially = this.isPartially(this.listData[this.k1].children);
      // this.selectClear(this.listData[this.k1].children);
      // this.listData[this.k1].checked = true;
      // this.listData[this.k1].children[this.k2].checked = true;
      // // 数据
      // labels = [
      //   this.listData[this.k1].label,
      //   this.listData[this.k1].children[this.k2].label,
      // ];
      // values = [
      //   this.listData[this.k1].value,
      //   this.listData[this.k1].children[this.k2].value,
      // ];
    } else if(level=='3') {
      // 选中、勾选上级
      this.listData[this.k1].children[this.k2].children[this.k3].checked = val?true:false;
      if(val) {
        this.listData[this.k1].checked = true;
        this.listData[this.k1].children[this.k2].checked = true;
      }
      // 部分选择
      this.listData[this.k1].partially = this.isPartially(this.listData[this.k1].children);
      this.listData[this.k1].children[this.k2].partially = this.isPartially(this.listData[this.k1].children[this.k2].children);
      // this.selectClear(this.listData[this.k1].children[this.k2].children);
      // this.listData[this.k1].checked = true;
      // this.listData[this.k1].children[this.k2].checked = true;
      // this.listData[this.k1].children[this.k2].children[this.k3].checked = true;
      // // 数据
      // labels = [
      //   this.listData[this.k1].label,
      //   this.listData[this.k1].children[this.k2].label,
      //   this.listData[this.k1].children[this.k2].children[this.k3].label,
      // ];
      // values = [
      //   this.listData[this.k1].value,
      //   this.listData[this.k1].children[this.k2].value,
      //   this.listData[this.k1].children[this.k2].children[this.k3].value,
      // ];
    } else if(level=='4') {
      // 选中、勾选上级
      this.listData[this.k1].children[this.k2].children[this.k3].children[this.k4].checked = val?true:false;
      if(val) {
        this.listData[this.k1].checked = true;
        this.listData[this.k1].children[this.k2].checked = true;
        this.listData[this.k1].children[this.k2].children[this.k3].checked = true;
      }
      // 部分选择
      this.listData[this.k1].partially = this.isPartially(this.listData[this.k1].children);
      this.listData[this.k1].children[this.k2].partially = this.isPartially(this.listData[this.k1].children[this.k2].children);
      this.listData[this.k1].children[this.k2].children[this.k3].partially = this.isPartially(this.listData[this.k1].children[this.k2].children[this.k3].children);
      // this.selectClear(this.listData[this.k1].children[this.k2].children[this.k3].children);
      // this.listData[this.k1].checked = true;
      // this.listData[this.k1].children[this.k2].checked = true;
      // this.listData[this.k1].children[this.k2].children[this.k3].checked = true;
      // this.listData[this.k1].children[this.k2].children[this.k3].children[this.k4].checked = true;
      // // 数据
      // labels = [
      //   this.listData[this.k1].label,
      //   this.listData[this.k1].children[this.k2].label,
      //   this.listData[this.k1].children[this.k2].children[this.k3].label,
      //   this.listData[this.k1].children[this.k2].children[this.k3].children[this.k4].label,
      // ];
      // values = [
      //   this.listData[this.k1].value,
      //   this.listData[this.k1].children[this.k2].value,
      //   this.listData[this.k1].children[this.k2].children[this.k3].value,
      //   this.listData[this.k1].children[this.k2].children[this.k3].children[this.k4].value,
      // ];
    }
    // 事件
    // this.labelName = labels.join(' > ');
    // if(isStatus){
    //   this.$emit('update:value', values);
    //   this.$emit('data', this.listData);
    // }
  }

  /* 是否部分选择 */
  private isPartially(data: any): boolean {
    if(!data) return false;
    let n: number = 0;
    for(let v of data) if(v.checked) n++;
    return n!=data.length;
  }

  /* 清空下级 */
  private selectClear(data: any): void {
    for(let i in data){
      data[i].checked = false;
      if(data[i].children) this.selectClear(data[i].children);
    }
  }

  /* 清空 */
  clear(): void {
    this.k1= -1;
    this.k2= -1;
    this.k3= -1;
    this.k4= -1;
    this.labelName = '';
    this.$emit('update:value', '');
    this.selectClear(this.listData);
  }

}
</script>