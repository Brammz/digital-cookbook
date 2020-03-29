import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { Ingredient, Tag } from '../types';

type Extras = Ingredient | Tag;

interface ExtrasListProps {
  items: Extras[];
}

const ExtrasList: React.FC<ExtrasListProps> = ({ items }) => {
  const reducedItems = items.reduce((acc, item) => {
    let letter = item.name.slice(0,1).toUpperCase();
    if (!acc[letter]) acc[letter] = [item];
    else acc[letter].push(item);
    return acc;
  }, {} as { [key: string]: Extras[] });

  return (
    <List subheader={<li />} style={{ textAlign: 'center' }}>
      {Object.keys(reducedItems).sort().map(key => (
        <li key={key}>
          <ul>
            <ListSubheader>{key}</ListSubheader>
              {reducedItems[key].sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).map(item => (
                <Link key={item.id} to={`/${items[0] instanceof Ingredient ? 'ingredient' : 'tag'}/${item.id}`} style={{ color: 'inherit', 'cursor': 'inherit', 'textDecoration': 'inherit' }}>
                  <ListItem style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <ListItemText primary={item.name.toLowerCase().replace(/./, c => c.toUpperCase())} />
                  </ListItem>
                </Link>
              ))}
          </ul>
        </li>
      ))}
    </List>
  );
};

export default ExtrasList;
