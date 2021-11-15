<template>
  <div class="App">
    <div class="AppSide">
      <vue-components-markdown :content="tocContent" />
    </div>

    <div class="AppMain">
      <vue-components-markdown
        :content="content"
        :component-map="componentMap"
        :markdown-processor-props="{
          toc: true,
        }"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-useless-escape */
import LivePreview from './examples/LivePreview/LivePreview.vue'

const tocContent = `
#### Table of contents

- [Example: Live preview](#example-livepreview)
- [How to install](#how-to-install)
- [Props](#props)
  - [\`content\`](#content-prop)
  - [\`component-map\`](#component-map-prop)
  - [\`variables\`](#variables-prop)
- [Scoped slots](#scoped-slots)
  - [\`markdown-processor\`](#markdown-processor-scoped-slot)
`

const content = `
# \`vue-components-markdown\` component

---

## Example: LivePreview

In this example we build a markdown text editor that supports two custom components (\`my-poll\` and \`youtube-video\`) with preview on right. See code [here](https://github.com/ivanjolic95/vue-components-markdown/tree/main/src/docs/examples/LivePreview).

!<live-preview>

## How to install

1. Add package to your \`package.json\`:

\`\`\`
yarn add vue-components-markdown
\`\`\`

2. (Optional) Use \`VueComponentsMarkdown\` Vue plugin

\`\`\`
// main.js
import VueComponentsMarkdownPlugin from 'vue-components-markdown'

// ...

Vue.use(VueComponentsMarkdownPlugin)
\`\`\`

---

## Props

| Name                     | Type    | Required  | Default value | Description                                                  |
| ------------------------ | ------- | --------- | ------------- | ------------------------------------------------------------ |
| content                  | String  | \`false\` | \`''\`        | Markdown content to be rendered                              |
| component-map            | Object  | \`false\` | \`{}\`        | Used for rendering custom components in markdown content     |
| variables                | Object  | \`false\` | \`{}\`        | Used for injecting variables in markdown content             |
| no-component-wrapper     | Boolean | \`false\` | \`false\`     | If \`true\` custom components won't be rendered in a wrapper |
| component-wrapper-tag    | String  | \`false\` | \`'div'\`     | If wrapper is rendered, this tag will be used for it         |
| component-wrapper-class  | String  | \`false\` | \`''\`        | If wrapper is rendered, this class will be added to it       |
| markdown-processor-props | Object  | \`false\` | \`{}\`        | Props passed to default markdown processor \`vue-markdown\`  |

### \`content\` prop

Accepts any markdown string. It's parsed in runtime, so you can get the text from any source (API, \`.md\` file, variable etc.)

Using custom components:
- you can inject any vue component in any place in the document
- syntax:
  - **\\!\\<component-name>** - renders a component without any props
  - **\\!\\<component-name { propName: '"value"' }>** - renders a component and sets it's \`prop-name\` prop to 'value'
  - **\\!\\<component-name { propName: '{"a": "value","b":{"c": 123}}' }>** - renders a component and sets it's \`prop-name\` prop to JS object \`{ a: 'value', b: { c: 123 } }\`
  - **\\!\\<component-name { propName: '{{variableName}}' }>** - renders a component and sets it's \`prop-name\` prop to the injected variable \`variableName\`

- **IMPORTANT**: note that the **prop values need to be in JSON format** unless they are injected variables & **custom components need to be registered** in \`component-map\` prop.

### \`component-map\` prop

Accepts an object where the key is component name in markdown content, and the value is the component that should be rendered in that place.

For example:

\`\`\`
<template>
  <!-- ... -->
  <vue-components-markdown :content="content" :component-map="componentMap" />
  <!-- ... -->
</template>

<script>
import MyComponent from './components/MyComponent'
import Description from './components/Description'

{
  // ...
  computed: {
    content() {
      return \`
Here go the custom components:

#!<my-component>
#!<description { text: '"This is the description"' }>
\`
    },
    componentMap() {
      return {
        'my-component': MyComponent,
        'description': Description,
      }
    },
  },
  // ...
}
\`\`\`

### \`variables\` prop

Accepts an object where the key is component name in markdown content, and the value is the component that should be rendered in that place.

For example:

\`\`\`
<template>
  <!-- ... -->
  <vue-components-markdown :content="content" :component-map="componentMap" :variables="variables" />
  <!-- ... -->
</template>

<script>
import Description from './components/Description'

{
  // ...
  computed: {
    content() {
      return \`
Here go the custom components:

#!<description { text: '{{descriptionText}}' }>
\`
    },
    componentMap() {
      return {
        'description': Description,
      }
    },
    variables: {
      return {
        descriptionText: 'This is a text in variable',
      }
    },
  },
  // ...
}
\`\`\`

---

## Scoped slots

| Name               | Default                    | Provided props                                 |
| ------------------ | -------------------------- | ---------------------------------------------- |
| markdown-processor | \`vue-markdown\` component | \`content\` - markdown content to be processed |

### \`markdown-processor\` scoped slot

By default markdown is rendered by [vue-markdown](https://github.com/miaolz123/vue-markdown) component.
You can override this by using \`markdown-processor\` scoped slot and process the markdown content with other processor.

In that case you can just use following syntax:

\`\`\`
<vue-components-markdown :content="myContent" :component-map="componentMap" :variables="variables">
  <template #markdown-processor="{ content }">
    <my-custom-markdown-processor>{{ content }}</my-custom-markdown-processor>
  </template>
</vue-components-markdown>
\`\`\`
`

export default {
  name: 'App',
  data() {
    return {
      tocContent: tocContent.trim(),
      content: content.trim(),
      componentMap: {
        'live-preview': LivePreview,
      },
    }
  },
  created() {
    const head = document.getElementsByTagName('head')[0]
    let fontTag = document.createElement('link')
    fontTag.href =
      'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap'
    fontTag.rel = 'stylesheet'
    head.appendChild(fontTag)
    fontTag = document.createElement('link')
    fontTag.href =
      'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&family=Roboto+Mono:wght@300;400&display=swap'
    fontTag.rel = 'stylesheet'
    head.appendChild(fontTag)
  },
}
</script>

<style scoped>
.App {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.AppSide {
  background: #ffffff;
  min-width: 300px;
  max-width: 300px;
  padding: 20px;
  left: 5%;
  box-shadow: 0 0 5px 0 #e1e1e1;
  height: fit-content;
  position: fixed;
  margin-top: 60px;
}

.AppMain {
  background: #ffffff;
  flex-basis: 1;
  padding: 20px;
  box-shadow: 0 0 5px 0 #e1e1e1;
  margin-top: 60px;
  margin-left: calc(5% + 380px);
  margin-right: 5%;
}

::v-deep .VueComponentsMarkdown hr {
  margin: 20px 0;
  border-top: 1px solid #e1e1e1;
}
::v-deep .VueComponentsMarkdown h1 {
  margin: 0;
  text-align: center;
}

::v-deep .VueComponentsMarkdown h1 .toc-anchor {
  display: none;
}

::v-deep .VueComponentsMarkdown .toc-anchor {
  font-size: 20px;
}

::v-deep .VueComponentsMarkdown a {
  color: #2b6cbe;
  text-decoration: none;
}

::v-deep .VueComponentsMarkdown code {
  background: #ebf4ff;
  border: 1px solid #2b6cbe;
  border-radius: 4px;
  color: #2b6cbe;
  font-style: normal;
  padding: 0px 4px;
  margin: 0 2px;
}

::v-deep .VueComponentsMarkdown pre {
  background: #f9f9f9;
  border: 1px solid #e1e1e1;
  padding: 20px;
}

::v-deep .VueComponentsMarkdown pre code {
  width: 100%;
  background: none;
  color: #75787a;
  border: none;
  font-family: 'Roboto Mono', monospace;
}

::v-deep .VueComponentsMarkdown table {
  border: 1px solid #e1e1e1;
  width: 100%;
  border-radius: 10px;
  margin: 40px 0;
}

::v-deep .VueComponentsMarkdown table th {
  border-bottom: 1px solid #e1e1e1;
  text-align: left;
}

::v-deep .VueComponentsMarkdown table th,
::v-deep .VueComponentsMarkdown table td {
  padding: 10px;
}
</style>

<style>
body,
html {
  background: #f9f9f9;
  color: #75787a;
  margin: 0;
}

* {
  font-family: 'Poppins', sans-serif;
}
</style>
