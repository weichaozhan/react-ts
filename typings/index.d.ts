import './source';
import './router/index';
import './components/index';

declare global {
  interface Window { __webpack_require__: any; }
}