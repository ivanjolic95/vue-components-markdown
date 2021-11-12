<template>
  <div class="MyPoll">
    <div class="MyPoll__Title">{{ question }}</div>

    <div class="MyPoll__Answers">
      <div v-for="answer in answers" :key="answer" class="MyPoll__Answer">
        <input type="radio" name="answer" :value="answer" /> {{ answer }}
      </div>
    </div>

    <div class="MyPoll__Actions">
      <button>See results</button>
      <button type="Submit">Vote!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPoll',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    question() {
      return this.config.question
    },
    answers() {
      return this.config.answers
    },
  },
}
</script>

<style scoped>
.MyPoll {
  width: 300px;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  margin: 20px 0;
}

.MyPoll__Title {
  border-bottom: 1px solid #e1e1e1;
  padding: 20px 10px;
}

.MyPoll__Answer {
  padding: 10px;
}

.MyPoll__Actions {
  width: 280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 10px;
}

.MyPoll__Actions button {
  background: none;
  border: none;
  color: #307fe2;
  font-weight: 600;
  cursor: pointer;
}

.MyPoll__Actions button[type='submit'] {
  background: #307fe2;
  border: none;
  padding: 10px 40px;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 600;
}
</style>
