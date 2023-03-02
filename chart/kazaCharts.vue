<template>
    <div class=" inlineBlock">
        <svg class="box chart" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradient">
                    <stop offset="0" stop-color="#f7f8f8" />
                    <stop offset="33%" stop-color="#43c4da" />
                    <stop offset="65%" stop-color="#e244de" />
                    <stop offset="100%" stop-color="#d9f2f6" />
                </linearGradient>
            </defs>
            <g transform="translate(0, 100) scale(1,-1)">
                <path fill="none" class="ani" stroke="#50d99f" stroke-width="10" stroke-linejoin="round"
                    stroke-linecap="round" :d='getLine'></path>

            </g>
            <g class="g" transform="translate(0, 100) scale(1,-1)">

            </g>

        </svg>

    </div>
</template>


<script setup>
//todo 添加padding 
import { onMounted, ref, computed, watch, onUpdated } from 'vue';


const chartWidth = 600;



const addEvent = () => {
    let blockitem = document.querySelectorAll('.blockitem')

    let nodePoint = document.querySelectorAll('.points')
    let chart = document.querySelector('.chart')
    // nodePoint.forEach((el, i) => {
    //     let item = document.querySelectorAll('.item')
    //     let itemdata = document.querySelectorAll('.itemdata')

    //     el.addEventListener('mouseover', (e) => {

    //         item[i].style.opacity = 1
    //         itemdata[i].style.opacity = 1
    //     })
    //     el.addEventListener('mouseout', (e) => {
    //         item[i].style.opacity = 0
    //         itemdata[i].style.opacity = 0
    //     })
    // })
    blockitem.forEach((el, i) => {
        let item = document.querySelectorAll('.item')
        let itemdata = document.querySelectorAll('.itemdata')

        el.addEventListener('mouseenter', (e) => {
            el.setAttribute('fill', '#00000030')
            el.style.opacity = .3
            item[i].style.opacity = 1
            itemdata[i].style.opacity = 1

        })
        el.addEventListener('mouseleave', (e) => {
            el.setAttribute('fill', '#cccccc00')
            el.style.opacity = 0
            item[i].style.opacity = 0
            itemdata[i].style.opacity = 0

        })
    })


}

const createNode = () => {
    let data = getData.value.value
    let breakPoint = Math.floor(chartWidth / (data.length - 1))
    data.forEach((item, i) => {
        let chart = document.querySelector('.chart')
        let svg = document.querySelector('svg')
        let g = document.querySelector('.g')
        let value = 100 - item
        if (i === 0) {
            let block = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            block.setAttribute('x', ((breakPoint * i)).toString())
            block.setAttribute('y', '-50')
            block.setAttribute('width', breakPoint.toString())
            block.setAttribute('height', '200')
            // block.setAttribute('stroke','#000')
            // block.setAttribute('stroke-width','2')
            block.setAttribute('fill', 'transparent')
            block.classList = 'blockitem'

            let line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            line.setAttribute('fill', 'none')
            line.setAttribute('stroke', '#ccc')
            line.setAttribute('stroke-width', '1')
            line.setAttribute('stroke-linejoin', 'round')
            line.setAttribute('stroke-linecap', 'round')
            // line.setAttribute('d', `M${breakPoint * i},0 ${breakPoint * (i)},100`)
            line.setAttribute('d', `M${breakPoint * i},0 ${breakPoint * (i)},${data[i]}`)
            line.classList = 'item'
            line.style.opacity = 0
            
            let t = document.createElementNS('http://www.w3.org/2000/svg', 'text')
            t.setAttribute('text-anchor', 'middle')
            t.setAttribute('x', (breakPoint * i + (breakPoint/2)).toString())
            // t.setAttribute('y', (100 - data[i] - 20).toString())
            t.setAttribute('y', (data[i] - 20).toString())
            t.setAttribute('fill', '#000000')
            t.setAttribute('font-size', '32')
            t.classList = 'itemdata'
            t.innerHTML = data[i].toString()
            t.style.opacity = 0
            t.style.transformOrigin = 'center'
            t.style.transform = 'rotateX(180deg)'
            g.appendChild(t)
            g.appendChild(line)
            g.appendChild(block)
        } else if(i === data.length - 1) {
            let block = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            block.setAttribute('x', ((breakPoint * i) -(breakPoint)).toString())
            block.setAttribute('y', '-50')
            block.setAttribute('width', breakPoint.toString())
            block.setAttribute('height', '200')
            // block.setAttribute('stroke','#000')
            // block.setAttribute('stroke-width','2')
            block.setAttribute('fill', 'transparent')
            block.classList = 'blockitem'

            let line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            line.setAttribute('fill', 'none')
            line.setAttribute('stroke', '#ccc')
            line.setAttribute('stroke-width', '1')
            line.setAttribute('stroke-linejoin', 'round')
            line.setAttribute('stroke-linecap', 'round')
            // line.setAttribute('d', `M${breakPoint * i},0 ${breakPoint * (i)},100`)
            line.setAttribute('d', `M${breakPoint * i},0 ${breakPoint * (i)},${data[i]}`)
            line.classList = 'item'
            line.style.opacity = 0
            
            let t = document.createElementNS('http://www.w3.org/2000/svg', 'text')
            t.setAttribute('text-anchor', 'middle')
            t.setAttribute('x', (breakPoint * i - (breakPoint/2)).toString())
            // t.setAttribute('y', (100 - data[i] - 20).toString())
            t.setAttribute('y', (data[i] - 20).toString())
            t.setAttribute('fill', '#000000')
            t.setAttribute('font-size', '32')
            t.classList = 'itemdata'
            t.innerHTML = data[i].toString()
            t.style.opacity = 0
            t.style.transformOrigin = 'center'
            t.style.transform = 'rotateX(180deg)'
            g.appendChild(t)
            g.appendChild(line)
            g.appendChild(block)


        }else {
            //这是区块
            let block = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            block.setAttribute('x', ((breakPoint * i) - Math.floor(breakPoint / 2)).toString())
            block.setAttribute('y', '-50')
            block.setAttribute('width', breakPoint.toString())
            block.setAttribute('height', '200')
            // block.setAttribute('stroke','#000')
            // block.setAttribute('stroke-width','2')
            block.setAttribute('fill', 'transparent')
            block.classList = 'blockitem'
            //这是画标记点
            // let p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            // p.setAttribute('fill', 'none')
            // p.setAttribute('stroke', '#fff')
            // p.setAttribute('stroke-width', '10')
            // p.setAttribute('stroke-linejoin', 'round')
            // p.setAttribute('stroke-linecap', 'round')
            // p.setAttribute('d', `M${breakPoint * i},${item} ${breakPoint * (i)},${item}`)
            // p.classList = 'points'

            // g.appendChild(p)


            //这是画竖线
            let line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            line.setAttribute('fill', 'none')
            line.setAttribute('stroke', '#ccc')
            line.setAttribute('stroke-width', '1')
            line.setAttribute('stroke-linejoin', 'round')
            line.setAttribute('stroke-linecap', 'round')
            // line.setAttribute('d', `M${breakPoint * i},0 ${breakPoint * (i)},100`)
            line.setAttribute('d', `M${breakPoint * i},0 ${breakPoint * (i)},${data[i]}`)
            line.classList = 'item'
            line.style.opacity = 0

            //这是画数据
            let t = document.createElementNS('http://www.w3.org/2000/svg', 'text')
            t.setAttribute('text-anchor', 'middle')
            t.setAttribute('x', (breakPoint * i).toString())
            // t.setAttribute('y', (100 - data[i] - 20).toString())
            t.setAttribute('y', (data[i] - 20).toString())
            t.setAttribute('fill', '#000000')
            t.setAttribute('font-size', '32')
            t.classList = 'itemdata'
            t.innerHTML = data[i].toString()
            t.style.opacity = 0
            t.style.transformOrigin = 'center'
            t.style.transform = 'rotateX(180deg)'
            g.append(t)
            g.appendChild(line)
            g.appendChild(block)
        }






    })
}

watch(
    props.options, (o, n) => {
        let breakPoint = Math.floor(chartWidth / (props.options.value.length - 1))
        let item = document.querySelectorAll('.item')
        let itemdata = document.querySelectorAll('.itemdata')

        // let points = document.querySelectorAll('.points')
        let blockitem = document.querySelectorAll('.blockitem')

        // points.forEach((el, i) => {
        //     el.setAttribute('d', `M${breakPoint * i},${props.options.value[i]} ${breakPoint * (i)},${props.options.value[i]}`)
        //     itemdata[i].setAttribute('y',(100 - props.options.value[i] - 20).toString())
        //     itemdata[i].innerHTML = props.options.value[i].toString()
        //     itemdata[i].style.opacity = 0
        // })

        blockitem.forEach((el, i) => {
            el.setAttribute('d', `M${breakPoint * i},${props.options.value[i]} ${breakPoint * (i)},${props.options.value[i]}`)
            itemdata[i].setAttribute('y', (100 - props.options.value[i] - 20).toString())
            itemdata[i].innerHTML = props.options.value[i]

            item[i].setAttribute('d', `M${breakPoint * i},0 ${breakPoint * (i)},${props.options.value[i]}`)


        })
        addEvent()
    }
)

//这样可以提供默认值，不填也可以。。
const temp = ref({})
const getData = computed(() => {
    temp.value = {
        title: props.options.title || ' ',
        width: props.options.width || 300,
        height: props.options.height || 60,
        min_ranger: props.options.min_ranger || 0,
        max_ranger: props.options.max_ranger || 100,
        value: props.options.value || null
    }
    return temp.value
})




let debug = !true
const isdebug = () => {
    if (debug) {
        console.log(props.options)
        console.log(props.options.value[0])
    }
}
const isdebugRef = (arr, arr2) => {
    if (debug) {
        arr.forEach((element, i) => {
            console.log(arr2[i], element)
        });
    }
}

const props = defineProps(
    {
        options: {
            type: Object,
        }
    }
)
const getWidth = computed(() => {
    // return props.options.width + 'px'
    return temp.value.width + 'px'
})
const getHeight = computed(() => {
    return props.options.height + 'px'
})


const line = ref('M0,0')

const getLine = computed(() => {
    line.value = 'M'
    let data = props.options.value
    let breakPoint = Math.floor(chartWidth / (data.length - 1))
    let middlePoint = (i) => {
        let res = (breakPoint * i) - (breakPoint / 2)
        return res
    }
    let crulBreakPoint = (i) => {
        let res = breakPoint * i
        return res
    }

    for (let i = 0; i < props.options.value.length; i++) {
        if (i === 0) {
            // line.value = line.value + ' ' + (breakPoint * i) + ',' + data[i] + ' '
            line.value = ` ${line.value} ${middlePoint(i)},${data[i]} `
        } else {
            let cPoint = `C${middlePoint(i)},${data[i - 1]} ${middlePoint(i)},${data[i]} `
            let crulPoint = `${crulBreakPoint(i)},${data[i]} `
            line.value = `${line.value}${cPoint} ${crulPoint}`
            // line.value = line.value + 'C' + middlePoint(i) + ',' + data[i-1] + ' ' + middlePoint(i) + ',' + data[i] + ' ' + crulBreakPoint(i) + ',' + data[i] + ' '
        }
    }
    isdebugRef([breakPoint, line.value], ['breakPoint', 'line.value'])
    return line.value

})

onMounted(() => {
    createNode()
    addEvent()
    let test = document.querySelector('.test')
})
onUpdated(() => {
    let g = document.querySelector('.g')
    g.innerHTML = ''
    createNode()
    addEvent()
})



</script>

<style lang="less" scoped>
// @mainWidth: v-bind(getWidth);
// @mainHeight: v-bind(getHeight);
@mainWidth: v-bind(getWidth);
@mainHeight: v-bind(getHeight);

.inlineBlock {
    // margin-left: 10px;
    // margin-right: 10px;

    width: @mainWidth;
    height: @mainHeight;


    // border: 1px dotted #ccc;

    // box-shadow:1px 2px 5px 2px #ccc;
    // margin-bottom: 10px;

}

.box {

    width: @mainWidth;
    height: @mainHeight;
    // vertical-align: middle;
    position: relative;
    background-color: #ffffff00;

    // margin-bottom: 10px;

}

.chartItem {
    text-align: center;
    font-weight: blod;
}

.chartBoxContainer {
    width: @mainWidth;
    height: @mainHeight;





}

.base {
    width: @mainWidth;
    height: @mainHeight;
}

.chartbox {

    background-color: rgba(236, 236, 236, 0);
    transition: .3s ease-in-out;


}

.ani {
    // transition: .1s all ease-in-out;
}

.item {

    transition: 1s all ease-in-out;
    caret-color: transparent
}

.itemdata {
    &:extend(.item);
    caret-color: transparent;
}
</style>