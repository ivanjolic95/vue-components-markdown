<template>
  <div class="LivePreview row">
    <div class="col">
      <text-editor :content.sync="content" :variables.sync="variables" />
    </div>
    <div class="col">
      <preview-renderer
        :content="content"
        :variables="variables"
        :component-map="componentMap"
      />
    </div>
  </div>
</template>

<script>
import MyPoll from './components/MyPoll.vue'
import YoutubeVideo from './components/YoutubeVideo.vue'
import PreviewRenderer from './components/PreviewRenderer.vue'
import TextEditor from './components/TextEditor.vue'

export default {
  name: 'LivePreview',
  components: { TextEditor, PreviewRenderer },
  data() {
    return {
      content: `# Introduction

## What is Vue.js?
Vue (pronounced /vjuː/, like __view__) is a __progressive framework__ for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with [modern tooling](https://v3.vuejs.org/guide/single-file-component.html) and [supporting libraries](https://github.com/vuejs/awesome-vue#components--libraries).

If you’d like to learn more about Vue before diving in, we [created a video](https://v3.vuejs.org/guide/introduction.html#) walking through the core principles and a sample project.
`,
      variables: {},
      componentMap: {
        'my-poll': MyPoll,
        'youtube-video': YoutubeVideo,
      },
    }
  },
}
</script>

<style lang="css" scoped>
.LivePreview {
  box-shadow: 0 0 5px 0 #e1e1e1;
  padding: 20px;
  margin: 40px 0;
}

.row {
  width: calc(100% - 40px);
  display: flex;
}

.col {
  flex-grow: 1;
  min-height: 500px;
  margin: 0 20px;
  max-width: 50%;
}

::v-deep button {
  cursor: pointer;
}
</style>
