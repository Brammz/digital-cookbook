import React from 'react';
import { Card } from 'react-bootstrap';

function RecipeCard(props) {
    return (
        <Card>
            <Card.Img src={props.image} height="175px"/>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>{props.tags.join(', ')}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default RecipeCard;
