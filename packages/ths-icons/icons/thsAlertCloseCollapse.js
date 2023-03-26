exports.default = {
  name: 'svg',
  type: 'element',
  value: '',
  attributes: { fill: 'none', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 10 6' },
  children: [
    {
      name: 'path',
      type: 'element',
      value: '',
      attributes: {
        d: 'M1 5L5 1L9 5',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      },
      children: [],
    },
  ],
  _name: 'alert-close-collapse',
};
