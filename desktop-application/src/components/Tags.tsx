import React from 'react';
import { Container } from '@material-ui/core';
import { SubheaderList } from '.';
import { Tag } from '../types';

interface TagsProps {
  tags: Tag[];
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
  const reducedTags = tags.reduce((acc, tag) => {
    let letter = tag.name.slice(0,1).toUpperCase();
    if (!acc[letter]) acc[letter] = [tag.name.toLowerCase().replace(/./, c => c.toUpperCase())];
    else acc[letter].push(tag.name.toLowerCase().replace(/./, c => c.toUpperCase()));
    return acc;
  }, {} as { [key: string]: string[] });

  return (
    <Container maxWidth="md" style={{ paddingTop: '25px' }}>
      <SubheaderList redirect="tag" items={reducedTags} />
    </Container>
  );
};

export default Tags;
