import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';

interface SubheaderListProps {
  redirect: string;
  items: { [key: string]: string[] };
}

const SubheaderList: React.FC<SubheaderListProps> = ({ redirect, items }) => {
  return (
    <List subheader={<li />}>
      {Object.keys(items).sort().map(key => (
        <li key={key}>
          <ul>
            <ListSubheader>{key}</ListSubheader>
              {items[key].sort().map((value, index) => (
                <Link key={index} to={`/${redirect}/${value}`} style={{ color: 'inherit', 'cursor': 'inherit', 'textDecoration': 'inherit' }}>
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
