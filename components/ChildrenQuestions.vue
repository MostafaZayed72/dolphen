<template>
  <div>
    <div class="text-center mt-16 mb-6">
      <h1 class="text-2xl font-bold">أهلاً بك في صفحة التوظيف</h1>
      <p class="font-bold mt-2">برجاء ملء الحقول التالية</p>
    </div>
    <v-container style="direction: rtl;">
      <v-row style="direction: rtl;">
        <v-col v-for="(question, index) in questions" :key="index" cols="12" md="4">
          <input
            style="border: 1px grey solid;"
            class="w-[80%] py-2 mx-auto rounded flex justify-center"
            v-model="question.answer"
            :placeholder="question.text"
          />
        </v-col>
        <v-col cols="12">
          <NuxtLink to="" class="bg-slate-300 px-8 py-2 rounded-xl cursor-pointer font-bold hover:bg-green-300 delayed flex justify-center w-fit mx-auto mt-10" @click="submitAnswers">سجل الآن</NuxtLink>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const questions = ref([]);

const fetchQuestions = async () => {
  try {
    const response = await axios.get('http://localhost:8000/v1/questions?type=student');
    questions.value = response.data.data.map(item => ({
      id: item.id,
      text: item.text,
      answer: ''
    }));
  } catch (error) {
    console.error('حدث خطأ في جلب الأسئلة:', error.message);
  }
};

onMounted(fetchQuestions);

const submitAnswers = async () => {
  try {
    // التحقق من أن جميع الأسئلة لها إجابة غير فارغة
    for (const question of questions.value) {
      if (!question.answer.trim()) {
        alert('يرجى الإجابة على جميع الأسئلة قبل الإرسال.');
        return; // عودة من الدالة في حالة عدم اكتمال الإجابات
      }
    }

    const answers = questions.value.map(question => ({
      questionId: question.id,
      answerText: question.answer
    }));

    const body = {
      userName: 'name', // استبدل بالاسم المستخدم الفعلي
      applierType: 'student',
      answers: answers
    };

    const response = await axios.post('http://localhost:8000/v1/answers', body);

    console.log('تم إرسال الإجابات بنجاح:', response.data);

    // يمكنك إضافة أي خطوات إضافية هنا بعد الإرسال بنجاح، مثل إعادة توجيه المستخدم أو إظهار رسالة تأكيدية
    alert('تم إرسال إجاباتك بنجاح');
    navigateTo('/'); // توجيه المستخدم إلى الصفحة المناسبة بعد الإرسال

  } catch (error) {
    console.error('حدث خطأ في إرسال الإجابات:', error.message);
  }
};

</script>

<style scoped>
.delayed {
  transition: 0.5s;
}

input::placeholder {
  transition: opacity 0.5s ease;
}

input:focus::placeholder {
  opacity: 0;
}
</style>
