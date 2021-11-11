<template>
  <div class="App">
    <vue-components-markdown
      :content="content"
      :component-map="componentMap"
      :variables="variables"
    />
  </div>
</template>

<script>
import MyPoll from './components/MyPoll.vue'

export default {
  name: 'App',
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

!<my-poll { config: '{{pollConfig}}' }>

And that's about it.
`,
      variables: {
        pollConfig: {
          question: 'What is up?',
          answers: ['The sky', 'Clouds', 'Ground', 'Nothing'],
        },
      },
      componentMap: {
        'my-poll': MyPoll,
      },
    }
  },
}
</script>
