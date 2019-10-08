const mdContainer = require('markdown-it-container');

module.exports = md => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : '';
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
        return `<demo-block>
        ${description ? `<div>${md.render(description)}</div>` : ''}
        <!--element-demo: ${content}:element-demo-->
        `;
      }
      return '</demo-block>';
    }
  });

  // md.use(mdContainer, 'doc-layout-left', {
  //   validate(params) {
  //     return params.trim().match(/^doc-layout-left\s*(.*)$/);
  //   },
  //   render(tokens, idx) {
  //     const key = 'doc-layout-left'
  //     if (tokens[idx]['type'] === `container_${key}_open`) {
  //       const desc = tokens[idx]['info']
  //       return `<div class="${key}" ${desc}>`
  //     } else if (tokens[idx]['type'] === `container_${key}_close`) {
  //       return '</div>'
  //     }
  //   }
  // });

  md.use(mdContainer, 'tip');
  md.use(mdContainer, 'warning');
  md.use(mdContainer, 'danger');
};
