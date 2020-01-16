export default [
  {
    id: '0',
    module: 'Guide',
    label: '指南',
    icon: 'hf-iconfont icon-bianji',
    path: '/guide/principle',
    children: [
      {
        id: '0_0',
        module: 'Guide_Principle',
        path: '/guide/principle',
        label: '原则',
        icon: 'hf-iconfont icon-bianji',
        component: 'Principle'
      }
    ]
  },

  {
    id: '1',
    module: 'Components',
    label: '组件',
    icon: 'hf-iconfont icon-chakuaidi',
    path: '/components/basic/globalSpacing',
    children: [
      {
        id: '1_0',
        module: 'Components_Basic',
        label: '基础 Basic',
        icon: 'hf-iconfont icon-chakuaidi',
        children: [
          {
            id: '1_0_0',
            module: 'Components_Basic_GlobalSpacing',
            path: '/components/basic/globalSpacing',
            label: '全局间距 GlobalSpacing',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'GlobalSpacing',
            next: '1_0_1'
          },

          {
            id: '1_0_1',
            module: 'Components_Basic_Color',
            path: '/components/basic/color',
            label: '色彩 Color',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Color',
            next: '1_0_2',
            prev: '1_0_0'
          },

          {
            id: '1_0_2',
            module: 'Components_Basic_Font',
            path: '/components/basic/Font',
            label: '文字 Font',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Font',
            next: '1_0_3',
            prev: '1_0_1'
          },

          {
            id: '1_0_3',
            module: 'Components_Basic_Layout',
            path: '/components/basic/layout',
            label: '布局 Layout',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Layout',
            next: '1_0_4',
            prev: '1_0_2'
          },

          {
            id: '1_0_4',
            module: 'Components_Basic_Grid',
            path: '/components/basic/grid',
            label: '栅格 Grid',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Grid',
            next: '1_0_5',
            prev: '1_0_3'
          },

          {
            id: '1_0_5',
            module: 'Components_Basic_Button',
            path: '/components/basic/button',
            label: '按钮 Button',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Button',
            next: '1_0_6',
            prev: '1_0_4'
          },

          {
            id: '1_0_6',
            module: 'Components_Bsic_Icon',
            path: '/components/basic/icon',
            label: '图标 Icon',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Icon',
            next: '1_1_0',
            prev: '1_0_5'
          },
        ]
      },

      {
        id: '1_1',
        module: 'Components_Navigation',
        label: '导航 Navigation',
        icon: 'hf-iconfont icon-chakuaidi',
        children: [
          {
            id: '1_1_0',
            module: 'Components_Navigation_Menu',
            path: '/components/navigation/menu',
            label: '导航菜单 Menu',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Menu',
            next: '1_1_1',
            prev: '1_0_6'
          },
          {
            id: '1_1_1',
            module: 'Components_Navigation_Breadcrumb',
            path: '/components/navigation/breadcrumb',
            label: '面包屑 Breadcrumb',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Breadcrumb',
            next: '1_1_2',
            prev: '1_1_0'
          },
          {
            id: '1_1_2',
            module: 'Components_Navigation_Tab',
            path: '/components/navigation/Tab',
            label: '标签页 Tabs',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Tab',
            next: '1_1_3',
            prev: '1_1_1'
          },
          {
            id: '1_1_3',
            module: 'Components_Navigation_Pagination',
            path: '/components/navigation/Pagination',
            label: '分页 Pagination',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Pagination',
            next: '1_1_4',
            prev: '1_1_2'
          },
          {
            id: '1_1_4',
            module: 'Components_Navigation_Dropdown',
            path: '/components/navigation/Dropdown',
            label: '下拉菜单 Dropdown',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Dropdown',
            next: '1_2_0',
            prev: '1_1_3'
          },
        ]
      },

      {
        id: '1_2',
        module: 'Components_Data',
        label: '数据录入 DataEntry',
        icon: 'hf-iconfont icon-chakuaidi',
        children: [
          {
            id: '1_2_0',
            module: 'Components_Data_Radio',
            path: '/components/data/radio',
            label: '单选框 Radio',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Radio',
            next: '1_2_1',
            prev: '1_1_4'
          },
          {
            id: '1_2_1',
            module: 'Components_Data_CheckBox',
            path: '/components/data/checkbox',
            label: '复选框 Checkbox',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Checkbox',
            next: '1_2_2',
            prev: '1_2_0'
          },
          {
            id: '1_2_2',
            module: 'Components_Data_Switch',
            path: '/components/data/switch',
            label: '开关 Switch',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Switch',
            next: '1_2_3',
            prev: '1_2_1'
          },
          {
            id: '1_2_3',
            module: 'Components_Data_Form',
            path: '/components/data/form',
            label: '表单 Form',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Form',
            next: '1_2_4',
            prev: '1_2_2'
          },
          {
            id: '1_2_4',
            module: 'Components_Data_Input',
            path: '/components/data/input',
            label: '输入框 Input',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Input',
            next: '1_2_5',
            prev: '1_2_3'
          },
          {
            id: '1_2_5',
            module: 'Components_Data_Transfer',
            path: '/components/data/transfer',
            label: '穿梭框 Transfer',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Transfer',
            next: '1_3_0',
            prev: '1_2_4'
          }
        ]
      },

      {
        id: '1_3',
        module: 'Components_Display',
        label: '数据展示 DataDisplay',
        icon: 'hf-iconfont icon-chakuaidi',
        children: [
          {
            id: '1_3_0',
            module: 'Components_Display_Carousel',
            path: '/components/display/carousel',
            label: '走马灯 Carousel',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Carousel',
            next: '1_4_0',
            prev: '1_2_0'
          },
          {
            id: '1_3_1',
            module: 'Components_Display_Table',
            path: '/components/display/Table',
            label: '表格 Table',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Table',
            next: '1_4_0',
            prev: '1_2_5'
          }
        ]
      },

      {
        id: '1_4',
        module: 'Components_Feedback',
        label: '操作反馈 Feedback',
        icon: 'hf-iconfont icon-chakuaidi',
        children: [
          {
            id: '1_4_0',
            module: 'Components_Feedback_Loading',
            path: '/components/Feedback/Spin',
            label: '加载中 Spin',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Loading',
            next: '1_4_1',
            prev: '1_3_0'
          },
          {
            id: '1_4_1',
            module: 'Components_Feedback_Poptip',
            path: '/components/Feedback/Poptip',
            label: '气泡提示 Poptip',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'PopTip',
            next: '1_4_2',
            prev: '1_4_0'
          },

          {
            id: '1_4_2',
            module: 'Components_Feedback_Tree',
            path: '/components/Feedback/Tree',
            label: '树形控件 Tree',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Tree',
            next: '1_5_0',
            prev: '1_4_1'
          }
        ]
      },

      {
        id: '1_5',
        module: 'Components_Other',
        label: '其他 Other',
        icon: 'hf-iconfont icon-chakuaidi',
        children: [
          {
            id: '1_5_0',
            module: 'Components_Other_Backtop',
            path: '/components/other/Backtop',
            label: '回到顶部 BackTop',
            icon: 'hf-iconfont icon-chakuaidi',
            component: 'Backtop',
            // next: '1_4_1',
            prev: '1_4_1'
          }
        ]
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
