export default {
  props: {
    node: {
      required: true
    }
  },
  render(h) {
    const parent = this.$parent;
    const tree = parent.tree;
    const node = this.node;
    const { data, store } = node;
    const defaultNodeHtml = (<span class={this.cfg.prefix + '-tree-node__label'}>{ node.label }</span>)
    const treeDefault = tree.$scopedSlots.default ? tree.$scopedSlots.default({ node, data }) : defaultNodeHtml
    const parentDefault = parent.renderContent ? parent.renderContent.call(parent._renderProxy, h, { _self: tree.$vnode.context, node, data, store }) : null

    return parentDefault || treeDefault;
  }
}
