<template>
    <nav class="flex justify-between items-center shadow-md py-3 sticky top-0 z-10 px-10" >
        <!-- LOGO -->
        <div class="ml-5 md:ml-10">
            <img src="/assets/imgs/logo.jpeg" class="w-20 rounded-xl" alt="">
        </div>
        <!-- LINKS IN LARGE SCREEN -->
        <div class="mr-10 hidden lg:block">
            <ul class="flex gap-20 items-center font-semibold">
                <li><a href="#about" @click.prevent="scrollToSection('about')">من نحن</a></li>
      <li><a href="#skills" @click.prevent="scrollToSection('skills')">العروض</a></li>
      <li><a href="#services" @click.prevent="scrollToSection('services')">الخدمات</a></li>
      <li><a href="#portfolio" @click.prevent="scrollToSectiony('portfolio')">الوظائف</a></li>
                <li class="flex gap-2 items-center">
                    <h1>اختر الوضع : </h1><select v-model="$colorMode.preference" class="px-2 py-1 text-center"
                        style="border: 1px solid;">
                        <option value="light">نهاري</option>
                        <option value="dark">ليلي</option>
                        <option value="sepia">بيج</option>
                    </select>
                </li>
            </ul>
        </div>
        <!-- LINKS IN SMALL SCREEN -->
        <div class="mr-5 md:mr-10 lg:hidden flex items-center gap-2">
            <h1>Theme Mode:</h1><select v-model="$colorMode.preference" class="px-2 py-1 rounded text-center"
                style="border: 1px solid ;">
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="sepia">Sepia</option>
            </select>
            <DropMenu />

        </div>
    </nav>
</template>

<script setup>
const colorMode = useColorMode()
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

<style>
body {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.8);
}

body nav {
    background-color: #dbd5d5;
}

.dark-mode body {
    background-color: #091a28;
    color: #19c53e;
    border-color: #19c53e;
}

.dark-mode nav {
    background-color: #0e3250;

}

.dark-mode h3 {
    color: white;
}

.sepia-mode body {
    background-color: #f1e7d0;
    color: #433422;
}

.sepia-mode nav {
    background-color: #f5dda8;

}
</style>