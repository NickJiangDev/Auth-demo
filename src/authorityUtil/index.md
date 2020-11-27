---
title: Authorized
subtitle: 权限
cols: 1
order: 15
---

权限组件，通过比对现有权限与准入权限，决定相关元素的展示。

## API

### Authorized

最基础的权限控制。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 正常渲染的元素，权限判断通过时展示 | ReactNode | - |
| authority | 准入权限/权限判断 | `string | array | Promise | (currentAuthority) => boolean | Promise` | - |
| noMatch | 权限异常渲染元素，权限判断不通过时展示 | ReactNode | - |
| allowCheck | 允许检查权限的判断 | boolean | - |

### Authorized.Secured

注解方式，`@Authorized.Secured(authority, error)`

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| authority | 准入权限/权限判断 | `string | Promise | (currentAuthority) => boolean | Promise` | - |
| error | 权限异常时渲染元素 | ReactNode | <Exception type="403" /> |
| allowCheck | 允许检查权限的判断 | boolean | - |

### Authorized.check

函数形式的 Authorized，用于某些不能被 HOC 包裹的组件。 `Authorized.check(authority, target, Exception)` 注意：传入一个 Promise 时，无论正确还是错误返回的都是一个 ReactClass。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| authority | 准入权限/权限判断 | `string | Promise | (currentAuthority) => boolean | Promise` | - |
| target | 权限判断通过时渲染的元素 | ReactNode | - |
| Exception | 权限异常时渲染元素 | ReactNode | - |
| allowCheck | 允许检查权限的判断 | boolean | - |

### Authorized.hasPermission

check 函数的语法糖，准入权限命中状态通过 boolean 返回。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| authority | 准入权限/权限判断 | `string | Promise | (currentAuthority) => boolean | Promise` | - |
| allowCheck | 允许检查权限的判断 | boolean | - |

### Authorized.hasEveryPermission

check 函数的语法糖，检查每一项准入权限命中状态，如全通过则返回 true，否则返回 false。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| authority | 准入权限/权限判断 | `string | Promise | (currentAuthority) => boolean | Promise` | - |
| allowCheck | 允许检查权限的判断 | boolean | - |

### getAuthority

获取当前用户的权限集合

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |


### setAuthority

设置当前用户的权限

| 参数      | 说明              | 类型       | 默认值 |
| --------- | ----------------- | ---------- | ------ |
| authority | 准入权限/权限判断 | `string[]` | -      |

### removeAuthority

移除用户权限

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |


### reloadAuthorized

重新渲染权限的实例（当用户的权限变化时）

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |


## demo

### 基本使用

```jsx
import Authorized, { PREVILEGES } from '@/modules/__private__/utils/authorityUtil';
import { Alert } from 'antd';

const noMatch = <Alert message="No permission." type="error" showIcon />;

ReactDOM.render(
  <Authorized authority={[PREVILEGES.editMobileMaterial]} noMatch={noMatch}>
    <Alert message="user Passed!" type="success" showIcon />
  </Authorized>,
);
```

### basic Array (这里命中一个则判断为权限通过)

```jsx
import Authorized, { PREVILEGES } from '@/modules/__private__/utils/authorityUtil';
import { Alert } from 'antd';

const noMatch = <Alert message="No permission." type="error" showIcon />;

ReactDOM.render(
  <Authorized authority={[PREVILEGES.editMobileMaterial, PREVILEGES.deleteRole]} noMatch={noMatch}>
    <Alert message="user Passed!" type="success" showIcon />
  </Authorized>,
);
```

### 装饰器

```jsx
import Authorized, { PREVILEGES } from '@/modules/__private__/utils/authorityUtil';
import { Alert } from 'antd';

const { Secured } = Authorized;

@Secured(PREVILEGES.menusDataCenter)
class TestSecuredString extends React.Component {
  render() {
    return <Alert message="user Passed!" type="success" showIcon />;
  }
}
ReactDOM.render(
  <div>
    <TestSecuredString />
  </div>,
  mountNode,
);
```

### 函数

```jsx
import Authorized, { PREVILEGES } from '@/modules/__private__/utils/authorityUtil';
import { Alert } from 'antd';

const { check } = Authorized.check;

const target = <Alert message="user Passed!" type="success" showIcon />;
const noMatch = <Alert message="No permission." type="error" showIcon />;

function getResult() {
  check(PREVILEGES.menusDataCenter, target, noMatch);
}

getResult();
```

### 函数语法糖

```jsx
import Authorized, { PREVILEGES } from '@/modules/__private__/utils/authorityUtil';

const { hasPermission } = Authorized.hasPermission;

// return boolean;
hasPermission(PREVILEGES.menusDataCenter);
```

### 检查所有命中的权限

```jsx
import Authorized, { PREVILEGES } from '@/modules/__private__/utils/authorityUtil';

const { hasEveryPermission } = Authorized.hasEveryPermission;

// return boolean;
hasPermission([PREVILEGES.menusDataCenter, PREVILEGES.editMobileMaterial]);
```

### FAQ

- allowCheck 属性存在的意义：
  - 前置类型检查：当你的权限由多个成分组成，在每一个成分的值确定前，权限是不能命中的，此时可以将 allowCheck 作为类似 loading 属性的用法，即：

```jsx
const loading = apiLoading && isResourceAuth as boolean;
<Authorized authority={PREVILEGES.editMobileMaterial} allowCheck={loading}>
  xxxx
</Authorized>
```

- debug 调试：当你不想破坏原有的组件写法，只是暂时性的想要禁用权限时
- 不会破坏结构：无论是作为组件属性，还是作为函数参数，永远都是可选项，且 allowCheck=false 时，不会继续进行脚本检查，造成内存浪费
