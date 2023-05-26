<template>
  <simple-modal
    :model-value="modelValue"
    title="Add video"
    @update:model-value="$emit('update:model-value', $event)"
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
    modelValue: {
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
