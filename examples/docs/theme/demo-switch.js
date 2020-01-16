export default {
  template: `
  <div class="hf-doc-switch-demo">
    <hf-ui-switch v-model="switchValue"></hf-ui-switch>
    <hf-ui-switch v-model="switchValue1" disabled></hf-ui-switch>
  </div>
  `,
  data(){
    return {
      switchValue: false,
      switchValue1: false,
    };
  }
}
