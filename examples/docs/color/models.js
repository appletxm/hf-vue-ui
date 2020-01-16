import { hex2rgb } from 'utils/hex2rgb'

const needOpacityColor = ['clr_menu_top_projection', 'clr_mask']

export const darkFonts = ['#DDDDDD', '#EEEEEE', '#F6F6F6', '#F8F8F8', '#FFFFFF']

function getShowColor(color) {
  let colorStr

  colorStr = color.replace('#', '')
  if (colorStr.length === 3) {
    colorStr = colorStr.replace(/^(.)(.)(.)$/, ($1, $2, $3, $4) => {
      return $2.toUpperCase() + $2.toUpperCase() + $3.toUpperCase() + $3.toUpperCase() + $4.toUpperCase() + $4.toUpperCase()
    })
  }

  return ('#' + colorStr).toUpperCase()
}

function getRealColorArrays(colors, prefix, labels) {
  const colorArr = []
  Object.keys(colors).forEach ((colorKey) => {
    if (colorKey.indexOf(prefix) >= 0) {
      const prefixKey = colorKey.replace(prefix, '')
      colorArr.push({
        key: prefixKey,
        color: colors[colorKey],
        label: labels[prefixKey]
      })
    }
  })

  return colorArr
}

export const getColorsForColorPanel = (colors) => {
  const colorArr = []
  const prefix = 'colorPanel-'
  Object.keys(colors).forEach ((colorKey) => {
    if (colorKey.indexOf(prefix) >= 0) {
      colorArr.push(colors[colorKey])
    }
  })

  return colorArr
}

export const getMainColors = (colors) => {
  const prefix = 'mainClor-'
  const labels = {
    'clr_main01': '页面中主元素使用颜色',
    'clr_main02': '用于hover状态使用颜色',
    'clr_main03': '可用于次一级主色调部分',
    'clr_main04': '可用于active或visited'
  }
  
  return getRealColorArrays(colors, prefix, labels)
}

export const getSubColors = (colors) => {
  const prefix = 'subColor-'
  const labels = {
    'clr_sub_color': '页面中主元素使用颜色',
    'clr_success': '用于hover状态使用颜色',
    'clr_warning': '可用于次一级主色调部分',
    'clr_error': '可用于active或visited'
  }
  return getRealColorArrays(colors, prefix, labels)
}

export const getNormalColors = (colors) => {
  const prefix = 'normalColor-'
  const labels = {
    'clr_font_title': '页面标题',
    'clr_font_text': '正文',
    'clr_font_describe': '内容描述',
    'clr_font_tips': '提示、不可编辑表单文字',
    'clr_font_btn01': '主按钮字体色',
    'clr_font_btn2': '辅助按钮字体色',
    'clr_divider': '分割线',
    'clr_border': '边框、多用于表单',
    'clr_icon': '辅助及图标',
    'clr_uneditable': '不可编辑底色',
    'clr_bg_page': '页面背景色',
    'clr_bg_content': '内容背景色',
    'clr_mask': '遮罩层',
    'clr_projection': '投影',
    'clr_btn_main_left': '主要按钮背景渐变色(左)',
    'clr_btn_main_right': '主要按钮背景渐变色(右)'
  }
  return getRealColorArrays(colors, prefix, labels)
}

// export const getMenuColors = (colors) => {
//   const prefix = 'menuColor-'
//   const labels = {
//     'clr_menu_top_a': '顶部导航菜单选中状态文字、线条颜色',
//     'clr_menu_top_h': '顶部导航菜单hover状态文字颜色',
//     'clr_menu_top_n': '顶部导航菜单默认状态文字颜色',
//     'clr_menu_top_bg': '顶部导航菜单背景色',
//     'clr_menu_top_projection': '顶部导航菜单投影',
//     'menu_main01': '主色调1，多用于选中',
//     'menu_main02': '主色调2，多用于悬浮',
//     'menu_font01': '多用于选中状态文字或字体图标',
//     'menu_font02': '多用于默认文字或字体图标',
//     'menu_nav_bg': '一级菜单背景',
//     'menu_subnav_bg': '子级菜单背景',
//     'menu_line': '菜单导航分割线',
//     'menu_fold': '用于底部折叠按钮'
//   }
//   return getRealColorArrays(colors, prefix, labels)
// }

export const getSideMenuColors = (colors) => {
  const prefix = 'menuSideColor-'
  const labels = {
    'clr_menu_main01': '主色调1，多用于选中',
    'clr_menu_main02': '主色调2，多用于悬浮',
    'clr_menu_font01': '用于选中状态文字或字体图标',
    'clr_menu_font02': '用于默认文字或字体图标',
    'clr_menu_nav_bg': '一级菜单背景',
    'clr_menu_subnav_bg': '子级菜单背景',
    'clr_menu_line': '菜单导航分割线',
    'clr_menu_fold': '用于底部折叠按钮'
  }
  return getRealColorArrays(colors, prefix, labels)
}

export const getTopMenuColor = (colors) => {
  const prefix = 'menuTopColor-'
  const labels = {
    'clr_menu_top_a': '选中状态',
    'clr_menu_top_h': 'Hover状态',
    'clr_menu_top_n': '默认状态',
    'clr_menu_top_bg': '导航背景',
    'clr_menu_top_projection': '导航投影'
  }
  return getRealColorArrays(colors, prefix, labels)
}

export const getColorPanelMap = (colors) => {
  const colorArr = []
  const prefix = 'colorPanel-'
  Object.keys(colors).forEach ((colorKey) => {
    const prefixKey = colorKey.replace(prefix, '')
    if (colorKey.indexOf(prefix) >= 0) {
      colorArr.push({
        key: prefixKey,
        color: colors[colorKey]
      })
    }
  })
  
  return colorArr
}

export const parseGlobals = (colors) => {
  const keys = Object.keys(colors)
  keys.forEach(key => {
    let val = colors[key]
    if (val.indexOf('#') >= 0) {
      colors[key] = getShowColor(colors[key])
    }
  })

  return colors
}

export const isInDarkFontList = (color) => {
  return darkFonts.indexOf(color) >= 0
}

export const getRegbaColor = (key, color, opacity) => {
  let styles = {backgroundColor: color}
  if (needOpacityColor.indexOf(key) >= 0) {
    const { rgb } = hex2rgb(color)
    styles = {backgroundColor: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`}
  }
  return styles
}

export const getNormalColorOpacity = (key) => {
  if (key === 'clr_mask') {
    return 0.7
  } else if (key === 'clr_menu_top_projection') {
    return 0.05
  } else {
    return 1
  }
}
