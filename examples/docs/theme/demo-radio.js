export default {
  template: `
  <div class="hf-doc-radio-demo">
    <hf-ui-radio v-model="radio" label="1">默认状态</hf-ui-radio>
    <hf-ui-radio v-model="radio" label="2">悬浮状态</hf-ui-radio>
    <hf-ui-radio v-model="radio" label="3">选中状态</hf-ui-radio>
    <hf-ui-radio v-model="radio" label="3" disabled>选中禁用状态</hf-ui-radio>
    <hf-ui-radio v-model="radio" label="5" disabled>没选中禁用状态</hf-ui-radio>
  </div>
  `,
  data(){
    return {
      radio: '3'
    };
  }
}
