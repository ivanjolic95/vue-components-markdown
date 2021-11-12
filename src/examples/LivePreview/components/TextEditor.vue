<template>
  <div class="TextEditor">
    <div class="TextEditor__Actions">
      <button @click="showPollModal = true">Append poll</button>
    </div>
    <textarea
      :value="content"
      @input="$emit('update:content', $event.target.value)"
    />

    <!-- MODALS -->
    <append-poll-modal v-model="showPollModal" @submit="addPoll" />
  </div>
</template>

<script>
import AppendPollModal from './AppendPollModal.vue'

export default {
  name: 'TextEditor',
  components: { AppendPollModal },
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showPollModal: false,
    }
  },
  methods: {
    addPoll(pollConfig) {
      const data = JSON.stringify(pollConfig)
      const pollComponent = `!<my-poll { config: '${data}' }>`
      this.$emit('update:content', `${this.content}\n\n${pollComponent}`)
    },
  },
}
</script>

<style scoped>
.TextEditor {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.TextEditor__Actions {
  flex-basis: 20px;
  margin-bottom: 20px;
}

.TextEditor__Actions button {
  background: #307fe2;
  border: none;
  padding: 10px 40px;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 600;
}

textarea {
  width: 100%;
  flex-grow: 1;
}
</style>
