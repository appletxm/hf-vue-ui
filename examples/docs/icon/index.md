<script>
  import DemoBlock from 'components-biz/demo-block'

  export default {
    created() {
      this.$getAllIcons()
    },
    mounted() {},
    components: {
      DemoBlock
    },
    methods: {
      $getAllIcons() {
        axios.get('/api/iconsList/get').then(res => {
         this.iconsList = res.data.icons
        }).catch(err => {
          console.info('$getAllIcons:', err)
        })
      }
    },
    data() {
      return {
        iconsList: []
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
      <span class="hf-ui-icon ui-icon-line-currency-star"></span>
      <span class="hf-ui-icon ui-icon-line-currency-hide"></span>
    </div>
    <template slot="highlight">
      <pre>
        <code class="html hljs xml">
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hf-ui-icon ui-icon-line-currency-star"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hf-ui-icon ui-icon-line-currency-hide"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        </code>
      </pre>
    </template>
  </demo-block>
  <p>与组件使用</p>
  <demo-block class="hf-ui-doc-icon">
    <div slot="source">
      <hf-ui-button size="big" icon="hf-ui-icon ui-icon-line-direction-arrowleft" type="primary">回主页</hf-ui-button>
      <hf-ui-icon icon="hf-ui-icon ui-icon-line-direction-arrowleft"></hf-ui-icon>
    </div>
    <div slot="highlight">
      <pre>
        <code class="html hljs xml">
          <span class="hljs-tag">&lt;<span class="hljs-name">hf-ui-button</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"big"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"ui-icon-line-direction-arrowleft"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hf-ui-button</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">hf-ui-icon</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"ui-icon-line-direction-arrowleft"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hf-ui-icon</span>&gt;</span>
        </code>
      </pre>
    </div>
  </demo-block>
  <h3 id="attributes"><a href="#attributes" aria-hidden="true" class="header-anchor">¶</a>Attributes</h3>
  <table>
    <thead>
      <tr><th>参数</th> <th>说明</th> <th>类型</th> <th>可选值</th> <th>默认值</th></tr>
    </thead>
    <tbody>
      <tr><td>icon</td> <td>以下图标集合对应图标名称</td> <td>string</td> <td>-</td> <td>-</td></tr>
    </tbody>
  </table>
  <h3>图标集合</h3>
  <div class="rf-ui-doc-icon-list">
    <ul>
      <li v-for="(icon, index) in iconsList" :key="index">
        <span :class="['hf-ui-icon', icon.class]"></span>
        <i>{{icon.label}}</i>
      </li>
    </ul>
  </div>
</template>
