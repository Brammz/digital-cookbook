import React, { Component } from 'react';
import { Container, Col, Row, Card, InputGroup, FormControl, Button, Modal } from 'react-bootstrap';
import './App.css';
import recipesJSON from './json/recipes.json';

class App extends Component {

  constructor() {
    super();
    
    this.openDetails = this.openDetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);

    this.state = {
      recipes: [],
      filter: '',
      showDetail: false,
      details: {
        id: 0,
        name: '',
        image: '',
        tags: [],
        ingredients: [],
        preparation: ''
      }
    }
  }
  
  componentWillMount() {
    this.setState({
      recipes: recipesJSON
    });
  }

  updateSearchFilter(e) {
    this.setState({
      filter: e.target.value.toLowerCase()
    });
  }

  openDetails(e, id) {
    this.state.recipes.forEach(el => {
      if (el.id === id) {
        this.setState({
          showDetail: true,
          details: {
            id: el.id,
            name: el.name,
            image: el.image,
            tags: el.tags,
            ingredients: el.ingredients,
            preparation: el.preparation
          }
        });
        return;
      }
    });
  }

  closeDetails() {
    this.setState({
      showDetail: false
    });
  }

  render() {
    var colOuput = [];
    var output = [];
    this.state.recipes.filter(el => {
      return (el.name.toLowerCase().includes(this.state.filter) ||
              el.tags.some(tag => tag.toLowerCase().includes(this.state.filter)))
    }).forEach(el => {
      colOuput.push(
        <Col key={el.id} md="3">
          <div onClick={(e) => { this.openDetails(e, el.id) }}>
            <Card>
              <Card.Img src={el.image} width="50%" height="175px"/>
              <Card.Body>
                <Card.Title>{el.name}</Card.Title>
                <Card.Text>{el.tags.join(", ")}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>
      )
    });
    while(colOuput.length) output.push(<Row key={colOuput.length}>{colOuput.splice(0,4)}</Row>);
    
    return (
      <div className="App">
        <Container>
          <h1>Recipes</h1>
          <InputGroup className="mb-3" onChange={this.updateSearchFilter.bind(this)}>
            <FormControl placeholder="Search" aria-label="Search" aria-describedby="search-recipe"/>
          </InputGroup>
          {output}
          <Modal size="lg" show={this.state.showDetail} onHide={this.closeDetails}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.details.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><b>Tags: </b>{this.state.details.tags.join(', ')}</p>
              <hr></hr>
              <p><b>Ingredients: </b>{this.state.details.ingredients.join(', ')}</p>
              <hr></hr>
              {this.state.details.preparation.split('\n').map((item, i) => {
                return <p key={i}>{item}</p>
              })}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeDetails}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    );
  }

}

export default App;
