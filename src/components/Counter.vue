<template>
  <div class="mb-20">
      Counter: {{ number }}
      <div>
            <label for="counter" v-bind:title="number">Counter: </label>
            <input type="text" v-model="number" />
            <button v-on:click="increase">+</button>
            <button v-on:click="decrease">-</button>
            <button v-on:click="add10">+10</button>
            <button v-on:click="multiply2">x2</button>
            <!-- <button @click="increase(1)">+</button>
            <button @click="increase(-1)">-</button>
            <button @click="increase(10)">+10</button>
            <button @click="increase(number)">x2</button> -->
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            // number: 10
            number: this.initNumber || 10,  //ถ้าไม่มีการส่ง initNumber จะมีค่าเป็น 10
        }
    },
    props: ['initNumber'],      //ดูที่ NumberList ต่อ ค่า props เหมือนเป็นพารามิเตอร์ ไม่ควรเปลี่ยนค่าที่ props
    methods: {

        // increase(number) {
        //     this.number += number;
        // },
        increase() {
            this.number++;
        },
        decrease() {
            this.number--;
        },
        add10() {
            this.number+=10;
        },
        multiply2() {
            this.number*=2;
        }
    }
}
</script>

<style lang="scss" scoped>
.mb-20{
    margin-bottom: 20px;
}
</style>