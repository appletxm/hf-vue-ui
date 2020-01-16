export default {
  template: `
  <div class="hf-doc-spinner-demo">
    <div
      style="height: 70px"
      v-loading="isLoading"
      element-loading-spinner="ui-icon-line-currency-loading"
      type="area">
    </div>

    <div
      v-loading="isLoading"
      element-loading-text="滚动加载"
      element-loading-spinner="ui-icon-line-currency-loading"
      type="scroll">
    </div>
  </div>
  `,
  data(){
    return {
      isLoading: true
    };
  }
}
