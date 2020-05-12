import React from 'react';
import ReactDOM from 'react-dom';
import './Game.css';
import { Button,Row, Col, Menu, Dropdown, Space, message,  } from 'antd';
import { LeftSquareOutlined,DownOutlined,CloseOutlined,SmileOutlined } from '@ant-design/icons';

function Icons(icon){

  if(icon==="X")
    return (<CloseOutlined />)
    else if(icon==="O")
    return (<SmileOutlined />)
    else return " "
}

//受控组件（从父组件接收值并通知父组件）->函数组件（不包含state且只有render()）
function Square (props) {
  
  if(props.winner){
    if(props.winner.indexOf(props.spot)>-1){
      return(
        <Button 
        id="test"    
        danger
        className="square" 
        onClick={props.onClick}
        block>
          {Icons(props.value)}
        </Button>
      )
    }
  }
  return (
    <Button id="test"
    className="square" 
    onClick={props.onClick}
    block>
      {Icons(props.value)}
    </Button>
  );
}

class Board extends React.Component {

constructor(props){
  super(props)
  this.renderSquare=this.renderSquare.bind(this)
}

renderSquare(i) {
  return (<Square 
  value = {this.props.squares[i]}
  onClick={() => this.props.onClick(i)}
  winner = {this.props.winner}
  spot = {i}
  />);
}

render() {
    var res=[];
    var i = 0;
    //3行
    while(i<3){
      res.push(i++)
    }

  return(
  <div>
    {/* 对每一行都有： */}
     {res.map((i)=>{
            var rows = []
            for(var j=0;j<3;j++){
              // 如再套一个函数this就没了
              rows.push(<Col span={8}>{this.renderSquare(i*3+j)}</Col>)
            }
          return(
            <div id="board-row">
              <Row>
                {rows}
              </Row>
            </div>
          )
     })}
  </div>)

}
}


class StepBack extends React.Component{

  render(){
    var history = this.props.history;
    const buttons = history.map((step,move)=>{
      const desc = move>0? "Go to move #" + move:"Go to start!!";
        return(
        <Menu.Item key={move}>
          <LeftSquareOutlined />
          {desc}
          </Menu.Item>
          )
      }
      )
      
    const menu = ()=>{
       return (
    <Menu onClick={this.props.onClick}>
        {buttons}
    </Menu>
        // <MenuFunction 
        // buttons = {buttons} />
      )
    }
    return( 
    <div>
    <Dropdown overlay={menu}>
      <Button>
      step back 
      <DownOutlined />
    </Button>
    </Dropdown>
    </div>)
      
    }
  
}

function GameReset(props) {

    return(
      <Button type="danger" onClick={props.allStatesReset}>Reset</Button>

    )
  }

function Finish(props){
  return(<Button danger onClick={props.onClick}>Quit</Button>)
}

class Game extends React.Component {

constructor(props){
  super(props);
  this.state = {
    history:[{
      squares:Array(9).fill(null)
    }],
    stepNumber:0,
    xIsNext: true,
    winSquare:Array(3).fill(null)
  }
  this.jumpTo = this.jumpTo.bind(this)
  this.allStatesReset = this.allStatesReset.bind(this)
}



changeStateStep(stateStep){
  //没num括起来的话len就是两个字符串组合…
  const len = Number(stateStep.key)+1
  console.log(len)
  //就他妈因为少了这个key……
  this.setState({stepNumber:stateStep.key, 
                 xIsNext:stateStep.key%2===0,
                 
                 history:this.state.history.slice(0,len)
                })
}

allStatesReset(){
  this.setState({
    history:[{
      squares:Array(9).fill(null)
    }],
    stepNumber:0,
    xIsNext: true,
    winSquare:Array(3).fill(null)
  })
}

handleClick(i){
  const history = this.state.history.slice(0, this.state.stepNumber + 1);
  const current = history[this.state.stepNumber];
  //Created a copy of this array, instead of modifying the existing array.
  const squares = current.squares.slice();
  var winSquare = calculateWinner(squares)

  if(squares[i]||winSquare)
    return;

  squares[i] = this.state.xIsNext?"X":"O";
  this.setState({
                //concat()不改变原数组
                history: history.concat([{squares:squares}]),
                stepNumber:history.length,
                xIsNext: !this.state.xIsNext
                });
  //更新状态后再算一次
  winSquare = calculateWinner(squares)              
  if(winSquare){
      this.setState({winSquare:winSquare})
      return;
  }
  
}

jumpTo(step){
  this.setState({
    //这是不是没用了
    stepNumber:step,
    xIsNext:(step%2)===0,
  })
}

render() {
  const history = this.state.history;
  console.log("history")
  console.log(history)
  let status;
  const current = history[Number(this.state.stepNumber)];
  //返回获胜的坐标高亮处理
  const winner = calculateWinner(current.squares)
   if(winner){
    status = 0;//"Winner is: " + current.squares[winner[0]];
    message.success("Winner is: " + current.squares[winner[0]]);
  } else if(this.state.stepNumber<9){
    status = 1;//'Next player: ' + (this.state.xIsNext?'X':'O');
  }else {
    //stepNumber = 9
    status = 2;//"Dead heat!";
    message.warning("Dead heat!");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
        squares={current.squares}
        onClick={(i)=>this.handleClick(i)}
        winner = {winner}/>
      </div>
      <div>
        <StepBack 
        history = {this.state.history}
        onClick = {this.changeStateStep.bind(this)}
        />
      </div>
      <div className="game-info">
        <div>{status===1?'Next player: ' + (this.state.xIsNext?'X':'O'):null}</div>
      </div>
      <div>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row" span={6}>
        <div></div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="button"><GameReset allStatesReset = {this.allStatesReset}/></div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="button"><Finish started = {this.props.started} onClick = {this.props.onClick}/></div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div></div>
      </Col>
    </Row>





        
      </div>
    </div>
  );
}
}

function calculateWinner(squares) {
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
for (let i = 0; i < lines.length; i++) {
  const [a, b, c] = lines[i];
  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    return [a,b,c];
  }
}
return null;
}

export default Game;

// ReactDOM.render(
//     <Game />,
//   document.getElementById('root')
// );
