export default {
  template: `
  <div class="hf-doc-checkbox-demo">
    <hf-ui-checkbox-group v-model="checkList">
      <hf-ui-checkbox label="1">默认状态</hf-ui-checkbox>
      <hf-ui-checkbox label="2">悬浮状态</hf-ui-checkbox>
      <hf-ui-checkbox label="3">选中状态</hf-ui-checkbox>
      <hf-ui-checkbox label="4" disabled>选中禁用状态</hf-ui-checkbox>
      <hf-ui-checkbox label="5" disabled>没选中禁用状态</hf-ui-checkbox>
    </hf-ui-checkbox-group>
    </div>
  `,
  data(){
    return {
      checkList: ['3', '4']
    };
  }
}
