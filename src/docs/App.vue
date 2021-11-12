<template>
  <vue-components-markdown :content="content" />
</template>

<script>
const content = `# My title`

export default {
  name: 'App',
  data() {
    return {
      content,
    }
  },
}
</script>
