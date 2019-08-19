interface Window {
  __webpack_require__: any;
}

interface IMenuItem {
  navId: string;
  name: string;
  icon: string;
  link?: string;
  parents?: Array<IMenuItem>;
  children?: Array<IMenuItem>;
}
