export default {
  template: `
  <div class="hf-doc-pagination-demo">
    <h4>常用分页</h4>
    <hf-ui-pagination
      layout="prev, pager, next, jumper, total"
      :total="1000">
    </hf-ui-pagination>

    <h4>Tab类分页</h4>
    <div class="hf-ui-doc-pagination-demo-1">
      <hf-ui-carousel type="column" background autosize indicator-title="优秀工作室空间">
        <hf-ui-carousel-item v-for="item in 4" :key="item">
          <dl class="card">
            <dt>Image</dt>
            <dd>
              <hf-ui-h :size="3" class="title">杨坤{{item}}</hf-ui-h>
              <hf-ui-h :size="4" class="text">语文</hf-ui-h>
              <hf-ui-h :size="5" class="date">广州市第二中学</hf-ui-h>
              <hf-ui-h :size="5" class="date">访问量：1638</hf-ui-h>
            </dd>
          </dl>
          <dl class="card">
            <dt>Image</dt>
            <dd>
              <hf-ui-h :size="3" class="title">欧阳娜娜{{item}}</hf-ui-h>
              <hf-ui-h :size="4" class="text">语文</hf-ui-h>
              <hf-ui-h :size="5" class="date">广州市第二中学</hf-ui-h>
              <hf-ui-h :size="5" class="date">访问量：1638</hf-ui-h>
            </dd>
          </dl>
          <dl class="card">
            <dt>Image</dt>
            <dd>
              <hf-ui-h :size="3" class="title">李冰冰{{item}}</hf-ui-h>
              <hf-ui-h :size="4" class="text">语文</hf-ui-h>
              <hf-ui-h :size="5" class="date">广州市第二中学</hf-ui-h>
              <hf-ui-h :size="5" class="date">访问量：1638</hf-ui-h>
            </dd>
          </dl>
        </hf-ui-carousel-item>
      </hf-ui-carousel>
    </div>
  </div>
  `,
  data(){
    return {};
  }
}
