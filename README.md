# :gear: Vue3 kaza-UI 
哈哈哈哈:shit:

![1](https://github.com/kazawan/kaza-vue-ui/blob/main/img/total.png?raw=true)
![1](https://github.com/kazawan/kaza-vue-ui/blob/main/img/cals.jpg?raw=true)
GITHUB [https://github.com/kazawan/kaza-vue-ui]

## :tada:安装 install
```
npm i kaza-ui
```

## :unlock:使用 
引入
```
import kazaUI from 'kaza-ui'
import 'kaza-ui/lib/style.css'
app.use(kazaUI)
```
使用
```
<kazaCharts options="{}" />
<kazaProgressBar  ...args />
```

## :floppy_disk: Doc文档

---
* ### kazaCharts
 * :chart_with_upwards_trend: kazaCharts使用 [README](https://github.com/kazawan/kaza-vue-ui/blob/main/doc/chart/README.md)
使用
```
<template>
    <div class="container">
        <kazaCharts :options="chartOptions" />
    </div>
</template>

<script setup>
import { reactive } from 'vue' //推荐使用reactive
const chartOptions = reactive({
  id:'kazaChart', //id 必须填写 否则图标不生效并在图表中显示'Error no id input'
  color:'#3A98B9', //线的颜色 
  fontColor:'#fff', //字体的颜色
  width: 200, //图标宽度 高度按比例自动设置
  min_ranger: 0, //自定义最小值
  max_ranger: 100, //自定义最大值
  auto_normalize: true, //按value的最小值最大值自动设置范围 此时min_ranger max_ranger 无效
  value: [-1.5,5.55,3.33] // 数值 如果没有数据请填 []
})


</script>
```


#### :floppy_disk:Api

```
<template>

    <kazaCharts options="{}" />
</template>


```

| :clipboard: | :bar_chart: api | :pushpin:类型 |  :pencil2:默认值   |            :ledger:备注            |
| :---------: | :-------------: | :-----------: | :----------------: | :--------------------------------: |
|      1      |       id        |    String     | 没有默认值必须填写 |            避免时间重复            |
|      2      |      width      |    number     |        300         | 图标宽度 高度按宽度自动设置比例1/3 |
|      3      |      color      |    string     |       '#000'       |              线的颜色              |
|      4      |    fontColor    |    string     |       '#000'       |           数据字体的颜色           |
|      5      |   min_ranger    |    number     |         0          |             图表最小值             |
|      6      |   max_ranger    |    number     |        100         |             图表最大值             |
|      7      | auto_normalize  |    Boolean    |       false        |    自动标准化数值 避免超出图表     |
|      8      |      value      |     Array     |         []         |             图表数据值             |



---
### kazaProgressBar
* :bar_chart:kazaProgressBar [README](https://github.com/kazawan/kaza-vue-ui/blob/main/doc/progressbar/README.md)。
#### :floppy_disk:Api
使用
```
<bar width="200px" height="200px" :count='getCount' barColor="#02C874" boardColor="000" title="usage" titleFont_size="20px"
      titleTop="32%" />
```

| :clipboard: | :bar_chart: api | :pushpin:类型 | :pencil2:默认值 |      :ledger:备注      |
| :---------: | :-------------: | :-----------: | :-------------: | :--------------------: |
|      1      |      width      |    String     |     '150px'     |   包住svg的div的宽度   |
|      2      |     height      |    String     |     '150px'     |   包住svg的div的高度   |
|      3      |      count      |    Number     |        0        |      中间那个数字      |
|      4      |    font_size    |    String     |     '35px'      | 中间那个数字的字体大小 |
|      5      |    barColor     |    String     |    '#1e4adb'    |      进度条的颜色      |
|      6      |   boardColor    |    String     |     '#ccc'      |       边框的颜色       |
|      7      |      title      |    String     |       ' '       |       自定义标题       |
|      8      |    titleTop     |    String     |      '35%'      |        标题高度        |
|      9      | titleFont_size  |    String     |     '10px'      |      标题字体大小      |


---
### kazaLayout 
* :bar_chart:kazaLayout [README](https://github.com/kazawan/kaza-vue-ui/blob/main/doc/kazaLayout/README.md)。
#### :floppy_disk:Api
使用

```
<krow>
      <kcol span="24">
        <div >...</div>
      </kcol>
</krow>
```
#### kRow api

| :clipboard: | :bar_chart: api | :pushpin:类型 | :pencil2:默认值 |    :ledger:备注    |
| :---------: | :-------------: | :-----------: | :-------------: | :----------------: |
|      1      |     gutter      |    String     |       '0'       | 子元素kcol 的间隔  |
|      2      |     justify     |    String     |  'flex-start'   |      排列方式      |
|      3      |      wrap       |    String     |     'wrap'      | 不够位置时是否换行 |
|      4      |       mb        |    String     |       '0'       |       下间距       |
|      5      |       mt        |    String     |       '0'       |       上间距       |


#### kCol api
```
<kcol span="6"  xs="12"  md="6" animation animation-delay=".1">
```
#### kRow api

| :clipboard: | :bar_chart: api | :pushpin:类型 | :pencil2:默认值 | :ledger:备注 |
| :---------: | :-------------: | :-----------: | :-------------: | :----------: |
|      1      |      span       |    String     |       '2'       |  24栅格系统  |
|      2      |     justify     |    String     |  'flex-start'   |   排列方式   |
|      3      |      align      |    String     |  'flex-start'   |   排列方式   |
|      4      |    animation    |    Boolean    |      false      | 是否入场动画 |
|      5      | animationDelay  |    String     |        *        | 动画延迟时间 |

 ##### 响应式

| :clipboard: | :bar_chart: api |   :pushpin:范围   |
| :---------: | :-------------: | :---------------: |
|      1      |       xs        |     575.98px      |
|      2      |       sm        | 576px - 767.98px  |
|      3      |       md        | 768px - 991.98px  |
|      4      |       xl        | 992px - 1199.98px |
|      5      |       lg        |      1200px       |

---
### kazaSuperbody 
* :bar_chart:kazaSuperbody [README](https://github.com/kazawan/kaza-vue-ui/blob/main/doc/kazaSuperbody/README.md)。
#### :floppy_disk:Api

* 带字体响应式（手机端）解决老人看不到的问题。。。哈哈哈哈
* 实时显示平台 show-device 根据不同平台顶部topbar颜色有区别
* 实时显示浏览器尺寸 show-size

```
<superbody show-device show-size iphone-size="32px" win-size="24px">
    <krow>
      <kcol span="24">
        <div >...</div>
      </kcol>
    </krow>
</superbody>
```

| :clipboard: | :bar_chart: api | :pushpin:类型 | :pencil2:默认值 |     :ledger:备注     |
| :---------: | :-------------: | :-----------: | :-------------: | :------------------: |
|      1      |   show-device   |    String     |      false      | 显示当前使用设备平台 |
|      2      |    show-size    |    String     |      false      |  显示当前浏览器尺寸  |
|      3      |   iphone-size   |    String     |  1rem = '24px'  |    手机端字体大小    |
|      4      |    win-size     |    Boolean    | 1rem =  '16px'  |    桌面端字体大小    |


### Calender 
* :bar_chart:kaza-cals [README](https://github.com/kazawan/kaza-vue-ui/blob/main/doc/cals/README.md)。
#### :floppy_disk:Api

使用
```
<kcals ref="calsbox" v-on:click-item="showmethedata" :data="todolists"></kcals>

<script setup>
const yymmdd = ref(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
// 定义一个函数，用于显示数据
const showmethedata = (data) => {
  yymmdd.value = data
}


```

## :floppy_disk:Api

```
<template>

    <kazaCharts options="{}" />
</template>


```

| :clipboard: | :bar_chart: api | :pushpin:类型 | :pencil2:默认值 |    :ledger:备注    |
| :---------: | :-------------: | :-----------: | :-------------: | :----------------: |
|      1      |      data       |    Object     |   no default    | 可以传入todo待办件 |

数据结构
```
const todolist = {
    '2023-3-26': {
    todo: [
      {
        id: 1,
        content: '调音',
        timestart :'19:00',
        workzone:'希尔顿酒店',
        tags:'调音',
        payment:'1000元',
        color:'#EAB543'
      },
      {
        id: 2,
        content: 'shop333ping',
        timestart:'22:00',
        workzone:'利和超市',
        tags:'私人',
        color:'#FC427B'
      },]
    }
}
```