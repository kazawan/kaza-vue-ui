<script>
export default {
    name: 'k-col'
}
</script>

<script setup>
/**
 * * 增加进场动画
 * * 增加媒体查询 
 * *像这样 <kcol xs="12" sm="6" md="4" lg="3" xl="2" />
 * */
import { computed, reactive, onMounted, ref, onBeforeUnmount, onUpdated } from 'vue';
const props = defineProps({
    span: {
        type: [Number, String],

    },
    justify: String,
    align: String,
    textAlign: String,
    xl: String,
    lg: String,
    md: String,
    sm: String,
    xs: String,
    animation:Boolean,
    animationDelay:[Number, String],

})

function checkList(list, value) {
    // console.log('d')
    return list.indexOf(value) != -1 ? value : list[0]

}

const temp = reactive({})
const getTemp = computed(() => {
    temp.value = {
        span: props.span || 2,
        justify: checkList(justifyList, props.justify),
        align: checkList(alignList, props.align),
        fadeIN: props.animation ,
        xl: props.xl || props.span,
        lg: props.lg || props.span,
        md: props.md || props.span,
        sm: props.sm || props.span,
        xs: props.xs || props.span,

    }
    return temp
})
//动画
const getDelay = computed(() => {
    return props.animationDelay? Number(props.animationDelay) + 's' : 0+'s' 
})

//justify
const justifyList = ['flex-start', 'flex-end', 'center', 'space-between',]
const getJustify = computed(() => {
    return getTemp.value.value.justify
})

//align
const alignList = ['flex-start', 'flex-end', 'center']
const getAlign = computed(() => {
    return getTemp.value.value.align
})

//span
const ishidden = ref(false)
const getHidden = computed(() => {
    return ishidden.value
})

const sizeCheck = (value) => {
    if (Number(value) <= 0) {

        return 0
    }
    if (Number(value) > 24) {

        return 24
    }
    return value
}

const sizeList = {
    'xs': sizeCheck(getTemp.value.value.xs),
    'sm': sizeCheck(getTemp.value.value.sm),
    'md': sizeCheck(getTemp.value.value.md),
    'lg': sizeCheck(getTemp.value.value.lg),
    'xl': sizeCheck(getTemp.value.value.xl),
    'span': sizeCheck(getTemp.value.value.span)
}
const getSize = computed((size) => {
    return (size) => {
        let res;
        res = 1 / 24 * Number(sizeList[size]) * 100
        return res.toFixed(2) + '%'
    }

})

const getVis = computed((size) => {
    return (size) => {
        if (Number(sizeList[size]) <= 0) {
            return '0'
        }
    }
})

const getDisplay = computed((size) => {
    return (size) => {
        if (Number(sizeList[size]) <= 0) {
           return 'none'
        }else{
            return 'flex'
        }
    }
})

const colref=ref(null)

const hiddenCheck = () => {
    Object.keys(sizeList).forEach(size => {
        // console.log(size,sizeList[size])
        if (sizeList[size] === 0) {
            ishidden.value = true
        } else {
            ishidden.value = false
        }
    })

}

const getani = computed(() => {
    return getTemp.value.value.fadeIN
})

onMounted(() => {
    // console.log(getTemp.value.value.fadeIN)
    // console.log(props.animation)
    hiddenCheck()
    window.addEventListener('resize', hiddenCheck())
})

onUpdated(()=>{
    hiddenCheck()
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', hiddenCheck())
})




</script>


<template>
    <Transition name="fade" :appear="getani" >
        <div v-if="!ishidden" class="kaza-col" ref="colref">
            <slot></slot>
        </div>
    </Transition>
</template>

<style lang="less" scoped>
@width: v-bind(getSize('span'));
@justify: v-bind(getJustify);
@align: v-bind(getAlign);
@XSwidth: v-bind(getSize('xs'));
@SMwidth: v-bind(getSize('sm'));
@MDwidth: v-bind(getSize('md'));
@LGwidth: v-bind(getSize('lg'));
@XLwidth: v-bind(getSize('xl'));
@span: v-bind(getSize('span'));
@XSvis: v-bind(getVis('xs'));
@SMvis: v-bind(getVis('sm'));
@MDvis: v-bind(getVis('md'));
@LGvis: v-bind(getVis('lg'));
@XLvis: v-bind(getVis('xl'));
@spanvis: v-bind(getVis('span'));

@XSdisplay:v-bind(getDisplay('xs'));
@SMdisplay:v-bind(getDisplay('sm'));
@MDdisplay:v-bind(getDisplay('md'));
@LGdisplay:v-bind(getDisplay('lg'));
@XLdisplay:v-bind(getDisplay('xl'));
@spandisplay:v-bind(getDisplay('span'));
//动画相关
@delay:v-bind(getDelay);
.fade-enter-active,.fade-leave-active{
    // transform: translateY(0);
    opacity: 1;
    transition: 1s ease;
    transition-delay:@delay ;
    
}

.fade-enter-from,.fade-leave-to{
    
    transform: translateY(20px);
    opacity: 0;
}


.kaza-col {

    box-sizing: border-box;
    width: @width;
    display: @spandisplay;
    flex-direction: column;
    justify-content: @justify;
    align-items: @align;
    // height: @spanvis;
    // transition: .5s ease;
    //此处需要删除
    // border: 1px solid #0e0e0e;
    // background-color: #1B9CFC;
}

// Extra small devices (portrait phones, less than 576px)
@media (max-width: 575.98px) {
    .kaza-col {
        box-sizing: border-box;
        width: @XSwidth;
        display: @XSdisplay;
        flex-direction: column;
        justify-content: @justify;
        align-items: @align;
        // height: @XSvis;

        // border: 1px solid #0e0e0e;
        // background-color: #1B9CFC;
    }


}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) and (max-width: 767.98px) {
    .kaza-col {

        box-sizing: border-box;
        width: @SMwidth;
        display: @SMdisplay;
        flex-direction: column;
        justify-content: @justify;
        align-items: @align;
        // height: @SMvis;
        // transition: .5s ease;

    }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) and (max-width: 991.98px) {
    .kaza-col {

        box-sizing: border-box;
        width: @MDwidth;
        display: @MDdisplay;
        flex-direction: column;
        justify-content: @justify;
        align-items: @align;
        // height: @MDvis;
        // transition: .5s ease;
        //此处需要删除
        // border: 1px solid #0e0e0e;
        // background-color: #1B9CFC;
    }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) and (max-width: 1199.98px) {
    .kaza-col {

        box-sizing: border-box;
        width: @LGwidth;
        display: @LGdisplay;
        flex-direction: column;
        justify-content: @justify;
        align-items: @align;
        // height: @LGvis;
        //此处需要删除
        // border: 1px solid #0e0e0e;
        // background-color: #1B9CFC;
    }
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
    .kaza-col {

        box-sizing: border-box;
        width: @XLwidth;
        display: @XLdisplay;
        flex-direction: column;
        justify-content: @justify;
        align-items: @align;
        // height: @LGvis;


        // background-color: #1B9CFC;
    }
}
</style>