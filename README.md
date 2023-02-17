# :gear: Vue3 kaza-UI 
这么烂大街的东西就不上npm了:shit:

![1](ProgressBar/img/bar.png)

## :tada:安装 install
```
npx degit https://github.com/kazawan/kaza-vue-ui.git [./src/components/kaza-UI]
```

## :unlock:使用 
引入
```
import bar from './components/kazaUI/ProgressBar/kazaProgressBar.vue'
```
使用
```
<bar />
```

## :floppy_disk:Api

```
<bar width="200px" height="200px" :count='getCount' barColor="#02C874" boardColor="000" title="usage" titleFont_size="20px"
      titleTop="32%" />
```

|  :clipboard: | :bar_chart: api | :pushpin:类型   | :pencil2:默认值 | :ledger:备注 |
| :------: | :------: | :------:  | :------:   | :------:   |
| 1    | width   | String   | '150px'  | 包住svg的div的宽度  |
| 2    | height   | String   |'150px' | 包住svg的div的高度  |
| 3    | count   | Number   | 0 | 中间那个数字 |
| 4    | font_size   | String   |'35px' | 中间那个数字的字体大小 |
| 5    | barColor   | String   |'#1e4adb'| 进度条的颜色 |
| 6    | boardColor   | String   |'#ccc'| 边框的颜色 |
| 7    | title   | String   |' ' | 自定义标题 |
| 8    | titleTop   | String   |'35%' | 标题高度 |
| 9    | titleFont_size   | String   |'10px'| 标题字体大小 |

