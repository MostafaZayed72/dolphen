<template>
    <v-card class="text-center bg-blue-grey-lighten-3">
        <v-tabs v-model="tab" bg-color="green-darken-3">
            <v-tab class="mx-auto" value="one">Skills</v-tab>
            <v-tab class="mx-auto" value="two">Experience</v-tab>
            <v-tab class="mx-auto" value="three">Education</v-tab>
        </v-tabs>

        <v-card-text>
            <v-window v-model="tab">
                <v-window-item value="one">
                    <SkillsSection />
                </v-window-item>

                <v-window-item value="two">
                    <ExperienceSection />
                </v-window-item>

                <v-window-item value="three">
                    <h1 class="text-xl font-bold">I graduated from the Faculty of Nursing, Alexandria University, in 2018 <br>
                        I started studying programming in August 2023 <br>
                        I learned HTML/CSS/JavaScript/TypeScript/Vue.js/Nuxt.js
                    </h1>
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    data: () => ({
        tab: null,
    }),
}
</script>

<style>
.v-tab--selected {
    color: #eeea03;
}
</style>