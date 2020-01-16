export default {
  template: `
  <div>
    <hf-ui-tabs type="ellipse">
        <hf-ui-tab-pane label="用户管理"></hf-ui-tab-pane>
        <hf-ui-tab-pane label="配置管理"></hf-ui-tab-pane>
        <hf-ui-tab-pane label="角色管理"></hf-ui-tab-pane>
        <hf-ui-tab-pane label="定时任务补偿" disabled></hf-ui-tab-pane>
    </hf-ui-tabs>
    <hf-ui-tabs>
        <hf-ui-tab-pane label="用户管理">
            <hf-ui-tabs type="text">
                <hf-ui-tab-pane label="子标签一"></hf-ui-tab-pane>
                <hf-ui-tab-pane label="子标签二"></hf-ui-tab-pane>
                <hf-ui-tab-pane label="子标签三" disabled></hf-ui-tab-pane>
                <hf-ui-tab-pane label="子标签四"></hf-ui-tab-pane>
            </hf-ui-tabs>
        </hf-ui-tab-pane>
        <hf-ui-tab-pane label="配置管理"></hf-ui-tab-pane>
        <hf-ui-tab-pane label="角色管理"></hf-ui-tab-pane>
        <hf-ui-tab-pane label="定时任务补偿" disabled></hf-ui-tab-pane>
    </hf-ui-tabs>
  </div>
  `,
  data(){
    return {
      switchValue: false,
      switchValue1: false,
    };
  }
}
