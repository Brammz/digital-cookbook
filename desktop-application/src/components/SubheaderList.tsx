import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { Ingredient, Tag } from '../types';

interface SubheaderListProps {
  items: Ingredient[] | Tag[];
}

const SubheaderList: React.FC<SubheaderListProps> = ({ items }) => {
  const reducedItems = items.reduce((acc, item) => {
    let letter = item.name.slice(0,1).toUpperCase();
    if (!acc[letter]) acc[letter] = [item.name.toLowerCase().replace(/./, c => c.toUpperCase())];
    else acc[letter].push(item.name.toLowerCase().replace(/./, c => c.toUpperCase()));
    return acc;
  }, {} as { [key: string]: string[] });

  return (
    <List subheader={<li />}>
      {Object.keys(reducedItems).sort().map(key => (
        <li key={key}>
          <ul>
            <ListSubheader>{key}</ListSubheader>
              {reducedItems[key].sort().map((value, index) => (
                <Link key={index} to="/ingredient/" style={{ color: 'inherit', 'cursor': 'inherit', 'textDecoration': 'inherit' }}>
                  <ListItem>
                    <ListItemText primary={value} />
                  </ListItem>
                </Link>
              ))}
          </ul>
        </li>
      ))}
    </List>
  );
};

export default SubheaderList;
