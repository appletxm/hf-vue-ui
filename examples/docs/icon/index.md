<script>
  import scssGlobals from 'theme/variables.scss'
  import DemoBlock from 'components-biz/demo-block'

  export default {
    created() {},
    mounted() {},
    components: {
      DemoBlock
    },
    methods: {},
    data() {
      return {
        fontFamily: scssGlobals['fontFamily']
      }
    },
    watch: {}
  }

</script>

<template>
  <h2>Icon 图标</h2>
  <p>提供了一套常用的图标集合。</p>
  <h3>使用方法</h3>
  <p>与标准的html标签使用</p>
  <demo-block class="hf-ui-doc-icon">
    <div slot="source" class="icon-html-example">
      <span class="hf-ui-icon ui-icon-home"></span>
      <span class="hf-ui-icon ui-icon-arrowdown"></span>
    </div>
    <template slot="highlight">
      <pre>
        <code class="html hljs xml">
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hf-ui-icon ui-icon-home"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hf-ui-icon ui-icon-arrowdown"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        </code>
      </pre>
    </template>
  </demo-block>
  <p>与组件使用</p>
  <demo-block class="hf-ui-doc-icon">
    <div slot="source">
      <hf-ui-button size="big" icon="ui-icon-home" type="primary">回主页</hf-ui-button>
      <hf-ui-icon icon="ui-icon-home"></hf-ui-icon>
    </div>
    <div slot="highlight">
      <pre>
        <code class="html hljs xml">
          <span class="hljs-tag">&lt;<span class="hljs-name">hf-ui-button</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"big"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"ui-icon-home"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hf-ui-button</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">hf-ui-icon</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"ui-icon-home"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hf-ui-icon</span>&gt;</span>
        </code>
      </pre>
    </div>
  </demo-block>
  <h3>图标集合</h3>
</template>
