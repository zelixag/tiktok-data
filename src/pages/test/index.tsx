import * as React from "react";
import PropTypes from "prop-types";

type DemoProps = {
  message: string;
};

type Demo1Props = {};

const Demo: React.FunctionComponent<DemoProps> = ({ message, children }) => (
  <div>
    {message}
    {children}
  </div>
);
// const Demo1: React.PropsWithChildren<DemoProps>;
const Test: React.FunctionComponent<DemoProps> = () => {
  const ref1 = React.useRef<HTMLInputElement>(null);
  const ref2 = React.useRef<HTMLInputElement | null>(null);
  return (
    <div>
      <Demo message="搞搞细心" children={<div>这是什么</div>}></Demo>
    </div>
  );
};

Demo.displayName = "Demo-------";
Demo.propTypes = {
  message: PropTypes.string.isRequired,
};
Demo.defaultProps = {
  message: "dshsjka",
};
console.log(Demo.defaultProps);

interface Animal {
  /**动物颜色 */
  color: string;
}

interface Animal {
  /** 动物名字 */
  name: string;
}
class Tiger implements Animal {
  color = "黄白色";
  name = "老虎";
}

const tiger = new Tiger();
console.log(tiger);
export default Test;
