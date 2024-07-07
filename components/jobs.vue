<template>
    <div>
        <div class="w-[80%] mx-auto">
            <h3 class="text-3xl text-center pb-2 text-green-darken-1 bg-slate-300 rounded-full font-bold mb-10">
                الوظائف
            </h3>
        </div>
        <!-- Start Cards -->
       <div class="flex flex-col   justify-center items-center gap-6">
<img class="w-[40%] rounded-lg" src="/assets/imgs/job.jpg" alt="">
<NuxtLink to="/jobs" class="bg-slate-300 px-4 py-2 rounded-xl font-bold hover:bg-green-300 delayed">امتلك وظيفتك معنا</NuxtLink>
       </div>
    </div>



</template>

<style>
.delayed{
    transition: 0.5s;
}
</style>