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
  const colorArr = []
  const prefix = 'mainClor-'
  const labels = {
    'clr_main01': '页面中主元素使用颜色',
    'clr_main02': '用于hover状态使用颜色',
    'clr_main03': '可用于次一级主色调部分',
    'clr_main04': '可用于active或visited'
  }
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

export const getSubColors = (colors) => {
  const colorArr = []
  const prefix = 'subColor-'
  const labels = {
    'clr_sub_color': '页面中主元素使用颜色',
    'clr_success': '用于hover状态使用颜色',
    'clr_warning': '可用于次一级主色调部分',
    'clr_error': '可用于active或visited'
  }
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

export const getNormalColors = (colors) => {
  const colorArr = []
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
    'clr_projection': '投影'
  }
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