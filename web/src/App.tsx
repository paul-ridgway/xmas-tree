import React, { MouseEvent } from 'react';
import './App.css';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { Lights } from './Lights';
import { SceneSelect } from './SceneSelect';
import { ApiClient } from './util/api-client';

export interface AppState {
  showLights: boolean;
}

export class App extends React.Component<{}, AppState> {

  private readonly api: ApiClient;

  constructor(context?: any) {
    super(context);
    this.api = new ApiClient();
    this.state = { showLights: false };
  }

  componentDidMount = () => {
    console.log(this);
    console.log(this.api);
    console.log(this.api.ledsApi());
    console.log("currentApi", this.api.ledsApi().currentScene())
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
