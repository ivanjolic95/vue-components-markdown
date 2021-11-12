<template>
  <simple-modal
    :value="value"
    title="Add poll"
    @input="$emit('input', $event)"
    @submit="handleSubmit"
  >
    <div class="AppendPollModal">
      <input v-model="question" type="text" placeholder="Poll Question" />

      <span>Answers:</span>

      <div
        v-for="(answer, index) in answers"
        :key="index"
        class="AppendPollModal__Answer"
      >
        <input v-model="answers[index]" :placeholder="`Answer #${index + 1}`" />

        <span
          class="AppendPollModal__AnswerAction"
          @click="removeAnswer(index)"
        >
          Remove
        </span>
      </div>

      <span class="AppendPollModal__AnswerAction" @click="addAnswer"
        >Add answer</span
      >
    </div>
  </simple-modal>
</template>

<script>
import SimpleModal from './SimpleModal.vue'

export default {
  name: 'AppendPollModal',
  components: { SimpleModal },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      question: 'Is this a question?',
      answers: ['This is an example answer', 'This is another answer'],
    }
  },
  methods: {
    removeAnswer(index) {
      this.answers = [
        ...this.answers.slice(0, index),
        ...this.answers.slice(index + 1),
      ]
    },
    addAnswer() {
      this.answers = [...this.answers, '']
    },
    handleSubmit() {
      this.$emit('submit', {
        question: this.question,
        answers: this.answers.filter(Boolean),
      })
    },
  },
}
</script>

<style scoped>
.AppendPollModal {
  display: flex;
  flex-direction: column;
}

input {
  margin: 10px 0;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  border: 1px solid #e1e1e1;
  color: #75787a;
  padding: 0 10px;
}

.AppendPollModal__Answer {
  width: 100%;
}

.AppendPollModal__Answer input {
  width: 50%;
  margin-right: 20px;
}

.AppendPollModal__AnswerAction {
  color: #307fe2;
  font-weight: 600;
  cursor: pointer;
}
</style>
