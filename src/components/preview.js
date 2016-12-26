import Vue from 'vue/dist/vue.common'

export default {
  name: 'preview',

  props: ['value'],

  render (h) {
    return h('div')
  },

  mounted () {
    this.$watch('value', this.renderCode, { immediate: true })
  },

  methods: {
    renderCode (val) {
      if (this.codeVM) {
        this.codeVM.$destroy()
        this.$el.removeChild(this.codeVM.$el)
      }

      this.codeEl = document.createElement('div')
      this.$el.appendChild(this.codeEl)
      try {
        this.codeVM = new Vue(val).$mount(this.codeEl)
      } catch (e) {
        this.$emit('error', e)
      }
    }
  }
}
