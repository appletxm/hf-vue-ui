export default {
  template: `
  <div class="hf-doc-breadcrumb-demo">
    <hf-ui-breadcrumb theme="white">
      <hf-ui-breadcrumb-item :to="{ path: '/home' }">首页</hf-ui-breadcrumb-item>
      <hf-ui-breadcrumb-item :to="{ path: '/manage' }">活动管理</hf-ui-breadcrumb-item>
      <hf-ui-breadcrumb-item :to="{ path: '/list' }">活动列表</hf-ui-breadcrumb-item>
      <hf-ui-breadcrumb-item>活动详情</hf-ui-breadcrumb-item>
    </hf-ui-breadcrumb>
  </div>
  `,
  data(){
    return {};
  }
}

