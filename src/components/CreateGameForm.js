import React from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

class CreateGameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numPlayers: '2',
      difficultyLevel: '4'
    };
    this.handlePlayerChange = (e, { value }) => this.setState({ numPlayers: value });
    this.handleDifficultyChange = (e, { value }) => this.setState({ difficultyLevel: value });
  }

  render() {
    const { numPlayers, difficultyLevel } = this.state;
    return (
      <Form>
        <Form.Field>
          <label>Name</label>
          <Input placeholder='Name' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input type='password' placeholder='Password' />
        </Form.Field>
        <Form.Field>
          <label>Number of Players</label>
          <Form.Group>
            <Form.Radio
              label='2'
              value='2'
              checked={numPlayers === '2'}
              onChange={this.handlePlayerChange}
            />
            <Form.Radio
              label='3'
              value='3'
              checked={numPlayers === '3'}
              onChange={this.handlePlayerChange}
            />
            <Form.Radio
              label='4'
              value='4'
              checked={numPlayers === '4'}
              onChange={this.handlePlayerChange}
            />
          </Form.Group>
        </Form.Field>
        <Form.Field>
          <label>Difficulty Level (# of Epidemic Cards)</label>
          <Form.Group>
            <Form.Radio
              label='4'
              value='4'
              checked={difficultyLevel === '4'}
              onChange={this.handleDifficultyChange}
            />
            <Form.Radio
              label='5'
              value='5'
              checked={difficultyLevel === '5'}
              onChange={this.handleDifficultyChange}
            />
            <Form.Radio
              label='6'
              value='6'
              checked={difficultyLevel === '6'}
              onChange={this.handleDifficultyChange}
            />
          </Form.Group>
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    );
  }
}

export default CreateGameForm;
