import React, { useState, useEffect, } from 'react';
import { connect, } from 'react-redux';
import { withRouter, } from 'react-router';
import { Button, } from 'antd';

function useCustom(i: any) {
  const [cus, setCus] = useState(null);

  useEffect(() => {
    setCus(i + 1);
    console.log('cus', cus);
  }, [i]);
  
  return cus;
}

function Example(props: any) {
  const [count, setCount] = useState(0);

  let i = useCustom(count);

  useEffect(() => {
    console.log('inner');
  });
  useEffect(() => {
    // console.log('i', i);
    // document.title = `${count}`;

    return () => {
      console.log(props.history.location.pathname, '销毁');
    };
  }, []);
  return (
    <div>
      <p>You click {count} times</p>
      <Button onClick={() => {
        if (count !== 5) {
          setCount(count + 1);
        } else {
          setCount(5);
        }
      }} >Click me</Button>
    </div>
  );
}

/**
 * @description 绑定 store 到props
 * @param {Object} state store
 */
const mapStateToProps = (state: any,) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(withRouter(Example));