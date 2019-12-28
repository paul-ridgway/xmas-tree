import React, { MouseEvent } from 'react';
import './App.css';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { Lights } from './Lights';
import { SceneSelect } from './SceneSelect';

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
      <Container>
        <Row>
          <Col>
            <SceneSelect />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={this.toggleLights}>{this.state.showLights ? "Hide" : "Show"} Lights</Button>
            {this.state.showLights &&
              <>
                <br />
                <br />
                <Lights />
              </>
            }
          </Col>
          </Row>
      </Container>
    </>
  );
}
