<template>
    <v-data-iterator
      :items="desserts"
      item-value="name"
    >
      <template v-slot:default="{ items, isExpanded, toggleExpand }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.raw.name"
            cols="12"
            md="6"
            sm="12"
          >
            <v-card>
              <v-card-title class="flex items-center justify-center ">
                <v-icon
                  :color="item.raw.color"
                  size="18"
                  start
                ></v-icon>
  
                <h4 class="text-2xl mx-auto mb-4">{{ item.raw.name }}</h4>
              </v-card-title>
  
              <v-card-text class="text-gray-500 mx-auto text-center">
                {{ item.raw.description }}
              </v-card-text>
  
              
  
            
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </template>
  <script>
    export default {
      data: () => ({
        desserts: [
          {
            name: 'Full Stack Developer',
            description: 'Develop myself to be a full stack web developer',
            icon: 'mdi-ice-cream',
            color: '#6EC1E4',
            calories: 159,
            fat: 6,
            carbs: 24,
            protein: 4,
            sodium: 87,
            calcium: '14%',
            iron: '1%',
          },
          {
            name: 'Front End Developer',
            description: 'Looking for opportunity as front end ',
            icon: 'mdi-cookie',
            color: '#F4A261',
            calories: 237,
            fat: 9,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%',
            iron: '1%',
          }
        ],
      }),
    }
  </script>