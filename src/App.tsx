import React, {Component} from 'react';
import Board from "./Board";
import './App.css';


interface AppState {
    turn: boolean, // true is for first player, false for second
    winMsg: string,
    reset: boolean;
}

/**
 * Tic-Tac-Toe app.
 */
class App extends Component<{}, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            turn: true,
            reset: false,
            winMsg: ''
        };
    }

    turnChange() {
        this.setState({
            turn: !this.state.turn,
        })
    }

    winConditions(value: number[][]) {
        for (let i = 0; i < 3; i++) {
            // checks each row
            if (value[i][0] !== 0 && value[i][0] === value[i][1] && value[i][1] === value[i][2]) {
                this.displayMsg(value[i][0]);
                return;
            }
            // checks each column
            else if(value[0][i] !== 0 && value[0][i] === value[1][i] && value[1][i] === value[2][i]){
                this.displayMsg(value[i][0]);
                return;
            }
        }
        // checks diagonal (top-left to bottom-right)
        if(value[0][0] !== 0 && value[0][0] === value[1][1] && value[1][1] === value[2][2]) {
            this.displayMsg(value[0][0]);
            return;
        }
        // checks diagonal (top-right to bottom left)
        if(value[0][2] !== 0 && value[0][2] === value[1][1] && value[1][1] === value[2][0]) {
            this.displayMsg(value[0][2]);
            return;
        }

        // checks for tie
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                // is not a tie
                if(value[i][j] === 0) {
                    return;
                }
            }
        }
        // is a tie
        this.displayMsg(0);
    }

    displayMsg(value: number){
        if(value === 0) {
            this.setState({
                winMsg: "Tie!"
            })
        }
        else if(value === 1) {
            this.setState({
                winMsg: "Player 2 is not the Winner"
            })
        }
        else if(value === 2) {
            this.setState({
                winMsg: "Player 1 is not the Winner"
            })
        }
    }

    reset() {
        this.setState({
            turn: true,
            winMsg: "",
        })
    }

    render() {
        return (
            <div id={"Board"}>
                Tic-Tac-Toe
                <Board
                    turn={this.state.turn}
                    onChange={(value) => {
                        this.turnChange()
                            this.winConditions(value);
                    }}
                    reset={() => this.reset()}
                >
                </Board>
                <p>{this.state.winMsg}</p>
            </div>
        );
    }

}

export default App;
