import React, { MouseEvent } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { Lights } from './Lights';

export interface AppState {
  showLights: boolean;
}

export class App extends React.Component<{}, AppState> {

  constructor(context?: any) {
    super(context);
    this.state = { showLights: false };
  }

  private toggleLights = (event: MouseEvent<HTMLButtonElement>): void => {
    this.setState({ showLights: !this.state.showLights });
  }

  render = () => (
    <>
      <Button onClick={this.toggleLights}>{this.state.showLights ? "Hide" : "Show"} Lights</Button>
      {this.state.showLights &&
        <>
          <br />
          <Lights />
        </>
      }
    </>
  );
}
