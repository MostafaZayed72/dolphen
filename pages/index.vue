<template>
    <div>
      <NavBar />
      
      <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition" id="about">
        <About class="mt-16" />
      </v-lazy>
      <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition" id="skills">
        
        <Offers class="mt-16" />
      </v-lazy>
   <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition" id="services">
        <Jobs class="mt-16" />
      </v-lazy> 
   <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition" id="services">
        <Children class="mt-16" />
        
      </v-lazy> 
     
      <Footer class="mt-16" />
      <ScrollToTopButton class="z-10 cursor-pointer" />
    </div>
  </template>
  