interface Window {
  __webpack_require__: any;
}

interface IMenuItem {
  navId: string;
  name: string;
  icon: string;
  link?: string;
  children?: Array<IMenuItem>;
}
