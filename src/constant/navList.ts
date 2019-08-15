let navList: Array<IMenuItem> = [
  {
    navId: '0',
    name: '文本',
    icon: 'book',
    link: '',
    children: [
      {
        navId: '0-0',
        name: '实体标注',
        icon: 'windows',
        link: '/project/entity',
        children: [],
      },
      {
        navId: '0-1',
        name: '分类标注',
        icon: 'bulb',
        link: '/project/classification',
        children: [],
      }
    ],
  },
];

export default navList;