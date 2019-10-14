export default [
  {
    id: '1',
    module: 'Guide',
    label: '指南',
    icon: 'hf-iconfont icon-bianji',
    path: '/guide/principle',
    children: [
      {
        id: '101',
        module: 'Guide_Principle',
        path: '/guide/principle',
        label: '原则',
        icon: 'hf-iconfont icon-bianji',
        component: 'Principle'
      }
    ]
  },

  {
    id: '2',
    module: 'Components',
    label: '组件',
    icon: 'hf-iconfont icon-chakuaidi',
    path: '/components/basic/layout',
    children: [
      {
        id: '201',
        module: 'Components_Basic',
        label: '基础 Basic',
        icon: 'hf-iconfont icon-chakuaidi',
        children: [
          {
            id: '201001',
            module: 'Components_Basic_GlobalSpacing',
            path: '/components/basic/globalSpacing',
            label: '全局间距 GlobalSpacing',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'GlobalSpacing',
            next: '1_0_1'
          },

          {
            id: '201002',
            module: 'Components_Basic_Color',
            path: '/components/basic/color',
            label: '色彩 Color',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Color',
            next: '1_0_2',
            prev: '1_0_0'
          },

          {
            id: '201003',
            module: 'Components_Basic_Font',
            path: '/components/basic/Font',
            label: '文字 Font',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Font',
            next: '1_0_3',
            prev: '1_0_1'
          },

          {
            id: '201004',
            module: 'Components_Basic_Layout',
            path: '/components/basic/layout',
            label: '布局 Layout',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Layout',
            next: '1_0_4',
            prev: '1_0_2'
          },

          {
            id: '201004',
            module: 'Components_Basic_Grid',
            path: '/components/basic/grid',
            label: '栅格 Grid',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Grid',
            next: '1_0_5',
            prev: '1_0_3'
          },

          {
            id: '201006',
            module: 'Components_Basic_Button',
            path: '/components/basic/button',
            label: '按钮 Button',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Button',
            next: '1_1_0',
            prev: '1_0_4'
          }
        ]
      },

      {
        id: '202',
        module: 'Components_Navigation',
        label: '导航',
        icon: 'hf-iconfont icon-chakuaidi',
        children: [
          {
            id: '202001',
            module: 'Components_Navigation_Menu',
            path: '/components/navigation/menu',
            label: '导航',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Menu',
            next: '1_1_1',
            prev: '1_0_5'
          },
          {
            id: '202002',
            module: 'Components_Navigation_Breadcrumb',
            path: '/components/navigation/breadcrumb',
            label: '面包屑',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Breadcrumb',
            next: '1_1_2',
            prev: '1_1_0'
          },
          {
            id: '202003',
            module: 'Components_Navigation_Tab',
            path: '/components/navigation/Tab',
            label: '标签页',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Tab',
            // next: '1_2_0',
            prev: '1_1_1'
          }
        ]
      },

      {
        id: '203',
        module: 'Components_Data',
        // path: '/components/data',
        label: '数据录入',
        icon: 'hf-iconfont icon-chakuaidi'
        // component: 'Data'
      }
    ]
  },
  {
    id: 3,
    module: 'Theme',
    path: '/theme',
    label: '主题',
    icon: 'hf-iconfont icon-chakuaidi',
    component: 'Theme'
  }
]
