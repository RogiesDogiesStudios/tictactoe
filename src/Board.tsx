import React, {Component} from 'react';
import App from "./App";

/**
 * Underlying array to represent the board.
 * 0 - Empty
 * 1 - X
 * 2 - O
 */
interface BoardProps{
    end: boolean,
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
        if(this.state.board[row][col] > 0 || this.props.end) return;
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
        let image: any[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(this.state.board[i][j] === 1) {
                    image[i][j] = require('./player1Square.png');
                }
                else if(this.state.board[i][j] === 2) {
                    image[i][j] = require('./player2Square.png');
                }
                else {
                    image[i][j] = require('./emptySquare.png');
                }
            }
        }
        return(
            <div>
                <input type="image" src={image[0][0]} onClick={() => this.buttonClick(0,0)}/>
                <input type="image" src={image[0][1]} onClick={() => this.buttonClick(0,1)}/>
                <input type="image" src={image[0][2]} onClick={() => this.buttonClick(0,2)}/>
                <div/>
                <input type="image" src={image[1][0]} onClick={() => this.buttonClick(1,0)}/>
                <input type="image" src={image[1][1]} onClick={() => this.buttonClick(1,1)}/>
                <input type="image" src={image[1][2]} onClick={() => this.buttonClick(1,2)}/>
                <div/>
                <input type="image" src={image[2][0]} onClick={() => this.buttonClick(2,0)}/>
                <input type="image" src={image[2][1]} onClick={() => this.buttonClick(2,1)}/>
                <input type="image" src={image[2][2]} onClick={() => this.buttonClick(2,2)}/>
                <div/>
                <button onClick={() => this.reset()}>Reset</button>
            </div>
        );
    }
}

export default Board;