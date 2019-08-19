import React from 'react';
import { connect, } from 'react-redux';
import { Link, withRouter, } from 'react-router-dom';
import { Menu, Icon, } from 'antd';

import styles from './nav.module.less';

import * as menuAction from '../../store/actions/menuAction';

import NAV_LIST from '../../constant/navList';

const { SubMenu, Item: MenuItem } = Menu;

class Nav extends React.Component<any, any> {
  public static getDerivedStateFromProps(nextProps: any, nextState: any) {
    return { ...nextState, menuList: nextProps.menu.menuList, };
  }

  public constructor(props: any) {
    super(props);
    this.state = {
      menuOpeninit: false,
      menuList: [],
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  public componentDidUpdate(preProps: any, preState: any) {
    if (preState.menuList !== this.state.menuList) {
      this.openMenuSlectedLoaded();
    }
  }

  /**
   * @description 创建子菜单
   */
  public createMenuItems(menuItem: IMenuItem, index: number | string) {
    return (
      (!menuItem.children || menuItem.children.length === 0) ?
        (<MenuItem key={menuItem.navId || `${index}`}>
          <Link to={menuItem.link as string}>
            <Icon type={menuItem.icon} />
            <span>{menuItem.name}</span>
          </Link>
        </MenuItem>)
        :
        (<SubMenu key={menuItem.navId || `${index}`} title={
          <span>
            <Icon type={menuItem.icon} />
            <span>{menuItem.name}</span>
          </span>
        }>
          {
            (menuItem.children as Array<IMenuItem>).map((item, subIndex) => this.createMenuItems(item, `${index}-${subIndex}`))
          }
        </SubMenu>)
    );
  }

  /**
   * @description app 加载刷新打开对应菜单
   */
  public openMenuSlectedLoaded() {
    const currentPath = this.props.history.location.pathname;
    const buildList = (list: Array<IMenuItem>) => {
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const itemChildren = item.children as Array<IMenuItem> || [];

        if (itemChildren.length > 0) {
          buildList(itemChildren as Array<IMenuItem>);
        } else {
          if (currentPath.indexOf(item.link as string) > -1) {
            this.props.setSelectedMenu(item);
            break;
          }
        }
      }
    };
    
    buildList(NAV_LIST);
    this.setState({
      menuOpeninit: true,
    });
  }

  public handleSelect(item: any) {
    this.props.setSelectedMenu(item.key);
  }

  public render() {
    const {
      menuSelected,
    } = this.props.menu;
    const {
      menuList,
      menuOpeninit,
    } = this.state;
    const menuSelectedSure = menuSelected && (menuSelected as IMenuItem).parents;

    return (
      <div>
        {(menuList.length && menuOpeninit) &&
          <Menu
            className={styles['side-navigation']}
            selectedKeys={menuSelectedSure ? [(menuSelected as IMenuItem).navId] : []}
            defaultOpenKeys={menuSelectedSure ? ((menuSelected as IMenuItem).parents as Array<IMenuItem>).map(item => item.navId) : []}
            mode="inline"
            theme="dark"
            onSelect={this.handleSelect} >
            {
              menuList.map((item: IMenuItem, index: number) => this.createMenuItems(item, index))
            }
          </Menu>}
      </div>
    );
  }
}

/**
 * @description action 作为 props 绑定
 * @param {Function} dispatch dispatch
 */
const mapDispatchToProps = (dispatch: Function,) => {
  return {
    setSelectedMenu: (menuSelected: IMenuItem | string) => dispatch(menuAction.setSelectedMenu(menuSelected)),
  };
};

/**
 * @description 绑定 store 到props
 * @param {Object} state store
 */
const mapStateToProps = (state: any,) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(withRouter(Nav));