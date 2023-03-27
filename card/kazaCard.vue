<script>
export default {
    name: 'kaza-card'
}
</script>


<template>
    <div class="cardbody">
        <div class="cardTitle">

            <slot name="cardtitle">

            </slot>
        </div>
        <div class="cardSubTitle">

            <slot name="cardSubTitle">

            </slot>
        </div>
        <div class="cardbody">
            <slot name="cardbody"></slot>
        </div>

    </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
    titleBgColor: {
        type: String,
        default: '#000'
    },
})

const getTitleColor = computed(() => {
    return props.titleBgColor
})
</script>

<style lang="less" scoped>
@cardTitleBgColor: v-bind(getTitleColor);


.cardbody {
    position: relative;
    width: 100%;
    height: auto;
    /* background-color: #ccc; */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;


}

.cardTitle {

    width: 100%;
    height: 1.2rem;
    // text-transform: uppercase;
    background-color: @cardTitleBgColor;
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;
    padding: 0 10px 0 10px;
    font-size: .9rem;
    line-height: 1.2rem;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    
}

.cardSubTitle {
    .cardTitle;
    width: 100%;
    // text-transform: uppercase;
    height: .8rem;
    border-radius: 0;
    font-size: .4rem;
    line-height: .8rem;



}

.cardbody {
    width: 100%;
    cursor: pointer;

    &::hover {
        transition: .3s all ease-in-out;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
}
</style>
