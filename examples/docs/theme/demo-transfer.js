import template from './demo-transfer-tmp.html'

export default {
  template,
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${ i }`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      data: generateData(),
      value: [1, 4],
      titles: ['备选列表', '已选列表'],
      visible: false,
      labels: [],
      input2: []
    };
  }
};
