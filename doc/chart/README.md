# :gear: Vue3 kaza-UI Chart


![1](./../../img/charts.jpg )

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
<template>
    <div class="container">
        <kazaCharts options="chartOptions" />
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
  max_ranger: 10, //自定义最大值
  auto_normalize: true, //按value的最小值最大值自动设置范围 此时min_ranger max_ranger 无效
  value: [-1.5,5.55,3.33] // 数值 如果没有数据请填 []
})


</script>
```


## :floppy_disk:Api

```
<template>

    <kazaCharts options="{}" />
</template>


```

|  :clipboard: | :bar_chart: api | :pushpin:类型   | :pencil2:默认值 | :ledger:备注 |
| :------: | :------: | :------:  | :------:   | :------:   |
| 1    | id   | String   | 没有默认值必须填写 | 避免时间重复  |
| 2    | width   | number   | 300 | 图标宽度 高度按宽度自动设置比例1/3 |
| 3    | color   |  string | '#000'  | 线的颜色 |
| 4    | fontColor   |  string | '#000'  | 数据字体的颜色 |
| 5    | min_ranger   |  number | 0  | 图表最小值 |
| 6    | max_ranger   |  number | 100  | 图表最大值 |
| 7    | auto_normalize   | Boolean | false  | 自动标准化数值 避免超出图表 |
| 8    | value   | Array | []  |  图表数据值 |