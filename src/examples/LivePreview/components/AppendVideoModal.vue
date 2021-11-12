<template>
  <simple-modal
    :value="value"
    title="Add video"
    @input="$emit('input', $event)"
    @submit="handleSubmit"
  >
    <div class="AppendVideoModal">
      <input
        v-model="youtubeVideoId"
        type="text"
        placeholder="YouTube video ID"
      />
    </div>
  </simple-modal>
</template>

<script>
import SimpleModal from './SimpleModal.vue'

export default {
  name: 'AppendVideoModal',
  components: { SimpleModal },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      youtubeVideoId: '',
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', {
        youtubeVideoId: this.youtubeVideoId,
      })
    },
  },
}
</script>

<style scoped>
.AppendVideoModal {
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
</style>
