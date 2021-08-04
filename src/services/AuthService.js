import Axios from "axios"

const auth_key = "auth-pokedex"
let auth = JSON.parse(localStorage.getItem(auth_key))
const user = auth ? auth.user:""
const jwt = auth ? auth.jwt: ""

const api_endpoint = process.env.VUE_APP_POKEMON_ENDPOINT || 'http://localhost:1337'

//คือไม่ได้กำหนดชื่อใด ๆ เลย ตอน import ให้ใส่ชื่อมาเอง
export default{
    isAuthen(){
        return (user !== "") && (jwt != "")
    },

    getApiHeader(){
        if(jwt !== ""){
            return{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            }
        }
        return{}
    },

    getUser() {
        return user
    },

    getJwt(){
        return jwt
    },

    //เป็น {} คือส่งเข้ามาเป็น obj ข้างใน obj คือ key ชื่อ email และ password
    async login({email, password}){
        //call POST /auth/local
        try{
            let url = `${api_endpoint}/auth/local`
            let body = {
                identifier: email,
                password: password
            }
            let res = await Axios.post(url, body)
            if(res.status === 200){
                //console.log(res.data);
                //เอา res.data มาทำให้เป็น JSON.str
                localStorage.setItem(auth, JSON.stringify(res.data))
                return{
                    success: true,
                    user: res.data.user,
                    jwt: res.data.jwt
                }
            }else{
                console.log("NOT 200", res);
            }
        
        } catch (e){
            console.error(e);
            if(e.response.status === 400){
                return{
                    success: false,
                    message:e.response.data.message[0].messages[0].message,
                }
            }
            
        }
    },

    async register({ username, email, password}){
        try {
            let url = `${api_endpoint}/auth/local/register`
            let body = {
                username: username,
                email: email,
                password: password
            }
            if(res.status === 200){
                localStorage.setItem(auth, JSON.stringify(res.data))
                return{
                    success: true,
                    user: res.data.user,
                    jwt: res.data.jwt
                }
            }else{
                console.log("NOT 200", res);
            }
        } catch (e) {
            if(e.response.status === 400){
                return{
                    success: false,
                    message:e.response.data.message[0].messages[0].message,
                }
            }else{
                return{
                    success: false,
                    message: "Unknown errer: " + e.response.data
                }
            }
            
        }
    },

    logout (){
        localStorage.removeItem(auth_key)
    },
}