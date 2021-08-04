<template>
  <div>
       <pokedex-creat-form></pokedex-creat-form>
  </div>
</template>

<script>
import PokedexCreatForm from '../../components/PokedexCreatForm.vue'
import AuthUser from "@/store/AuthUser"

export default {
    components: {
        PokedexCreatForm
    },
    mounted(){
      if(!this.isAuthen()){
        this.$swal("Restricted Area", "You have no permission", "warning")
        this.$router.push("/pokedex")
      }
    }
}
</script>

<style>

</style>