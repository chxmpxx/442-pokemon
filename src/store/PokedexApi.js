import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import AuthService from "@/services/AuthService"

let api_endpoint = process.env.VUE_APP_POKEMON_ENDPOINT || 'http://localhost:1337'

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
    add (state, payload ){
      state.data.push(payload)
    },
    edit(state, payload ){
      state.data[payload.index] = payload.data
    },
  },

  //เหมือน public method ให้ภายนอกเรียกใช้ หรือ ดึงข้อมูลจากภายนอก
  actions: {
      // commit เป็นคีเวิร์ดไว้เรียก mutation
      async fetchPokemon ({ commit }){
        let res = await Axios.get(api_endpoint + "/monsters")   //ถ้าใช้ await เพื่อรอ ดังนั้นฟังก์ชันต้องมี async
        commit('fetch', {res}) //เรียกชื่อมิวเทชันแล้วส่ง res ไป
      },

      async addPokemon({ commit }, payload){
        let qs = payload.pokemon_types.map((it) => "name_in=" + it).join("&")
        let res_types = await Axios.get(api_endpoint + "/types?" + qs)

        let url = api_endpoint + "/monsters"
        //let user = AuthService.getUser()

        let body = {
          name: payload.name,
          name_jp: payload.name_jp,
          pokemon_types: res_types.data.map((it) => it.id),
          //user:user.id
        }
        try{
          let headers = AuthService.getApiHeader()
          let res = await Axios.post(url, body, headers)
          if(res.status === 200){
            commit("add", res.data)
            return{
              success: true,
              data: res.data
            }
          }else{
            console.error(res);
            return{
              success: false,
              message: "Unknow status code: " + res.status
            }
          }
        }catch (e){
          if(e.response.status === 403){
            console.error(e.response);
            return{
              success: false,
              message: e.response.data.message
              ////////
            }
          }
        }


      },

      async editPokemon ({ commit }, payload) {
        // call api to edit data
        let url = api_endpoint + "/monsters/" + payload.id
        let body = {
          name: payload.name,
          name_jp: payload.name_jp
        }
        let res = await Axios.put(url, body)
        if (res.status === 200) {
          let data = {}
          data['data'] = res.data
          data['index'] = payload.index
          commit("edit", data)
        }else {
          console.err(res)
        }
      },
      
  },

  modules: {
  }
})
