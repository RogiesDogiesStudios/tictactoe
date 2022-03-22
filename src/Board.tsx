import React, {Component} from 'react';
import App from "./App";

/**
 * Underlying array to represent the board.
 * 0 - Empty
 * 1 - X
 * 2 - O
 */
interface BoardProps{
    turn: boolean,
    onChange(state: number[][]): void;
    reset(): void;
}

interface BoardState {
    board: number[][],
}

/**
 * Board component.
 */
class Board extends Component<BoardProps, BoardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        };
    }

    buttonValue(row: number, col: number){
        if(this.state.board[row][col] === 0)
            return '-'
        if(this.state.board[row][col] === 1)
            return 'X'
        return 'O'

    }

    buttonClick(row: number, col: number){
        if(this.state.board[row][col] > 0) return;
        let copy = this.state.board;
        if(this.props.turn) {
            copy[row][col] = 1;
            this.setState({
                board: copy
            })
        }
        else {
            copy[row][col] = 2;
            this.setState({
                board: copy
            })
        }
        this.props.onChange(copy);
    }

    reset() {
        this.props.reset();
        this.setState( {
            board:[[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        });
    }

    render() {
        return(
            <div>
                <button onClick={() => this.buttonClick(0,0)}>{this.buttonValue(0, 0)}</button>
                <button onClick={() => this.buttonClick(0,1)}>{this.buttonValue(0, 1)}</button>
                <button onClick={() => this.buttonClick(0,2)}>{this.buttonValue(0, 2)}</button>
                <div/>
                <button onClick={() => this.buttonClick(1,0)}>{this.buttonValue(1, 0)}</button>
                <button onClick={() => this.buttonClick(1,1)}>{this.buttonValue(1, 1)}</button>
                <button onClick={() => this.buttonClick(1,2)}>{this.buttonValue(1, 2)}</button>
                <div/>
                <button onClick={() => this.buttonClick(2,0)}>{this.buttonValue(2, 0)}</button>
                <button onClick={() => this.buttonClick(2,1)}>{this.buttonValue(2, 1)}</button>
                <button onClick={() => this.buttonClick(2,2)}> {this.buttonValue(2, 2)}</button>
                <div/>
                <button onClick={() => this.reset()}>Reset</button>
            </div>
        );
    }
}

export default Board;