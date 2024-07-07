<!-- pages/AdminPanel.vue -->
<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="text-center">لوحة التحكم للأدمن</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>إضافة سؤال جديد</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="addQuestion">
                <v-text-field v-model="newQuestion.question" label="السؤال"></v-text-field>
                <v-btn color="primary" type="submit">إضافة</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>تعديل سؤال موجود</v-card-title>
            <v-card-text>
              <v-select v-model="selectedQuestion" :items="questions" label="اختر سؤالًا"></v-select>
              <v-text-field v-model="selectedQuestionEdit.question" label="السؤال"></v-text-field>
              <v-btn color="primary" @click="updateQuestion">تعديل</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>حذف سؤال موجود</v-card-title>
            <v-card-text>
              <v-select v-model="selectedQuestionToDelete" :items="questions" label="اختر سؤالًا"></v-select>
              <v-btn color="error" @click="deleteQuestion">حذف</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        questions: [],
        newQuestion: {
          question: '',
          answer: ''
        },
        selectedQuestion: null,
        selectedQuestionEdit: {
          question: '',
          answer: ''
        },
        selectedQuestionToDelete: null
      };
    },
    async mounted() {
      await this.fetchQuestions();
    },
    methods: {
      async fetchQuestions() {
        // استرجاع الأسئلة من API
        try {
          const response = await this.$axios.get('/api/questions');
          this.questions = response.data.questions;
        } catch (error) {
          console.error('حدث خطأ في جلب الأسئلة:', error.message);
        }
      },
      async addQuestion() {
        // إضافة سؤال جديد إلى API
        try {
          const response = await this.$axios.post('/api/questions', {
            question: this.newQuestion.question,
            answer: this.newQuestion.answer
          });
          console.log('تمت إضافة السؤال بنجاح:', response.data.question);
          this.newQuestion.question = '';
          this.newQuestion.answer = '';
          await this.fetchQuestions(); // لتحديث قائمة الأسئلة بعد الإضافة
        } catch (error) {
          console.error('حدث خطأ في إضافة السؤال:', error.message);
        }
      },
      async updateQuestion() {
        // تعديل سؤال موجود عبر API
        if (!this.selectedQuestion) return;
        try {
          const response = await this.$axios.put(`/api/questions/${this.selectedQuestion._id}`, {
            question: this.selectedQuestionEdit.question,
            answer: this.selectedQuestionEdit.answer
          });
          console.log('تم تعديل السؤال بنجاح:', response.data.question);
          this.selectedQuestion = null;
          this.selectedQuestionEdit.question = '';
          this.selectedQuestionEdit.answer = '';
          await this.fetchQuestions(); // لتحديث قائمة الأسئلة بعد التعديل
        } catch (error) {
          console.error('حدث خطأ في تعديل السؤال:', error.message);
        }
      },
      async deleteQuestion() {
        // حذف سؤال موجود عبر API
        if (!this.selectedQuestionToDelete) return;
        try {
          const response = await this.$axios.delete(`/api/questions/${this.selectedQuestionToDelete._id}`);
          console.log('تم حذف السؤال بنجاح:', response.data.question);
          this.selectedQuestionToDelete = null;
          await this.fetchQuestions(); // لتحديث قائمة الأسئلة بعد الحذف
        } catch (error) {
          console.error('حدث خطأ في حذف السؤال:', error.message);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* أنماط CSS المحلية هنا إذا لزم الأمر */
  </style>
  