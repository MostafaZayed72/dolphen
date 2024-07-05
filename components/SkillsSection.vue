<template>
    <div class="sm:w-100 md:w-[80%] ">
      <v-progress-linear
        v-model="css"
        color="blue"
        height="25"
        
      ><template v-slot:default="{ value }" >
          <strong >{{ Math.ceil(value) }}%</strong>
          <h1 class="ml-2">CSS</h1>
        </template> </v-progress-linear>
  
      <br>
  
      <v-progress-linear
        v-model="javascript"
        color="blue-grey"
        height="25"
      >
        <template v-slot:default="{ value }">
          <strong>{{ Math.ceil(value) }}%</strong>
          <h1 class="ml-2">JAVASCRIPT</h1>
        </template>
      </v-progress-linear>
  
      <br>
  
      <v-progress-linear
        v-model="vuejs"
        color="orange"
        height="25"
      >
        <strong>{{ Math.ceil(vuejs) }}%</strong>
        <h1 class="ml-2">VUEJS</h1>
      </v-progress-linear>
      <br>
  
      <v-progress-linear
        v-model="nuxt"
        color="yellow"
        height="25"
      >
        <strong>{{ Math.ceil(nuxt) }}%</strong>
        <h1 class="ml-2">NUXT3</h1>
      </v-progress-linear>
      <br>
  
      <v-progress-linear
        v-model="tailwind"
        color="red"
        height="25"
      >
        <strong>{{ Math.ceil(tailwind) }}%</strong>
        <h1 class="ml-2">TAILWINDCSS</h1>
      </v-progress-linear>
      <br>
  
      <v-progress-linear
        v-model="vuetify"
        color="green"
        height="25"
      >
        <strong>{{ Math.ceil(vuetify) }}%</strong>
        <h1 class="ml-2">VUETIFY</h1>
      </v-progress-linear>
      <br>
  
      <v-progress-linear
        v-model="typescript"
        color="indigo"
        height="25"
      >
        <strong>{{ Math.ceil(typescript) }}%</strong>
        <h1 class="ml-2">TYPESCRIPT</h1>
      </v-progress-linear>
    </div>
  </template>
  <script>
    export default {
      data: () => ({
        css: 90,
        javascript: 95,
        vuejs: 90,
        nuxt:98,
        tailwind:93,
        vuetify:92,
        typescript:85
      }),
    }
  </script>