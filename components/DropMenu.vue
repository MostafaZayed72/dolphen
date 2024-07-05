<template>
    <v-row>
        <v-col>
            <v-card-title>


                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-menu" v-bind="props" color="green"></v-btn>
                    </template>

                    <v-list>
                        <v-list-item >
                            <v-list-item-title class="mb-3"><a href="#about" @click.prevent="scrollToSection('about')">About</a></v-list-item-title>
                            <v-list-item-title class="mb-3"><a href="#skills" @click.prevent="scrollToSection('skills')">Skills & Experience</a></v-list-item-title>
                            <v-list-item-title class="mb-3"><a href="#services" @click.prevent="scrollToSection('services')">My Services</a></v-list-item-title>
                            <v-list-item-title><a href="#portfolio" @click.prevent="scrollToSectiony('portfolio')">My Portfolio</a></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-card-title>


        </v-col>
    </v-row>
</template>
<script setup>
const scrollToSectiony = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // استخدام setTimeout لضبط الإزاحة بعد التمرير السلس
    setTimeout(() => {
      window.scrollBy({
        top: -100,
        left: 0,
        behavior: 'smooth'
      });
    }, 500); // الوقت هنا لضمان انتهاء التمرير الأول قبل إضافة الإزاحة
  }
};

</script>