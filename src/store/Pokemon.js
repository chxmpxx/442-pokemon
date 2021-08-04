import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

let api_endpoint = 'https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json'

Vue.use(Vuex)

export default new Vuex.Store({
    //state คือฟิลด์ใน oop
  state: {
    data:[]
  },
  getters: {
    pokemons: (state) => state.data, //ส่งเป็นฟังก์ชัน
  },

  //คล้ายกับ privat setter เอาไว้เปลี่ยนแปลงค่าใน state
  mutations: {
    fetch(state, {res}){
        state.data = res.data
    },
    add (state, { payload }){
      state.data.push(payload)
    },
    edit(state, { payload }){
      state.data[payload.index].name = payload.name
      state.data[payload.index].type = payload.type
    },
  },

  //เหมือน public method ให้ภายนอกเรียกใช้ หรือ ดึงข้อมูลจากภายนอก
  actions: {
      // commit เป็นคีเวิร์ดไว้เรียก mutation
      async fetchPokemon ({ commit }){
        //สมมุติไปดึงจาก api
        // let res = {
        //     data: [
        //         {
        //             name: {
        //                 english: 'Bulbasaur',
        //                 japanese: 'Fushikidane'
        //             },
        //             type: ['Grass', 'Posison']
        //         },
        //         {
        //           name: {
        //               english: 'Bulbasaur2',
        //               japanese: 'Fushikidane2'
        //           },
        //           type: ['Grass', 'Posison']
        //       },
        //     ]
        // }

        let res = await Axios.get(api_endpoint)   //ถ้าใช้ await เพื่อรอ ดังนั้นฟังก์ชันต้องมี async
        commit('fetch', {res}) //เรียกชื่อมิวเทชันแล้วส่ง res ไป
      },

      addPokemon({ commit }, payload){
        // todo : call api to add data
        commit('add', {payload})
      },

      editPokemon({ commit }, payload){
        // todo: call api to edit data
        commit("edit", {payload})
      },
      
  },

  modules: {
  }
})
