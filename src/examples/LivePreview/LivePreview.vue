<template>
  <div class="LivePreview row">
    <div class="col">
      <text-editor :content.sync="content" :variables.sync="variables" />
    </div>
    <div class="col">
      <preview-renderer :content="content" :variables="variables" />
    </div>
  </div>
</template>

<script>
import MyPoll from './components/MyPoll.vue'
import PreviewRenderer from './components/PreviewRenderer.vue'
import TextEditor from './components/TextEditor.vue'

export default {
  name: 'LivePreview',
  components: { TextEditor, PreviewRenderer },
  data() {
    return {
      content: `
# Test

This is some regular __markdown__ content.

## Subtitle

And this is a list:
- first
- second
- third

And that's about it.
`,
      variables: {},
      componentMap: {
        'my-poll': MyPoll,
      },
    }
  },
}
</script>

<style lang="css" scoped>
.row {
  width: 100%;
  display: flex;
}

.col {
  flex-grow: 1;
  height: 95vh;
  margin: 0 20px;
}

::v-deep button {
  cursor: pointer;
}
</style>
