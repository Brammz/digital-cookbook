import React, { Component } from 'react';
import { Container, Col, Row, Card, InputGroup, FormControl, Modal, Button } from 'react-bootstrap';
import './App.css';
import { SHEET, KEY } from './secrets';

class App extends Component {

  constructor() {
    super();

    this.searchBar = React.createRef();
    this.clearSearchbar = this.clearSearchbar.bind(this);
    this.selectRandom = this.selectRandom.bind(this);
    this.openDetails = this.openDetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);

    this.state = {
      recipes: [],
      filter: '',
      showClear: false,
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
          for (let j = 0; j < values[i].length; j++) {
            row[values[0][j]] = ((values[0][j] === 'tags' || values[0][j] === 'ingredients') ? values[i][j].split(', ') : values[i][j]);
          }
          rows.push(row);
        }
        this.setState({
          recipes: rows
        });
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

  selectRandom(e) {
    const id = Math.floor(Math.random() * (this.state.recipes.length - 1) + 1);
    this.openDetails(e, id);
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
            <div onClick={e => this.openDetails(e, r.id) }>
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
              <Button className="straight-corners" onClick={this.selectRandom}>Random</Button>
            </InputGroup.Append>
          </InputGroup>
          {output}
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
