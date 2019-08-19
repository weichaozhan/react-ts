const buildNavRelation = (): Array<IMenuItem> => {
  const navList: Array<IMenuItem> = [
    {
      navId: '0',
      name: '测试',
      icon: 'appstore',
      link: '/a',
      children: [],
    },
    {
      navId: '1',
      name: '测试2',
      icon: 'appstore',
      link: '/b',
    },
    {
      navId: '2',
      name: '测试',
      icon: 'appstore',
      children: [
        {
          navId: '2-1',
          name: '测试3',
          icon: 'appstore',
          link: '/f',
        },
      ],
    },
  ];
  /**
   * @description 构建父子关系
   * @param {Array} list 列表
   * @param {Array} parents 祖先列表
   */
  const buildList = (list: Array<IMenuItem>, parents: Array<IMenuItem>) => {
    for (let i = 0; i < list.length; i++) {
      list[i].parents = parents;

      if (list[i].children && (list[i].children as Array<IMenuItem>).length > 0) {
        buildList((list[i].children as Array<IMenuItem>), [...parents, list[i]]);
      }
    }
  };
  
  buildList(navList, []);
  return navList;
};

export default buildNavRelation();