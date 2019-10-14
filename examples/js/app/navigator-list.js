export default [
  {
    id: '1',
    module: 'Guide',
    label: '指南',
    icon: 'hf-iconfont icon-bianji',
    path: '/guid/principle',
    children: [
      {
        id: '101',
        module: 'Guide_Principle',
        path: '/guid/principle',
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
        module: 'Components_Bsic',
        label: '基础 Basic',
        icon: 'hf-iconfont icon-chakuaidi',
        children: [
          {
            id: '201001',
            module: 'Components_Bsic_GlobalSpacing',
            path: '/components/basic/globalSpacing',
            label: '全局间距 GlobalSpacing',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'GlobalSpacing'
          },

          {
            id: '201002',
            module: 'Components_Bsic_Color',
            path: '/components/basic/color',
            label: '色彩 Color',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Color'
          },

          {
            id: '201003',
            module: 'Components_Bsic_Font',
            path: '/components/basic/Font',
            label: '文字 Font',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Font'
          },

          {
            id: '201004',
            module: 'Components_Bsic_Layout',
            path: '/components/basic/layout',
            label: '布局 Layout',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Layout'
          },

          {
            id: '201004',
            module: 'Components_Bsic_Grid',
            path: '/components/basic/grid',
            label: '栅格 Grid',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Grid'
          },

          {
            id: '201006',
            module: 'Components_Bsic_Button',
            path: '/components/basic/button',
            label: '按钮 Button',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Button'
          },

          {
            id: '201006',
            module: 'Components_Bsic_Icon',
            path: '/components/basic/icon',
            label: '图标 Icon',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Icon'
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
            component: 'Menu'
          },
          {
            id: '202002',
            module: 'Components_Navigation_Breadcrumb',
            path: '/components/navigation/breadcrumb',
            label: '面包屑',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Breadcrumb'
          },
          {
            id: '202003',
            module: 'Components_Navigation_Tab',
            path: '/components/navigation/Tab',
            label: '标签页',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Tab'
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
