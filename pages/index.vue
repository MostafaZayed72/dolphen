<template>
    <div>
      <NavBar />
      
      <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition" id="about">
        <About class="mt-16" />
      </v-lazy>
      <!-- <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition" id="skills">
        <SkillsExperienceEducation class="mt-16" />
      </v-lazy>
      <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition" id="services">
        <MyServices class="mt-16" />
      </v-lazy> -->
     
      <ScrollToTopButton class="z-10 cursor-pointer" />
    </div>
  </template>
  