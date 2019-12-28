import React, { FormEventHandler, FormEvent } from 'react';
import './App.css';
import { Form, Col, Row, Button, FormControl } from 'react-bootstrap';

export interface SceneSelectState {
  sceneNames: string[];
  currentScene?: string;
}

export class SceneSelect extends React.Component<{}, SceneSelectState> {

  constructor(context?: any) {
    super(context);
    this.state = { sceneNames: [] };
  }

  componentDidMount = () => {
    fetch("/api/leds/scenenames", { method: "POST" })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ sceneNames: res });
      });

    fetch("/api/leds/currentscene", { method: "POST" })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ currentScene: res.name });
      });
  }


  changeScene = (e: FormEvent<HTMLSelectElement>): void => {
    const name = (e.target as any).value;
    fetch("/api/leds/changescene", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ currentScene: res.name });
      });
  }

  render = () => (
    <>
      <fieldset>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Scenes</Form.Label>
          <Col sm={10}>
            <Form.Control as="select" onChange={this.changeScene} defaultValue={this.state.currentScene}>
              {this.state.sceneNames.map((name, index) => <option key={index} value={name}>{name}</option>)}
            </Form.Control>
          </Col>
        </Form.Group>
      </fieldset>
    </>
  );
}
