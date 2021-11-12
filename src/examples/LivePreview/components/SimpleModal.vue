<template>
  <div v-if="value" class="SimpleModalContainer">
    <div class="SimpleModal">
      <div class="SimpleModal__Title">
        {{ title }}
      </div>
      <div class="SimpleModal__Content">
        <slot />
      </div>
      <div class="SimpleModal__Actions">
        <button class="outlined" @click="$emit('input', false)">Close</button>
        <button @click="$emit('submit')">{{ submitBtnText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleModal',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    submitBtnText: {
      type: String,
      default: 'Submit',
    },
  },
}
</script>

<style scoped>
.SimpleModalContainer {
  position: absolute;
  background: rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
}

.SimpleModal {
  width: 600px;
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  position: fixed;
  left: calc(50% - 300px);
  top: 200px;
}

.SimpleModal__Title {
  height: 60px;
  line-height: 60px;
  font-size: 25px;
  padding: 0 20px;
}

.SimpleModal__Content {
  padding: 20px;
}

.SimpleModal__Actions {
  height: 40px;
  line-height: 40px;
  font-size: 25px;
  margin: 20px;
  display: flex;
  justify-content: space-between;
}

.SimpleModal__Actions button {
  background: #307fe2;
  border: none;
  padding: 10px 40px;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 600;
}

.SimpleModal__Actions button.outlined {
  background: #ffffff;
  border: 1px solid #307fe2;
  color: #307fe2;
}
</style>
