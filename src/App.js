import React, { Component } from 'react';
import { Container, Col, Row, Card, InputGroup, FormControl, Badge } from 'react-bootstrap';
import './App.css';
import recipesJSON from './json/recipes.json';

class App extends Component {

  constructor() {
    super();
    this.state = {
      recipes: []
    }
  }
  
  componentWillMount() {
    this.setState({
      recipes: recipesJSON
    });
  }

  render() {
    var colOuput = [];
    var output = [];
    this.state.recipes.forEach(el => {
      colOuput.push(
        <Col key={el.id} md="3">
          <Card>
            <Card.Img src={el.image} width="50%" height="175px"/>
            <Card.Body>
              <Card.Title>{el.name}</Card.Title>
              <Card.Text>{el.tags.join(", ")}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      )
    });
    while(colOuput.length) output.push(<Row key={colOuput.length}>{colOuput.splice(0,4)}</Row>);
    
    return (
      <div className="App">
        <Container>
          <h1>Recipes</h1>
          <InputGroup className="mb-3">
            <FormControl placeholder="Search" aria-label="Search" aria-describedby="search-recipe"/>
          </InputGroup>
          {output}
        </Container>
      </div>
    );
  }

}

export default App;
