import React from 'react';
import { Link, } from 'react-router-dom';
import { Menu, Icon, } from 'antd';

import styles from './nav.module.less';

import NAV_LIST from '../../constant/navList';

const { SubMenu, Item: MenuItem } = Menu;

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      menuList: [],
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.openMenuSlectedLoaded();
  }

  componentWillReceiveProps(nextProps) {
    // 页面跳转实现菜单激活
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.openMenuSlectedLoaded();
    }
    this.buildMenu(nextProps.menu.menuList);
  }

  buildMenu(menuList) {
    this.setState({
      menuList,
    });
  }

  /**
   * @description 创建子菜单
   */
  createMenuItems(menuItem, index) {
    return (
      (menuItem.children && menuItem.children.length) === 0 ?
        (<MenuItem key={menuItem.navId || index + ''}>
          <Link to={menuItem.link}>
            <Icon type={menuItem.icon} />
            <span>{menuItem.name}</span>
          </Link>
        </MenuItem>)
        :
        (<SubMenu key={menuItem.navId || index + ''} title={
          <span>
            <Icon type={menuItem.icon} />
            <span>{menuItem.name}</span>
          </span>
        }>
          {
            menuItem.children.map((item, subIndex) => this.createMenuItems(item, `${index}-${subIndex}`))
          }
        </SubMenu>)
    );
  }

  /**
   * @description app 加载刷新打开对应菜单
   */
  openMenuSlectedLoaded() {
    const currentPath = this.props.history.location.pathname;
    const buildList = (list) => {
      for (let i = 0; i < list.length; i ++) {
        const item = list[i];

        if (item.children.length > 0) {
          buildList(item.children);
        } else {
          if (currentPath.indexOf(item.link) > -1) {
            this.props.setSelectedMenu(item);
            break;
          }
        }
      }
    };
    
    buildList(NAV_LIST);
  }

  handleSelect(item) {
    this.props.setSelectedMenu(item.key);
  }

  render() {
    const {
      menuSelected,
    } = this.props.menu;
    const {
      menuList,
    } = this.state;
    const menuSelectedSure = menuSelected && menuSelected.parents;
    
    return (
      <div>
        <Menu 
          className={styles['side-navigation']}
          selectedKeys={menuSelectedSure ? [menuSelected.navId] : []} 
          defaultOpenKeys={menuSelectedSure ? menuSelected.parents.map(item => item.navId) : []}
          mode="inline" 
          theme="dark"
          onSelect={this.handleSelect} >
          {
            this.state.menuList.map((item, index) => this.createMenuItems(item, index))
          }
        </Menu>
      </div>
    );
  }
}

/**
 * @description action 作为 props 绑定
 * @param {Function} dispatch dispatch
 */
const mapDispatchToProps = (
  dispatch, 
  // ownProps,
) => {
  return {
    setSelectedMenu: (...args) => dispatch(menuAction.setSelectedMenu(...args)),
  };
};

/**
 * @description 绑定 store 到props
 * @param {Object} state store 
 */
const mapStateToProps = (
  state, 
  // ownProps
) => {
  return {
    ...state,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));