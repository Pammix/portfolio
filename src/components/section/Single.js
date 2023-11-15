import React, { Component } from 'react';

import CategoryCard from './../parts/CategoryCard';
import CaptionWrap from '../parts/Caption';
import Button from './../buttons/Button';
import H1 from '../headers/H1';
import ContainerCategory from './../parts/Contain';
import Position from './../parts/PositionContainer';
import { Link } from 'react-router-dom';
import Par from './../parts/Paragraph';
import { createBucketClient } from '@cosmicjs/sdk';

export default class Single extends Component {
  state = {
    img: null
  };
    
  componentDidMount = async () => {
    window.scrollTo(0, 100);
    const link = this.props.match.params.slug;
    const cosmic = createBucketClient({
      bucketSlug: 'pamela-portfolio-photo',
      readKey: '5rKxqMPGLYpdCUteF6GYcfoNhKi8RXhx6RjhcO98eDyxWvYxMU',
    });
    const data = await cosmic.objects.find({
      slug: `${link}`,
    });
    this.setState({
      img: data.objects[0]
    });

  console.log(this.state.img)
  };

  render() {
    return (
      <ContainerCategory>
        <CategoryCard index={0}>
          {this.state.img && (
            <img src={this.state.img.metadata.img.url} alt='img' index={0} />
          )}
          <CaptionWrap index={0}>
            <Position index={0}>
              {this.state.img && <H1 isBig>{this.state.img.title}</H1>}
              {this.state.img && (
                <Par
                  dangerouslySetInnerHTML={{ __html: this.state.img.content }}
                />
              )}
            </Position>
          </CaptionWrap>
        </CategoryCard>
        <br /> <br />
        <Link to={'/'}>
          <Button>Go back</Button>
        </Link>
      
      </ContainerCategory>
    );
  }
}
