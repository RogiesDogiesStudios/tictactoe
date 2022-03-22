import React, {Component} from 'react';

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
            return require('./emptySquare.png');
        if(this.state.board[row][col] === 1)
            return require('./player1Square.png');
        return require('./player2Square.png');

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
        return(
            <div>
                <input type="image" src={this.buttonValue(0, 0)} onClick={() => this.buttonClick(0,0)}/>
                <input type="image" src={this.buttonValue(0, 1)} onClick={() => this.buttonClick(0,1)}/>
                <input type="image" src={this.buttonValue(0, 2)} onClick={() => this.buttonClick(0,2)}/>
                <div/>
                <input type="image" src={this.buttonValue(1, 0)} onClick={() => this.buttonClick(1,0)}/>
                <input type="image" src={this.buttonValue(1, 1)} onClick={() => this.buttonClick(1,1)}/>
                <input type="image" src={this.buttonValue(1, 2)} onClick={() => this.buttonClick(1,2)}/>
                <div/>
                <input type="image" src={this.buttonValue(2, 0)} onClick={() => this.buttonClick(2,0)}/>
                <input type="image" src={this.buttonValue(2, 1)} onClick={() => this.buttonClick(2,1)}/>
                <input type="image" src={this.buttonValue(2, 2)} onClick={() => this.buttonClick(2,2)}/>
                <div/>
                <button onClick={() => this.reset()}>Reset</button>
            </div>
        );
    }
}

export default Board;