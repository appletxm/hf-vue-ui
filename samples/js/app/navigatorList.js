export default [
  {
    id: '1',
    module: 'Guide',
    url: '/guid',
    label: '指南',
    icon: 'hf-iconfont icon-bianji',
    children: [
      {
        id: '101',
        module: 'Home_Principle',
        url: '/guid/principle',
        label: '原则',
        icon: 'hf-iconfont icon-bianji'
      }
    ]
  },

  {
    id: '2',
    module: 'Components',
    url: '/components',
    label: '组件',
    icon: 'hf-iconfont icon-chakuaidi',
    children: [
      {
        id: '201',
        module: 'Components_Bsic',
        url: '/components/basic',
        label: '基础',
        icon: 'hf-iconfont icon-chakuaidi',
        children: [
          {
            id: '201001',
            module: 'Components_Bsic_Layout',
            url: '/components/basic',
            label: '布局',
            icon: 'hf-iconfont icon-chakuaidi',
          },

          {
            id: '201002',
            module: 'Components_Bsic_Grid',
            url: '/components/grid',
            label: '栅格',
            icon: 'hf-iconfont icon-chakuaidi',
          }
        ]
      },

      {
        id: '202',
        module: 'Components_Navigation',
        url: '/components/navigation',
        label: '导航',
        icon: 'hf-iconfont icon-chakuaidi',
        children: [
          {
            id: '202001',
            module: 'Components_Navigation_Menu',
            url: '/components/navigation/menu',
            label: '导航',
            icon: 'hf-iconfont icon-chakuaidi',
          },
          {
            id: '202002',
            module: 'Components_Navigation_Breadcrumb',
            url: '/components/navigation/breadcrumb',
            label: '面包屑',
            icon: 'hf-iconfont icon-chakuaidi',
          },
          {
            id: '202003',
            module: 'Components_Navigation_Tab',
            url: '/components/navigation/Tab',
            label: '标签页',
            icon: 'hf-iconfont icon-chakuaidi',
          }
        ]
      },

      {
        id: '203',
        module: 'Components_Data',
        url: '/components/data',
        label: '数据录入',
        icon: 'hf-iconfont icon-chakuaidi'
      }
    ]
  },
  
  {
    id: 3,
    module: 'Theme',
    url: '/theme',
    label: '资源',
    icon: 'hf-iconfont icon-chakuaidi'
  }
]
