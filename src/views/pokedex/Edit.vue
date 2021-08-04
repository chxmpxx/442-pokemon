<template>
  <div>
      <h1>Edit Pokemon</h1>
  </div>
</template>

<script>
//import PokedexService from "@/services/PokedexService"
export default {
    data(){
        return{
            id:'',
            form: {
                name: '',
                name_jp: '',
                pokemon_types: ''
            }
        }
    },
    // async created(){
    //     this.id = this.$route.params.id
    //     let pokemon = await PokedexService.getPokemonById(this.id)
    //     console.log(pokemon);
    //     this.form.name = pokemon.name
    // }
}
</script>

<style>

</style>