<script>
export default {
    name: 'kaza-todocard'
}
</script>

<template>
    <div class="todobody">
        <div class="todotime">
            📟Date:{{ todotime }}
        </div>
        <div class="todotagsgroup">tags: <span class="ttags" v-for="todotag in todotags">{{ todotag }}</span></div>
        <div v-if="!getTodo" class="nodata">NO DATA</div>
        <div v-for="todo in getTodo" class="todosideline">

            <div style="border-bottom:3px dotted #2C3A47;">
                <div class="todoitem">
                    <span class="todolabel" style="background-color: #2C3A47;color: #fff;">⏱️执行时间:</span>{{ todo.timestart
                    }}
                </div>
                <div class="todoitem">
                    <span class="todolabel" style="background-color: #2C3A47;color: #fff;">🔨待办事项:</span> {{ todo.content }}
                </div>
                <div class="todoitem">
                    <span class="todolabel" style="background-color: #2C3A47;color: #fff;">📍地点:</span>{{ todo.workzone }}
                </div>
                <div class="todoitem" style="margin-bottom: .5em;">
                    <span class="todolabel" style="background-color: #2C3A47;color: #fff;">💳 收入:</span>{{ todo.payment ||
                        '...' }}
                </div>
                <div class="todotags">{{ todo.tags }}</div>

            </div>

        </div>
        <div class="todofooter">

        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
const props = defineProps({
    date: String,
    todos: Object,
})
const todotime = computed(() => {
    return props.date || 'No Date insert'
})

const getTodo = computed(() => {
    // console.log(props.todos)
    return props.todos || {}
})


const todotags = computed(()=>{
    let temp = []
    props.todos.forEach(item=>{
        temp.push(item.tags)
    })
    return temp
})





</script >

<style lang='less' scoped>
.paddingLR {
    padding: 0 10px 0 10px;
}

.paddingLR20px {
    padding: 0 20px 0 20px;
}

.padding10px {
    padding: 5px;
}

.br10px {
    border-radius: 10px;
}

.todobody {
    width: 100%;
    position: relative;
    max-height: 60vh;
    transition: .5s all ease;
    .padding10px;

    font-size: 16px;
    overflow-y: scroll;

    .todotime {
        width: 100%;
        height: 2em;
        background-color: #000;
        color: #fff;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        .paddingLR;


    }

    .todosideline {
        position: relative;
        width: 100%;
        // max-height: 50%;
        .paddingLR20px;
        padding-top: 5px;
        background-color: #ccc;
        transition: .5s all ease;
        color: #181818;

        &::before {
            content: '';
            position: absolute;
            height: 100%;
            width: 5px;
            top: 0;
            left: 10px;
            background-color: #F97F51;
        }

        &::after {
            content: '';
            position: absolute;
            height: 10px;
            width: 10px;
            top: -6px;
            left: .5em;
            border-radius: 50%;
            background-color: #55e6c1;
            border: 2px solid #000;

        }

        .todoitem {
            .paddingLR20px;

            .todolabel {

                background-color: #55e6c1;
                border-radius: 5px;
                border: 1px solid #000;
                padding: 0 5px 0px 5px;
                text-align: center;
                justify-content: center;
                align-items: center;
                font-size: 1em;
                margin-right: .5em;
                user-select: none;
            }
        }

        .todotags {
            position: absolute;
            top: 3px;
            right: 0;
            cursor: pointer;
            background-color: #F97F51;
            padding: 0 5px 0 5px;
            border-radius: 5px;
            font-size: .3em;
        }

        // overflow-y: scroll;
    }

    &>.todosideline:nth-last-child(2) {

        &::before {
            content: '';
            position: absolute;
            height: 100%;
            width: 5px;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
            top: 0;
            left: 10px;
            background-color: #F97F51;
        }

        &::after {
            content: '';
            position: absolute;
            height: 10px;
            width: 10px;
            top: -6px;
            left: .5em;
            border-radius: 50%;
            background-color: #55e6c1;

        }


    }




    .todofooter {
        width: 100%;
        height: 2em;
        background-color: #ccc;
        .paddingLR;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .todotagsgroup {
        .todofooter;
        border-radius: 0;
        .ttags{
            background-color: #F97F51;
            padding: 0  5px 0 5px;
            border-radius: 5px;
            margin-right: .2em;
            font-size: .8em;
        }
    }

    .nodata {
        .todosideline;
        color: #ffffff50;

        &::before {
            content: '';
            position: absolute;
            height: 100%;
            width: 0;

            background-color: #fff;
        }

        &::after {
            content: '';
            position: absolute;
            height: 0;
            width: 0;
            top: 45%;
            left: 10px;
            background-color: #55e6c1;
        }

        text-align: center;
    }
}
</style>
