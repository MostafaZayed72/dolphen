<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">لوحة التحكم للأدمن</h2>
      </v-col>
    </v-row>

    <!-- زر إضافة سؤال جديد -->
    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn color="primary" @click="openDialog">إضافة سؤال جديد</v-btn>
      </v-col>
    </v-row>

    <!-- جدول عرض الأسئلة -->
    <v-row>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="questions" class="elevation-1">
          <template v-slot:item.actions="{ item }">
            <v-btn icon @click="editQuestion(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteQuestion(item._id)">
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- Dialog لإضافة سؤال جديد -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">إضافة سؤال جديد</span>
        </v-card-title>
        <v-card-text>
          <v-select v-model="newQuestionType" :items="questionTypes" item-text="text" item-value="value" label="اختر نوع السؤال"></v-select>
          <v-text-field v-if="newQuestionType" v-model="newQuestion.question" label="أدخل السؤال"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="addQuestion">إضافة</v-btn>
          <v-btn color="grey darken-1" text @click="closeDialog">إلغاء</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRuntimeConfig } from '#imports';
import axios from 'axios';

const dialog = ref(false);
const questions = ref([]);
const newQuestion = ref({
  question: '',
  type: ''
});
const newQuestionType = ref(null);
const selectedQuestion = ref(null);
const selectedQuestionEdit = ref({
  question: '',
  answer: ''
});
const questionTypes = ref([
   'student' ,
   'applier' 
]);

const headers = [
  { text: 'السؤال', align: 'start', value: 'question' },
  { text: 'نوع السؤال', value: 'type' },
  { text: 'أفعال', value: 'actions', sortable: false }
];

const config = useRuntimeConfig();

const fetchQuestions = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/v1/questions`);
    questions.value = response.data.questions;
  } catch (error) {
    console.error('حدث خطأ في جلب الأسئلة:', error.message);
  }
};

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  newQuestion.value = { question: '', type: '' };
  newQuestionType.value = null;
};

const addQuestion = async () => {
  if (!newQuestionType.value || !newQuestion.value.question) return;
  newQuestion.value.type = newQuestionType.value;

  try {
    const response = await axios.post(`http://localhost:8000/v1/questions`, newQuestion.value, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJpYXQiOjE3MjA1NjA2OTcsImV4cCI6MTcyMDYwMzg5N30.qLSKsOPFAOn5_G0uFUWElA7LZviXvw7UgKH_OX7dw6A'
      }
    });
    console.log('تمت إضافة السؤال بنجاح:', response.data.question);
    closeDialog();
    await fetchQuestions(); // لتحديث قائمة الأسئلة بعد الإضافة
  } catch (error) {
    console.error('حدث خطأ في إضافة السؤال:', error.message);
  }
};

const editQuestion = (item) => {
  selectedQuestion.value = item._id;
  selectedQuestionEdit.value = { question: item.question, answer: item.answer };
};

const updateQuestion = async () => {
  if (!selectedQuestion.value) return;
  try {
    const response = await axios.put(`http://localhost:8000/v1/questions/${selectedQuestion.value}`, selectedQuestionEdit.value);
    console.log('تم تعديل السؤال بنجاح:', response.data.question);
    selectedQuestion.value = null;
    selectedQuestionEdit.value = { question: '', answer: '' };
    await fetchQuestions(); // لتحديث قائمة الأسئلة بعد التعديل
  } catch (error) {
    console.error('حدث خطأ في تعديل السؤال:', error.message);
  }
};

const deleteQuestion = async (questionId) => {
  try {
    const response = await axios.delete(`http://localhost:8000/v1/questions/${questionId}`);
    console.log('تم حذف السؤال بنجاح:', response.data.question);
    await fetchQuestions(); // لتحديث قائمة الأسئلة بعد الحذف
  } catch (error) {
    console.error('حدث خطأ في حذف السؤال:', error.message);
  }
};

onMounted(async () => {
  await fetchQuestions();
});
</script>

<style>
.text-right {
  text-align: right;
}
</style>
