<template>
  <div class="PreviewRenderer">
    <vue-components-markdown
      :content="content"
      :component-map="componentMap"
      :variables="variables"
    />
  </div>
</template>

<script>
import MyPoll from './MyPoll.vue'

export default {
  name: 'PreviewRenderer',
  props: {
    content: {
      type: String,
      required: true,
    },
    variables: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      componentMap: {
        'my-poll': MyPoll,
      },
    }
  },
}
</script>
