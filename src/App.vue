<template>
  <div id="nav">
    <router-link to="/">All licences</router-link> | 
    <router-link :to="{name:'addLicence'}">Add new licence</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: var(--main_orange_color);
}

:root
{
    --main_orange_color:#F26627;
  --faded_orange_color:#F9A26C;
  --main_white_color:#EFEEEE;
  --light_blue_color:#9BD7D1;
  --deep_blue_color:#325D79;
}
*,*:focus,*:hover{
    outline:none;
}
*{
    box-sizing: border-box;
    font-family: 'Tajawal', sans-serif;
}
body
{
    margin: 0;
    padding: 0;
    background: var(--main_white_color);
}
</style>
