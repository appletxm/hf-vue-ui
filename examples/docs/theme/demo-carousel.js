export default {
  template: `
  <div class="hf-doc-carousel-demo">
    <hf-ui-carousel height="150px">
      <hf-ui-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </hf-ui-carousel-item>
    </hf-ui-carousel>
  </div>
  `,
  data(){
    return {};
  }
}
