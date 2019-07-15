演示地址：https://nailuox.github.io/react-demo

## 技术栈：

react + react router + react redux + redux thunk + less

## 运行项目（nodejs 6.0+）

```
 git clone https://github.com/nailuox/react-demo.git

 cd react-demo

 npm i  或者运行  yarn(推荐)

 npm start

 npm run build （发布）
```

## 说明

> 本项目主要用于理解 react 技术栈中技术要点

## 做 React 需要会什么？

react 的功能其实很单一，主要负责渲染的功能，现有的框架，比如 angular 是一个大而全的框架，用了 angular 几乎就不需要用其他工具辅助配合，但是 react 不一样，他只负责 ui 渲染，想要做好一个项目，往往需要其他库和工具的配合，比如用 redux 来管理数据，react-router 管理路由，react 已经全面拥抱 es6，所以 es6 也得掌握，webpack 就算是不会配置也要会用，要想提高性能，需要按需加载，immutable.js 也得用上，还有单元测试。。。。

## React 是什么

用脚本进行 DOM 操作的代价很昂贵。有个贴切的比喻，把 DOM 和 JavaScript 各自想象为一个岛屿，它们之间用收费桥梁连接，js 每次访问 DOM，都要途径这座桥，并交纳“过桥费”,访问 DOM 的次数越多，费用也就越高。 因此，推荐的做法是尽量减少过桥的次数，努力待在 ECMAScript 岛上。因为这个原因 react 的虚拟 dom 就显得难能可贵了，它创造了虚拟 dom 并且将它们储存起来，每当状态发生变化的时候就会创造新的虚拟节点和以前的进行对比，让变化的部分进行渲染。整个过程没有对 dom 进行获取和操作，只有一个渲染的过程，所以 react 说是一个 ui 框架。

## React 的组件化

react 的一个组件很明显的由 dom 视图和 state 数据组成，两个部分泾渭分明。state 是数据中心，它的状态决定着视图的状态。这时候发现似乎和我们一直推崇的 MVC 开发模式有点区别，没了 Controller 控制器，那用户交互怎么处理，数据变化谁来管理？然而这并不是 react 所要关心的事情，它只负责 ui 的渲染。与其他框架监听数据动态改变 dom 不同，react 采用 setState 来控制视图的更新。setState 会自动调用 render 函数，触发视图的重新渲染，如果仅仅只是 state 数据的变化而没有调用 setState，并不会触发更新。 组件就是拥有独立功能的视图模块，许多小的组件组成一个大的组件，整个页面就是由一个个组件组合而成。它的好处是利于重复利用和维护。

## React 的 Diff 算法

react 的 diff 算法用在什么地方呢？当组件更新的时候，react 会创建一个新的虚拟 dom 树并且会和之前储存的 dom 树进行比较，这个比较多过程就用到了 diff 算法，所以组件初始化的时候是用不到的。react 提出了一种假设，相同的节点具有类似的结构，而不同的节点具有不同的结构。在这种假设之上进行逐层的比较，如果发现对应的节点是不同的，那就直接删除旧的节点以及它所包含的所有子节点然后替换成新的节点。如果是相同的节点，则只进行属性的更改。

对于列表的 diff 算法稍有不同，因为列表通常具有相同的结构，在对列表节点进行删除，插入，排序的时候，单个节点的整体操作远比一个个对比一个个替换要好得多，所以在创建列表的时候需要设置 key 值，这样 react 才能分清谁是谁。当然不写 key 值也可以，但这样通常会报出警告，通知我们加上 key 值以提高 react 的性能。

## React 组件是怎么来的

组件的创造方法为 React.createClass() ——创造一个类，react 系统内部设计了一套类系统，利用它来创造 react 组件。但这并不是必须的，我们还可以用 es6 的 class 类来创造组件,这也是 Facebook 官方推荐的写法。

![](https://raw.githubusercontent.com/nailuox/react-demo/master/screenshot/icon_class.png)

这两种写法实现的功能一样但是原理却是不同，es6 的 class 类可以看作是构造函数的一个语法糖，可以把它当成构造函数来看，extends 实现了类之间的继承 —— 定义一个类 Main 继承 React.Component 所有的属性和方法，组件的生命周期函数就是从这来的。constructor 是构造器，在实例化对象时调用，super 调用了父类的 constructor 创造了父类的实例对象 this，然后用子类的构造函数进行修改。这和 es5 的原型继承是不同的，原型继承是先创造一个实例化对象 this，然后再继承父级的原型方法。了解了这些之后我们在看组件的时候就清楚很多。

当我们使用组件< Main />时，其实是对 Main 类的实例化——new Main，只不过 react 对这个过程进行了封装，让它看起来更像是一个标签。

有三点值得注意：1、定义类名字的首字母必须大写 2、因为 class 变成了关键字，类选择器需要用 className 来代替。 3、类和模块内部默认使用严格模式，所以不需要用 use strict 指定运行模式。

## 组件的生命周期

![](https://raw.githubusercontent.com/nailuox/react-demo/master/screenshot/react-lifecycle.png)

**组件在初始化时会触发 5 个钩子函数：**

**1、getDefaultProps()**

> 设置默认的 props，也可以用 dufaultProps 设置组件的默认属性。

**2、getInitialState()**

> 在使用 es6 的 class 语法时是没有这个钩子函数的，可以直接在 constructor 中定义 this.state。此时可以访问 this.props。

**3、componentWillMount()**

> 组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改 state。

**4、 render()**

> react 最重要的步骤，创建虚拟 dom，进行 diff 算法，更新 dom 树都在此进行。此时就不能更改 state 了。

**5、componentDidMount()**

> 组件渲染之后调用，可以通过 this.getDOMNode()获取和操作 dom 节点，只调用一次。

**在更新时也会触发 5 个钩子函数：**

**6、componentWillReceivePorps(nextProps)**

> 组件初始化时不调用，组件接受新的 props 时调用。

**7、shouldComponentUpdate(nextProps, nextState)**

> react 性能优化非常重要的一环。组件接受新的 state 或者 props 时调用，我们可以设置在此对比前后两个 props 和 state 是否相同，如果相同则返回 false 阻止更新，因为相同的属性状态一定会生成相同的 dom 树，这样就不需要创造新的 dom 树和旧的 dom 树进行 diff 算法对比，节省大量性能，尤其是在 dom 结构复杂的时候。不过调用 this.forceUpdate 会跳过此步骤。

**8、componentWillUpdate(nextProps, nextState)**

> 组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改 state

**9、render()**

> 不多说

**10、componentDidUpdate()**

> 组件初始化时不调用，组件更新完成后调用，此时可以获取 dom 节点。

还有一个卸载钩子函数

**11、componentWillUnmount()**

> 组件将要卸载时调用，一些事件监听和定时器需要在此时清除。

以上可以看出来 react 总共有 10 个周期函数（render 重复一次），这个 10 个函数可以满足我们所有对组件操作的需求，利用的好可以提高开发效率和组件性能。

## React-Router 路由

Router 就是 React 的一个组件，它并不会被渲染，只是一个创建内部路由规则的配置对象，根据匹配的路由地址展现相应的组件。Route 则对路由地址和组件进行绑定，Route 具有嵌套功能，表示路由地址的包涵关系，这和组件之间的嵌套并没有直接联系。Route 可以向绑定的组件传递 7 个属性：children，history，location，params，route，routeParams，routes，每个属性都包涵路由的相关的信息。比较常用的有 children（以路由的包涵关系为区分的组件），location（包括地址，参数，地址切换方式，key 值，hash 值）。react-router 提供 Link 标签，这只是对 a 标签的封装，值得注意的是，点击链接进行的跳转并不是默认的方式，react-router 阻止了 a 标签的默认行为并用 pushState 进行 hash 值的转变。切换页面的过程是在点击 Link 标签或者后退前进按钮时，会先发生 url 地址的转变，Router 监听到地址的改变根据 Route 的 path 属性匹配到对应的组件，将 state 值改成对应的组件并调用 setState 触发 render 函数重新渲染 dom。

当页面比较多时，项目就会变得越来越大，尤其对于单页面应用来说，初次渲染的速度就会很慢，这时候就需要按需加载，只有切换到页面的时候才去加载对应的 js 文件。react 配合 webpack 进行按需加载的方法很简单，Route 的 component 改为 getComponent，组件用 require.ensure 的方式获取，并在 webpack 中配置 chunkFilename。

```javascript
const chooseProducts = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require('../Component/chooseProducts').default)
    },
    'chooseProducts'
  )
}

const helpCenter = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require('../Component/helpCenter').default)
    },
    'helpCenter'
  )
}

const saleRecord = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require('../Component/saleRecord').default)
    },
    'saleRecord'
  )
}

const RouteConfig = (
  <Router history={history}>
    <Route path="/" component={Roots}>
      <IndexRoute component={index} />
      //首页
      <Route path="index" component={index} />
      <Route path="helpCenter" getComponent={helpCenter} />
      //帮助中心
      <Route path="saleRecord" getComponent={saleRecord} />
      //销售记录
      <Redirect from="*" to="/" />
    </Route>
  </Router>
)
```

## 组件之间的通信

react 推崇的是单向数据流，自上而下进行数据的传递，但是由下而上或者不在一条数据流上的组件之间的通信就会变的复杂。解决通信问题的方法很多，如果只是父子级关系，父级可以将一个回调函数当作属性传递给子级，子级可以直接调用函数从而和父级通信。

组件层级嵌套到比较深，可以使用上下文 getChildContext 来传递信息，这样在不需要将函数一层层往下传，任何一层的子级都可以通过 this.context 直接访问。

兄弟关系的组件之间无法直接通信，它们只能利用同一层的上级作为中转站。而如果兄弟组件都是最高层的组件，为了能够让它们进行通信，必须在它们外层再套一层组件，这个外层的组件起着保存数据，传递信息的作用，这其实就是 redux 所做的事情。

组件之间的信息还可以通过全局事件来传递。不同页面可以通过参数传递数据，下个页面可以用 location.param 来获取。其实 react 本身很简单，难的在于如何优雅高效的实现组件之间数据的交流。

## Redux

首先，redux 并不是必须的，它的作用相当于在顶层组件之上又加了一个组件，作用是进行逻辑运算、储存数据和实现组件尤其是顶层组件的通信。如果组件之间的交流不多，逻辑不复杂，只是单纯的进行视图的渲染，这时候用回调，context 就行，没必要用 redux，用了反而影响开发速度。但是如果组件交流特别频繁，逻辑很复杂，那 redux 的优势就特别明显了。

先简单说一下 redux 和 react 是怎么配合的。react-redux 提供了 connect 和 Provider 两个好基友，它们一个将组件与 redux 关联起来，一个将 store 传给组件。组件通过 dispatch 发出 action，store 根据 action 的 type 属性调用对应的 reducer 并传入 state 和这个 action，reducer 对 state 进行处理并返回一个新的 state 放入 store，connect 监听到 store 发生变化，调用 setState 更新组件，此时组件的 props 也就跟着变化。

#### 流程是这个样子的：

![](https://raw.githubusercontent.com/nailuox/react-demo/master/screenshot/simple_redux.jpg)

值得注意的是 connect，Provider，mapStateToProps,mapDispatchToProps 是 react-redux 提供的，redux 本身和 react 没有关系，它只是数据处理中心，没有和 react 产生任何耦合，是 react-redux 让它们联系在一起。

#### 接下来具体分析一下，redux 以及 react-redux 到底是怎么实现的。

#### 先上一张图

![](https://raw.githubusercontent.com/nailuox/react-demo/master/screenshot/all_redux.png)

明显比第一张要复杂，其实两张图说的是同一件事。从上而下慢慢分析：

### 先说说 redux：

#### redux 主要由三部分组成：store，reducer，action。

**store**是一个对象，它有四个主要的方法：

**1、dispatch:**

> 用于 action 的分发——在 createStore 中可以用 middleware 中间件对 dispatch 进行改造，比如当 action 传入 dispatch 会立即触发 reducer，有些时候我们不希望它立即触发，而是等待异步操作完成之后再触发，这时候用 redux-thunk 对 dispatch 进行改造，以前只能传入一个对象，改造完成后可以传入一个函数，在这个函数里我们手动 dispatch 一个 action 对象，这个过程是可控的，就实现了异步。

**2、subscribe：**

> 监听 state 的变化——这个函数在 store 调用 dispatch 时会注册一个 listener 监听 state 变化，当我们需要知道 state 是否变化时可以调用，它返回一个函数，调用这个返回的函数可以注销监听。
> let unsubscribe = store.subscribe(() => {console.log('state 发生了变化')})

**3、getState：**

> 获取 store 中的 state——当我们用 action 触发 reducer 改变了 state 时，需要再拿到新的 state 里的数据，毕竟数据才是我们想要的。getState 主要在两个地方需要用到，一是在 dispatch 拿到 action 后 store 需要用它来获取 state 里的数据，并把这个数据传给 reducer，这个过程是自动执行的，二是在我们利用 subscribe 监听到 state 发生变化后调用它来获取新的 state 数据，如果做到这一步，说明我们已经成功了。

**4、replaceReducer:**

> 替换 reducer，改变 state 修改的逻辑。

store 可以通过 createStore()方法创建，接受三个参数，经过 combineReducers 合并的 reducer 和 state 的初始状态以及改变 dispatch 的中间件，后两个参数并不是必须的。store 的主要作用是将 action 和 reducer 联系起来并改变 state。

**action:**

> action 是一个对象，其中 type 属性是必须的，同时可以传入一些数据。action 可以用 actionCreactor 进行创造。dispatch 就是把 action 对象发送出去。

**reducer:**

> reducer 是一个函数，它接受一个 state 和一个 action，根据 action 的 type 返回一个新的 state。根据业务逻辑可以分为很多个 reducer，然后通过 combineReducers 将它们合并，state 树中有很多对象，每个 state 对象对应一个 reducer，state 对象的名字可以在合并时定义。

像这个样子：

```javascript
const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
})
```

**combineReducers:**

> 其实它也是一个 reducer，它接受整个 state 和一个 action，然后将整个 state 拆分发送给对应的 reducer 进行处理，所有的 reducer 会收到相同的 action，不过它们会根据 action 的 type 进行判断，有这个 type 就进行处理然后返回新的 state，没有就返回默认值，然后这些分散的 state 又会整合在一起返回一个新的 state 树。

接下来分析一下整体的流程，首先调用 store.dispatch 将 action 作为参数传入，同时用 getState 获取当前的状态树 state 并注册 subscribe 的 listener 监听 state 变化，再调用 combineReducers 并将获取的 state 和 action 传入。combineReducers 会将传入的 state 和 action 传给所有 reducer，并根据 action 的 type 返回新的 state，触发 state 树的更新，我们调用 subscribe 监听到 state 发生变化后用 getState 获取新的 state 数据。

redux 的 state 和 react 的 state 两者完全没有关系，除了名字一样。

**上面分析了 redux 的主要功能，那么 react-redux 到底做了什么？**

## React-Redux

如果只使用 redux，那么流程是这样的：

> component --> dispatch(action) --> reducer --> subscribe --> getState --> component

用了 react-redux 之后流程是这样的：

> component --> actionCreator(data) --> reducer --> component

store 的三大功能：dispatch，subscribe，getState 都不需要手动来写了。react-redux 帮我们做了这些，同时它提供了两个组件 Provider 和 connect。

**Provider**是一个组件，它接受 store 作为 props，然后通过 context 往下传，这样 react 中任何组件都可以通过 context 获取 store。也就意味着我们可以在任何一个组件里利用 dispatch(action)来触发 reducer 改变 state，并用 subscribe 监听 state 的变化，然后用 getState 获取变化后的值。但是并不推荐这样做，它会让数据流变的混乱，过度的耦合也会影响组件的复用，维护起来也更麻烦。

**connect --connect(mapStateToProps, mapDispatchToProps, mergeProps, options)** 是一个函数，它接受四个参数并且再返回一个函数--wrapWithConnect，wrapWithConnect 接受一个组件作为参数 wrapWithConnect(component)，它内部定义一个新组件 Connect(容器组件)并将传入的组件(ui 组件)作为 Connect 的子组件然后 return 出去。

所以它的完整写法是这样的：connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(component)

**mapStateToProps(state, [ownProps])：**

> mapStateToProps 接受两个参数，store 的 state 和自定义的 props，并返回一个新的对象，这个对象会作为 props 的一部分传入 ui 组件。我们可以根据组件所需要的数据自定义返回一个对象。ownProps 的变化也会触发 mapStateToProps

```javascript
function mapStateToProps(state) {
  return { todos: state.todos }
}
```

**mapDispatchToProps(dispatch, [ownProps])：**

> mapDispatchToProps 如果是对象，那么会和 store 绑定作为 props 的一部分传入 ui 组件。如果是个函数，它接受两个参数，bindActionCreators 会将 action 和 dispatch 绑定并返回一个对象，这个对象会和 ownProps 一起作为 props 的一部分传入 ui 组件。所以不论 mapDispatchToProps 是对象还是函数，它最终都会返回一个对象，如果是函数，这个对象的 key 值是可以自定义的

```javascript
function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActionCreators, dispatch),
    counterActions: bindActionCreators(counterActionCreators, dispatch)
  }
}
```

mapDispatchToProps 返回的对象其属性其实就是一个个 actionCreator，因为已经和 dispatch 绑定，所以当调用 actionCreator 时会立即发送 action，而不用手动 dispatch。ownProps 的变化也会触发 mapDispatchToProps。

**mergeProps(stateProps, dispatchProps, ownProps)：**

> 将 mapStateToProps() 与 mapDispatchToProps()返回的对象和组件自身的 props 合并成新的 props 并传入组件。默认返回 Object.assign({}, ownProps, stateProps, dispatchProps) 的结果。

**options：**

> pure = true 表示 Connect 容器组件将在 shouldComponentUpdate 中对 store 的 state 和 ownProps 进行浅对比，判断是否发生变化，优化性能。为 false 则不对比。

其实 connect 函数并没有做什么，大部分的逻辑都是在它返回的 wrapWithConnect 函数内实现的，确切的说是在 wrapWithConnect 内定义的 Connect 组件里实现的。

### 下面是一个完整的 react --> redux --> react 流程：

一、Provider 组件接受 redux 的 store 作为 props，然后通过 context 往下传。

二、connect 函数在初始化的时候会将 mapDispatchToProps 对象绑定到 store，如果 mapDispatchToProps 是函数则在 Connect 组件获得 store 后，根据传入的 store.dispatch 和 action 通过 bindActionCreators 进行绑定，再将返回的对象绑定到 store，connect 函数会返回一个 wrapWithConnect 函数，同时 wrapWithConnect 会被调用且传入一个 ui 组件，wrapWithConnect 内部使用 class Connect extends Component 定义了一个 Connect 组件，传入的 ui 组件就是 Connect 的子组件，然后 Connect 组件会通过 context 获得 store，并通过 store.getState 获得完整的 state 对象，将 state 传入 mapStateToProps 返回 stateProps 对象、mapDispatchToProps 对象或 mapDispatchToProps 函数会返回一个 dispatchProps 对象，stateProps、dispatchProps 以及 Connect 组件的 props 三者通过 Object.assign()，或者 mergeProps 合并为 props 传入 ui 组件。然后在 ComponentDidMount 中调用 store.subscribe，注册了一个回调函数 handleChange 监听 state 的变化。

三、此时 ui 组件就可以在 props 中找到 actionCreator，当我们调用 actionCreator 时会自动调用 dispatch，在 dispatch 中会调用 getState 获取整个 state，同时注册一个 listener 监听 state 的变化，store 将获得的 state 和 action 传给 combineReducers，combineReducers 会将 state 依据 state 的 key 值分别传给子 reducer，并将 action 传给全部子 reducer，reducer 会被依次执行进行 action.type 的判断，如果有则返回一个新的 state，如果没有则返回默认。combineReducers 再次将子 reducer 返回的单个 state 进行合并成一个新的完整的 state。此时 state 发生了变化。dispatch 在 state 返回新的值之后会调用所有注册的 listener 函数其中包括 handleChange 函数，handleChange 函数内部首先调用 getState 获取新的 state 值并对新旧两个 state 进行浅对比，如果相同直接 return，如果不同则调用 mapStateToProps 获取 stateProps 并将新旧两个 stateProps 进行浅对比，如果相同，直接 return 结束，不进行后续操作。如果不相同则调用 this.setState()触发 Connect 组件的更新，传入 ui 组件，触发 ui 组件的更新，此时 ui 组件获得新的 props，react --> redux --> react 的一次流程结束。

**上面的有点复杂，简化版的流程是：**

一、Provider 组件接受 redux 的 store 作为 props，然后通过 context 往下传。

二、connect 函数收到 Provider 传出的 store，然后接受三个参数 mapStateToProps，mapDispatchToProps 和组件，并将 state 和 actionCreator 以 props 传入组件，这时组件就可以调用 actionCreator 函数来触发 reducer 函数返回新的 state，connect 监听到 state 变化调用 setState 更新组件并将新的 state 传入组件。

connect 可以写的非常简洁，mapStateToProps，mapDispatchToProps 只不过是传入的回调函数，connect 函数在必要的时候会调用它们，名字不是固定的，甚至可以不写名字。

简化版本：

```javascript
connect(
  state => state,
  action
)(Component)
```

## 项目搭建

上面说了 react，react-router 和 redux 的知识点。但是怎么样将它们整合起来，搭建一个完整的项目。

1、先引用 react.js，redux，react-router 等基本文件，建议用 npm 安装，直接在文件中引用。

2、从 react.js，redux，react-router 中引入所需要的对象和方法。

```javascript
import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import {
  Router,
  Route,
  Redirect,
  IndexRoute,
  browserHistory,
  hashHistory
} from 'react-router'
```

3、根据需求创建顶层 ui 组件，每个顶层 ui 组件对应一个页面。

4、创建 actionCreators 和 reducers，并用 combineReducers 将所有的 reducer 合并成一个大的 reduer。利用 createStore 创建 store 并引入 combineReducers 和 applyMiddleware。

5、利用 connect 将 actionCreator，reuder 和顶层的 ui 组件进行关联并返回一个新的组件。

6、利用 connect 返回的新的组件配合 react-router 进行路由的部署，返回一个路由组件 Router。

7、将 Router 放入最顶层组件 Provider，引入 store 作为 Provider 的属性。

8、调用 render 渲染 Provider 组件且放入页面的标签中。

可以看到顶层的 ui 组件其实被套了四层组件，Provider，Router，Route，Connect，这四个组件并不会在视图上改变 react，它们只是功能性的。

通常我们在顶层的 ui 组件打印 props 时可以看到一堆属性：

![](https://raw.githubusercontent.com/nailuox/react-demo/master/screenshot/react_props.png)

上图的顶层 ui 组件属性总共有 18 个，如果刚刚接触 react，可能对这些属性怎么来的感到困惑，其实这些属性来自五个地方：

组件自定义属性 1 个，actionCreator 返回的对象 6 个，reducer 返回的 state4 个，Connect 组件属性 0 个，以及 Router 注入的属性 7 个。
