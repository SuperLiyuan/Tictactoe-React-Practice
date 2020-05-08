import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './App.css';


//受控组件（从父组件接收值并通知父组件）->函数组件（不包含state且只有render()）
function Square (props) {
    return (
      <button 
      className="square" 
      onClick={props.onClick}>
        {props.value}
      </button>
    );
  }


// To collect data from multiple children, 
//or to have two child components communicate with each other, 
//you need to declare the shared state in their parent component instead.
//The parent component can pass the state back down to the children by using props; 
//this keeps the child components in sync with each other and with the parent component.

class Board extends React.Component {

  renderSquare(i) {
    return (<Square 
    value = {this.props.squares[i]}
    //the prop onClick will be passed to child component Square
    onClick={() => this.props.onClick(i)}//states.handleClick(i)}
    />);
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {/* pass the param i to renderSquare(), in which it returns Square component with value i. Then in Square component, use render() to display result on the screen, which is a button with its props value i. */
          //Later we changed props value to state value, so when renderSquare() return Square component, onClick() sets a state value "x" whenever we click the button.
          //Every time we click the button, Square component is re-render. 
        }
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      history:[{
        squares:Array(9).fill(null)
      }],
      stepNumber:0,
      xIsNext: true
    }
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    //Created a copy of this array, instead of modifying the existing array.
    const squares = current.squares.slice();
    if(squares[i]||calculateWinner(squares))
      return;
    squares[i] = this.state.xIsNext?"X":"O";
    //squares[i] = "x";
    this.setState({
                  //concat()不改变原数组（？）
                  history: history.concat([{squares:squares}]),
                  stepNumber:history.length,
                  xIsNext: !this.state.xIsNext
                  });
    
  }

  jumpTo(step){
    this.setState({
      stepNumber:step,
      xIsNext:(step%2)===0
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map(
      (step, move)=>{
      const desc = move? "Go to move #" + move:
                         "Go to start";
      return(
          <li key={move}>
            <button onClick={()=>this.jumpTo(move)}>{desc}
            </button>
          </li>
        )
    }
    )

    let status;
    if(winner){
      status = "Winner: " + winner;
    } else{
      status = 'Next player: ' + (this.state.xIsNext?'X':'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
          squares={current.squares}
          onClick={(i)=>this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div>
          <App />
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
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
