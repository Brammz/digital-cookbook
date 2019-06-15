import React, { Component } from 'react';
import { Container, Col, Row, Card, InputGroup, FormControl, Modal, Form, Button, Image } from 'react-bootstrap';
import './App.css';
import { SHEET, KEY, CLIENTID } from './secrets';

class App extends Component {

  constructor() {
    super();

    this.searchBar = React.createRef();
    this.clearSearchbar = this.clearSearchbar.bind(this);
    this.openSuggestions = this.openSuggestions.bind(this);
    this.closeSuggestions = this.closeSuggestions.bind(this);
    this.openAddRecipe = this.openAddRecipe.bind(this);
    this.closeAddRecipe = this.closeAddRecipe.bind(this);
    this.submitRecipe = this.submitRecipe.bind(this);
    this.openDetails = this.openDetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);

    this.state = {
      user: '',
      rawValues: [],
      recipes: [],
      filter: '',
      showClear: false,
      showSuggestions: false,
      suggestedRecipes: [],
      showAddRecipe: false,
      showDetail: false,
      details: {
        id: 0,
        name: '',
        image: '',
        tags: [],
        ingredients: [],
        preparation: ''
      },
      hasError: false
    }
  }

  componentDidMount() {
    const hash = window.location.hash.slice(2);
    const user = (hash === '' ? 'BRAM' : hash)
    fetch('https://sheets.googleapis.com/v4/spreadsheets/' + SHEET + '/values/' + user + '?majorDimension=ROWS&key=' + KEY)
      .then(response => response.json())
      .then(data => {
        const values = data.values;
        const rows = [];
        for (let i = 1; i < values.length; i++) {
          let row = {};
          for (let j = 0; j < values[0].length; j++) {
            if (values[i][j] === undefined) {
              row[values[0][j]] = '' 
            } else {
              if (values[0][j] === 'id') row[values[0][j]] = parseInt(values[i][j]);
              else row[values[0][j]] = ((values[0][j] === 'tags' || values[0][j] === 'ingredients') ? values[i][j].split(', ') : values[i][j]);
            }
          }
          rows.push(row);
        }
        this.setState({
          user: user,
          rawValues: values,
          recipes: rows.sort((a,b) => 0.5 - Math.random())
        });
      })
      .catch(err => this.setState({ hasError: true }));
  }

  submitRecipe(e) {
    e.preventDefault();
    var newValues = [this.state.rawValues.length.toString()];
    for (let i = 0; i < e.target.length-1; i++) {
      newValues.push(e.target[i].value);
    }
    console.log(newValues);
    // fetch('https://sheets.googleapis.com/v4/spreadsheets/' + SHEET + '/values/' + this.state.user + ':append?key=' + KEY, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': 'Bearer ' + CLIENTID,
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: {
    //     data: JSON.stringify({
    //       values: [
    //         newValues
    //       ]
    //     })
    //   }
    // }).catch(err => console.err(err));
    this.closeAddRecipe();
  }

  openAddRecipe(e) {
    this.setState({
      showAddRecipe: true
    });
  }

  closeAddRecipe(e) {
    this.setState({
      showAddRecipe: false
    });
  }

  updateSearchFilter(e) {
    this.setState({
      filter: e.target.value.toLowerCase(),
      showClear: e.target.value !== ''
    });
  }

  clearSearchbar(e) {
    this.searchBar.current.value = '';
    this.setState({
      filter: '',
      showClear: false
    });
  }

  openSuggestions(e) {
    var suggestions = [];
    if (this.state.recipes.length < 3) {
      suggestions = this.state.recipes.slice(0);
    } else {
      var ids = [];
      while (ids.length < 3) {
        const id = Math.floor(Math.random() * this.state.recipes.length);
        if (!ids.includes(id)) {
          ids.push(id);
          suggestions.push(this.state.recipes[id])
        }
      }
    }
    this.setState({
      showSuggestions: true,
      suggestedRecipes: suggestions
    });
  }

  closeSuggestions(e) {
    this.setState({
      showSuggestions: false
    });
  }

  openDetails(id) {
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
    if (this.state.hasError) return <h2><center>Something went wrong</center></h2>;
    var recipesCopy = this.state.recipes.slice(0);
    var filters = this.state.filter.endsWith(',') ? this.state.filter.slice(0, -1).split(',') : this.state.filter.split(',');
    var colOutput = [];
    var output = [];
    
    recipesCopy
      .map(r => r.nrOfMatches = 0);
    recipesCopy
      .filter(r => {
        filters.forEach(f => {
          if (r.name.toLowerCase().includes(f) || r.tags.some(t => t.toLowerCase().includes(f)) || r.ingredients.some(i => i.toLowerCase().includes(f))) r.nrOfMatches++;
        })
        if (r.nrOfMatches > 0) return true;
        return false;
      })
      .sort((a, b) => b.nrOfMatches - a.nrOfMatches)
      .forEach(r => {
        colOutput.push(
          <Col key={r.id} md="3">
            <div onClick={e => this.openDetails(r.id) }>
              <Card>
                <Card.Img src={r.image} height="175px"/>
                <Card.Body>
                  <Card.Title>{r.name}</Card.Title>
                  <Card.Text>{r.tags.join(", ")}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        )
      });    
    while(colOutput.length) output.push(<Row key={colOutput.length}>{colOutput.splice(0,4)}</Row>);
    
    return (
      <div className="App">
        <Container>
          <h1>What will you eat today?</h1>
          <InputGroup className="mb-3" onChange={this.updateSearchFilter.bind(this)}>
            <FormControl ref={this.searchBar} className="search-bar" placeholder="Search (e.g. italian,pasta,easy)" aria-label="Search" aria-describedby="search-recipe"/>
            {this.state.showClear &&
              <InputGroup.Append className="no-border" onClick={this.clearSearchbar}>
                <InputGroup.Text className="no-border"><i className="fas fa-times"></i></InputGroup.Text>
              </InputGroup.Append>
            }
            <InputGroup.Append>
              <Button className="straight-corners" onClick={this.openSuggestions}>Suggestions</Button>
              <Button className="straight-corners left-border-dark" onClick={this.openAddRecipe}><i className="fas fa-plus"></i></Button>
            </InputGroup.Append>
          </InputGroup>

          {output}

          <Modal size="xl" show={this.state.showSuggestions} onHide={this.closeSuggestions}>
            <Modal.Header closeButton>
              <Modal.Title>Pick your favorite</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="suggestion-row">
                {this.state.suggestedRecipes.map((suggestion, i) => {
                  if (i === 0) {
                    return (
                      <Col key={suggestion.id} md="4">
                        <div className="suggestion" onClick={() => {this.closeSuggestions();this.openDetails(suggestion.id)}}>
                          <Image src={suggestion.image} className="suggestion-image"></Image>
                          <h3 className="suggestion-title"><center>{suggestion.name}</center></h3>
                          <center><p className="suggestion-text">{suggestion.tags.join(', ')}</p></center>
                          <center><p className="suggestion-text">{suggestion.ingredients.join(', ')}</p></center>
                        </div>
                      </Col>
                    )
                  } else {
                    return (
                      <Col key={suggestion.id} md="4" className="left-border-light">
                        <div className="suggestion" onClick={() => {this.closeSuggestions();this.openDetails(suggestion.id)}}>
                          <Image src={suggestion.image} className="suggestion-image"></Image>
                          <h3 className="suggestion-title"><center>{suggestion.name}</center></h3>
                          <center><p className="suggestion-text">{suggestion.tags.join(', ')}</p></center>
                          <center><p className="suggestion-text">{suggestion.ingredients.join(', ')}</p></center>
                        </div>
                      </Col>
                    )
                  }
                })}
              </Row>
            </Modal.Body>
          </Modal>

          <Modal size="lg" show={this.state.showAddRecipe} onHide={this.closeAddRecipe}>
            <Modal.Header closeButton>
              <Modal.Title>Add a new recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id="addNewRecipe" onSubmit={this.submitRecipe}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>
                <Form.Group controlId="tags">
                  <Form.Label>Tags</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>
                <Form.Group controlId="ingredients">
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>
                <Form.Group controlId="image">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>
                <Form.Group controlId="preparation">
                  <Form.Label>Preparation</Form.Label>
                  <Form.Control as="textarea" rows="5" />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeAddRecipe}>Close</Button>
              <Button variant="primary" form="addNewRecipe" type="submit">Add</Button>
            </Modal.Footer>
          </Modal>

          <Modal size="lg" show={this.state.showDetail} onHide={this.closeDetails}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.details.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.details.tags.length > 0 &&
                <div>
                  <p><b>Tags: </b>{this.state.details.tags.join(', ')}</p>
                  <hr></hr>
                </div>
              }
              {this.state.details.ingredients.length > 0 &&
                <div>
                  <p><b>Ingredients: </b>{this.state.details.ingredients.join(', ')}</p>
                  <hr></hr>
                </div>
              }
              {this.state.details.preparation.split('\n').map((item, i) => {
                return <p key={i}>{item}</p>
              })}
            </Modal.Body>
          </Modal>

        </Container>
      </div>
    );
  }

}

export default App;
