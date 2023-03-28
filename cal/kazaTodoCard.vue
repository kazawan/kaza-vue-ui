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
        <div class="todotagsgroup">tags: <span class="ttags"  style="background-color: #55e6c1;">🤞全部</span> <span class="ttags" v-for="todotag in todotags">{{ todotag }}</span></div>

        <div v-if="!getTodo" class="nodata">💔NO DATA</div>
        <div v-for="todo in getTodo" class="todosideline">

            <div style="border-bottom:3px dotted #2C3A47;">
                <div class="todoitem">
                    <span class="todolabel" style="background-color: #2C3A47;color: #fff;">⏱️执行时间:</span>{{
                        todo.timestart
                    }}
                </div>
                <div class="todoitem">
                    <span class="todolabel" style="background-color: #2C3A47;color: #fff;">🔨待办事项:</span> {{
                        todo.content }}
                </div>
                <div class="todoitem">
                    <span class="todolabel" style="background-color: #2C3A47;color: #fff;">📍地点:</span>{{ todo.workzone
                    }}
                </div>
                <div class="todoitem" style="margin-bottom: .5em;">
                    <span class="todolabel" style="background-color: #2C3A47;color: #fff;">💳 收入:</span>{{ todo.payment
                        ||
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
import { ref, computed, onMounted, onUpdated } from 'vue';
// 定义props
const props = defineProps({
    // 日期
    date: String,
    // 待办事项
    todos: Object,
})



const todotime = computed(() => {
    return props.date || 'No Date insert'
})

const getTodo = computed(() => {
    // console.log(props.todos)
    return props.todos
})

const todotags = computed(() => {
    if (props.todos) {
        try {
            return [...new Set(props.todos.map(item => item.tags))];
        } catch (error) {
            console.log(error);
            return ['NO TAGS'];
        }
    } else {
        return ['NO TAGS'];
    }
});



/**
 * todo以下这段是ai写的
 */
// 为todotags添加点击事件，只显示tags的日程
const showTodoByTag = (tag) => {
    const todoList = document.querySelectorAll('.todosideline')
    todoList.forEach(item => {
        if (item.querySelector('.todotags').textContent !== tag) {
            item.style.display = 'none'
        } else {
            item.style.display = 'block'
        }
        if(tag === '🤞全部'){
            item.style.display = 'block'
        }
    })
}



// const addTagClickEvent = () => {
//     const tagList = document.querySelectorAll('.ttags')
//     tagList.forEach(item => {
//         item.addEventListener('click', () => {
//             showTodoByTag(item.textContent)
//         })
//     })
// }

// 添加标签点击事件
const addTagClickEvent = () => {
    // 获取所有标签
    const tagList = document.querySelectorAll('.ttags')
    // 遍历标签列表
    tagList.forEach(tagItem => {
        // 给每个标签添加点击事件
        tagItem.addEventListener('click', () => {
            // 显示对应标签的任务
            showTodoByTag(tagItem.textContent)
        })
    })
}







onMounted(() => {
    addTagClickEvent()
})

onUpdated(() => {
    addTagClickEvent()
})
// const todotags = computed(()=>{
//     let temp = []
//     props.todos.forEach(item=>{
//         temp.push(item.tags)
//     })
//     return temp
// })





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
    ::-webkit-scrollbar {
        width: 10px;
        height: 3px;
    }

    /* 滚动条有滑块的轨道部分 */
    ::-webkit-scrollbar-track-piece {
        background-color: transparent;
        border-radius: 5px;
    }

    /* 滚动条滑块(竖向:vertical 横向:horizontal) */
    ::-webkit-scrollbar-thumb {
        cursor: pointer;
        background-color: #f2f2f2;
        border-radius: 5px;
    }

    /* 滚动条滑块hover */
    ::-webkit-scrollbar-thumb:hover {
        background-color: #999999;
    }

    /* 同时有垂直和水平滚动条时交汇的部分 */
    ::-webkit-scrollbar-corner {
        display: block;
        /* 修复交汇时出现的白块 */
    }

    width: 100%;
    position: relative;
    // max-height: 60vh;
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

        //添加hover效果
        //添加hover效果


        &::before {
            content: '';
            position: absolute;
            height: 100%;
            width: 5px;
            top: 0;
            left: 20px;
            background-color: #F97F51;
        }

        &::after {
            content: '';
            position: absolute;
            height: 10px;
            width: 10px;
            top: -6px;
            left: 18px;
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
            left: 20px;
            background-color: #F97F51;
        }

        &::after {
            content: '';
            position: absolute;
            height: 10px;
            width: 10px;
            top: -6px;
            left: 18px;
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

        .ttags {
            background-color: #F97F51;
            padding: 0 5px 0 5px;
            border-radius: 5px;
            margin-right: .2em;
            font-size: .8em;
            cursor: pointer;
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
            left: -100px;
            background-color: #ffffff00;
        }

        text-align: center;
    }


}
</style>
