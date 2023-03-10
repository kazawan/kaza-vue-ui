<script>
export default {
    name: 'k-superbody'
}
</script>


<script setup>
import { onMounted, onUpdated, ref } from 'vue';
const superbody = ref(null)
const testbar = ref(null)
const props = defineProps({
    iphoneSize:String,
    winSize:String,
    showDevice:Boolean,
})
const device = ref('')

const devivesSet = {
    'Win64': {
        name: 'Win...',
        bgcolor:'#1B9CFC',
        fontSize:props.winSize || '16px'
    },
    'iPhone': {
        name: 'iPhone...',
        bgcolor:'#55E6C1',
        fontSize:props.iphoneSize || '24px'
    },
}
const devicesCheck = () => {
    const userAgentDevies = navigator.userAgent
    const html = document.querySelectorAll('html')[0]
    
    Object.keys(devivesSet).forEach((item,i,Object) => {
        if (userAgentDevies.indexOf(item) != -1) {
            // superbody.value.style.backgroundColor = devivesSet[item].bgcolor
            html.style.fontSize = devivesSet[item].fontSize
            device.value=devivesSet[item].name
            testbar.value.style.backgroundColor = devivesSet[item].bgcolor
        }
    })

}


onMounted(() => {
    devicesCheck()

})

onUpdated(()=>{
    devicesCheck()
})
</script >

<template>
    <div ref="superbody" class="superbody">
        <div v-if="showDevice" class="testbar" ref="testbar" style="color:#000;">suprerbody&#128161:device is {{ device }}</div>
        
        <slot />
    </div>
</template>



<style lang='less' scoped>
@superWidth: 100%;
@superHeight: auto;

.superbody {
    width: @superWidth;
    height: @superHeight;

}
</style>
