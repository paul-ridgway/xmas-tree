import React from 'react';
import './App.css';
import { Form, Col, Row, Button } from 'react-bootstrap';

export interface SceneSelectState {
}

export class SceneSelect extends React.Component<{}, SceneSelectState> {

  render = () => (
    <>
      <Form>
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>Scenes</Form.Label>
            <Col sm={10}>
              <Form.Control as="select"></Form.Control>
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Change</Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}
