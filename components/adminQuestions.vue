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

    <!-- اختيار نوع السؤال لعرض الجدول -->
    <v-row>
      <v-col cols="12">
        <v-select v-model="selectedQuestionType" :items="questionTypes" label="اختر نوع السؤال لعرضه" @change="fetchQuestions"></v-select>
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
            <v-btn icon @click="deleteQuestion(item.id)">
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
          <v-select v-model="newQuestionType" :items="questionTypes" label="اختر نوع السؤال"></v-select>
          <v-text-field v-if="newQuestionType" v-model="newQuestion.question" label="أدخل السؤال"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="addQuestion">إضافة</v-btn>
          <v-btn color="grey darken-1" text @click="closeDialog">إلغاء</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog لتعديل السؤال -->
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">تعديل السؤال</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editedQuestionText" label="أدخل السؤال الجديد"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="updateQuestion">حفظ التعديلات</v-btn>
          <v-btn color="grey darken-1" text @click="closeEditDialog">إلغاء</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const token = ref()
onMounted(() => {
  token.value = localStorage.getItem('accessToken')
})

const dialog = ref(false);
const editDialog = ref(false);
const questions = ref([]);
const newQuestion = ref({
  question: '',
  type: ''
});
const newQuestionType = ref(null);
const editedQuestionText = ref('');
const selectedQuestion = ref(null);
const questionTypes = ref(['student', 'applier']);
const selectedQuestionType = ref('student'); // افترض اختيار نوع السؤال الافتراضي

const headers = [
  { text: 'السؤال', align: 'start', value: 'text' }, // تعديل القيمة إلى 'text' بدلاً من 'question'
  { text: 'نوع السؤال', value: 'questionType' }, // تعديل القيمة إلى 'questionType' بدلاً من 'type'
  { text: 'أفعال', value: 'actions', sortable: false }
];

const fetchQuestions = async () => {
  try {
    const response = await axios.get(`https://backend.babybuildingksa.com/v1/questions?type=${selectedQuestionType.value}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });
    questions.value = response.data.data;
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
    const response = await axios.post(`https://backend.babybuildingksa.com/v1/questions`, newQuestion.value, {
      headers: {
        Authorization: `Bearer ${token.value}`
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
  selectedQuestion.value = item.id;
  editedQuestionText.value = item.text;
  editDialog.value = true;
};

const updateQuestion = async () => {
  try {
    const response = await axios.patch(`https://backend.babybuildingksa.com/v1/questions/${selectedQuestion.value}`, {
      question: editedQuestionText.value
    }, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });
    console.log('تم تعديل السؤال بنجاح:', response.data.question);
    closeEditDialog();
    await fetchQuestions(); // لتحديث قائمة الأسئلة بعد التعديل
  } catch (error) {
    console.error('حدث خطأ في تعديل السؤال:', error.message);
  }
};

const closeEditDialog = () => {
  editDialog.value = false;
  selectedQuestion.value = null;
  editedQuestionText.value = '';
};

const deleteQuestion = async (questionId) => {
  try {
    const response = await axios.delete(`https://backend.babybuildingksa.com/v1/questions/${questionId}`,{
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });
    console.log('تم حذف السؤال بنجاح:', response.data.question);
    await fetchQuestions(); // لتحديث قائمة الأسئلة بعد الحذف
  } catch (error) {
    console.error('حدث خطأ في حذف السؤال:', error.message);
  }
};

onMounted(async () => {
  await fetchQuestions();
});

watch(selectedQuestionType, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await fetchQuestions();
  }
});
</script>

<style>
.text-right {
  text-align: right;
}
</style>
