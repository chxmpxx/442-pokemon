<template>
  <div>
      <pokemon-creat-form></pokemon-creat-form>
      <pokemon-table></pokemon-table>
  </div>
</template>

<script>
import PokemonTable from '@/components/PokemonTable'
import PokemonCreatForm from '@/components/PokemonCreatForm'
export default {
    components: {
        PokemonCreatForm,
        PokemonTable
    }
}
</script>

<style>

</style>