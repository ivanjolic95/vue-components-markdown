<template>
  <div class="PreviewRenderer">
    <vue-components-markdown
      :content="content"
      :component-map="componentMap"
      :variables="variables"
      no-component-wrapper
    />
  </div>
</template>

<script>
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
    componentMap: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
