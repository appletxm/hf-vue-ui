export default {
  template: `
  <div class="hf-doc-input-demo">
    <hf-ui-input placeholder="请输入内容" v-model="input" width="300"></hf-ui-input>
  </div>
  `,
  data(){
    return {
      input: ''
    };
  }
}
