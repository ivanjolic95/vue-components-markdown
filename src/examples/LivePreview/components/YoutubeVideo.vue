<template>
  <iframe
    width="560"
    height="315"
    :src="`https://www.youtube.com/embed/${videoId}`"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  />
</template>

<script>
export default {
  name: 'YoutubeVideo',
  props: {
    videoId: {
      type: String,
      required: true,
    },
  },
}
</script>
