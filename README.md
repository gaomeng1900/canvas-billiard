# canvas-billiard
写一个物理引擎, 模拟弹性碰撞(离散型), 并实现一个台球游戏

## 物理引擎
每一帧发生的操作:
- 绘制当前状态
- 运行物理定律
- 调用所有对象的move

### 碰撞检测
所有需要检测的物体之间计算圆心距离, 如果发生相交, 则按照圆心连线推开 `*1`

### 鼠标监控
实时维护鼠标对象, 记录鼠标状态, 与物体边界进行检测, 着重区分以下两种情况:
- 在当前物体中按下然后移出
- 在物体外按下然后移入

### 碰撞模型
离散的弹性碰撞模型, 符合能量守恒/动量守恒/牛顿第一定律, 支持斜碰和追尾,
物理引擎中同时实现了 简单碰撞(交换速度)和镜面碰撞(碰撞物体之间的切线视为镜面), 然而这两种模型并不符合真实物理定律, 在追尾时问题明显

### 拖拽
实现四种拖拽模式
- 简单拖拽(直接改变物体坐标)
- 简单牵拉
- 橡皮筋(弹弓)

### 延伸

碰撞模型有两种计算方式: 离散式, 连续式.

#### 离散的碰撞模型
多数物理引擎都是用离散计算方式, 每个周期计算一次, 周期之间发生的移动为离散位移,
离散式物理模型将物理系统视为状态机, 建模/编程/实现都很方便, 而且能高效的应对各种突发情况(用户交互, 复杂系统中的相互影响等等).
然而离散位移意味着 进行计算时 点所在的位置 可能 并不是我们期望的位置, 碰撞检测中 检测到碰撞时 通常两物体已经相交, 甚至会出现 直接穿透碰撞体 的情况.

对于已经相交的物体来说, 要把物体放回计算模型中规定的位置(即相切的位置)才能进行计算, 而这个放回操作是非常困难的,
`*1`中使用了一个简单粗暴的方案, 显然会在相较量较大时出现明显问题,
正确的放回方式是按照两个碰撞体运动速度(矢量)时间函数, 做微积分计算, 回退(时光倒流)到恰好碰撞的位置,
考虑到速度(矢量)的变化曲线可能非常复杂, 而且碰撞可能发生在不止两个物体之间, 这一过程的计算量会变得很大, 而且要记录这一过程中的速度变化,
另外, 这一回退操作影响到的不只是位置, 也会影响到时间, 也就是说, 碰撞时间点发生的时间和帧时间没有对齐.

对于速度过高直接穿透碰撞体的情况, 下面有些改善方案.

#### 连续的碰撞模型

> **对整个物理系统的初始状态和各种影响因素建立方程组, 直接解出每个物体位置和时间的函数.**

完美♂

当然上面那句是我的理想, 如果能脱离 状态的局限性, 计算结果的精度 将 只受限于物理公式的精度 和浮点数精度.

然而这种情况基本上只会出现在 计算机模拟物理实验 的情景, 以及没有实时交互, 而且环境变量和物理公式都比较单一的游戏中(比方说专业的台球游戏...), 这种建模方式的计算成本非常高(建模难度也非常大), 基本上不可能对不可预测的影响因素(如用户交互)做出实时反馈,

#### 改善离散的碰撞模型

以下方案可以提高离散碰撞模型的精度(或者让结果看起来不要太离谱)

- **减小周期步长/限速**
	- 即使避免不了相交, 总可以减小相交的程度
- **射线**
	- 查了游戏开发社区后给出的最常见方案
	- 适用于运动物体撞击静止物体(或者被撞击物体可以被视为静止)的情景,
	- 直接按照运动物体的速度画一条射线, 找到撞击点, 直接得到撞击前后的运动路径,
	- 相当于一个简化的连续碰撞模型,
	- 精度高, 不会穿透, 前提是运动物体的路径是固定的(不要有第三方物体干扰)以及被撞物体不要乱动,
	- 如果被撞物体也在运动, 可以让撞击物体每一帧都发出一条射线进行检查, 但只要不把被撞物体的运动方程考虑在内, 就不能避免错撞和漏撞

- **碰撞预测**
	- 只查到了一些模模糊糊的专利说明, 大致目的就是在碰撞发生之前就计算好碰撞位置
	- 然而计算碰撞点的方法似乎依然是连续模拟那一套: 解方程组, 如果有多个物体之间可能发生碰撞, 计算量和实现难度依然很大


- **穿透检查**
	- 初始位置和终点连线, 看是否经过了其他的物体, 如果是, 则可能发生了穿透
	- 逻辑缺陷很明显, 能降低穿透率, 但不能应对两个物体都在运动的情景, 除非画出所有路径, 将所有路径相交的物体都视为疑似穿透的物体, 并在每一次重新计算后重新检查

#### 总结

- 离散的碰撞模型是游戏引擎的主流, 毕竟多数情景下对整个物理系统建模的难度非常大, 而且精度并不总是那么重要,
- 可以使用改善方案来提高离散模拟的精度, 然而改善方案都不完美.
- 改善方案的核心都是将连续模拟的思路引入离散模拟, 并限制连续模拟的规模
- 一旦有多个物体在运动, 就必须同时把多个物体都考虑在内而不能两两处理, 这也是为什么这些改善方案都不能完美解决这个问题

> **另一个思路**
> 离散模拟中, 如果相交后能实现完美的位置回退, 在正确的位置计算依然可以得到高精度的计算结果
