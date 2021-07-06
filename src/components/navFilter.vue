<template>
  <nav class="nav_filter">
      <a :class="{active: this.filter === 'all'}" @click="filterChange('all')">All Licences</a>
      <a :class="{active: this.filter === 'yes'}" @click="filterChange('yes')" >Valid</a>
      <a :class="{active: this.filter === 'no'}" @click="filterChange('no')" >Invalid</a>
  </nav>
</template>

<script>
export default {
emits: ["filterChange"],
props:["filter"],
methods:{
    filterChange(by)
    {
        this.$emit("filterChange" , by);
    }
}
}
</script>

<style>
    .nav_filter a
    {
        margin: 10px;
        color:gray;
        cursor: pointer;
    }
    .active
    {
        color: var( --deep_blue_color)!important;
        font-weight: bold;
    }
</style>