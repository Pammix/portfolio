import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '../parts/Card';
import Img from '../parts/Figure';
import Anchor from './../parts/Anchor';
import { Link } from 'react-router-dom';
import Button from './../buttons/Button';

import { createBucketClient } from '@cosmicjs/sdk';

const GridContainer = styled.div`
  min-height: 100%;
  display: grid;
  margin: 150px auto;
  justify-items: center;
  grid-template-column: 1fr;
  grid-template-rows: 400px;
  grid-gap: 10px;
  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 320px 320px;
    width: 640px;
  }
  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 320px 320px 320px;
    width: 960px;
  }
  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: 320px 320px 320px 320px;
    width: 1280px;
    margin: 200px auto 100px auto;
  }
`;
export default class PartGrid extends Component {
  state = {
    picture: [], 
    images:[] };

  componentDidMount = async () => {
    let temp= [];
    const callApiSlug = async () => { window.scrollTo(0, 100);
      const slug = this.props.match.params.slug;
      const cosmic = createBucketClient({
        bucketSlug: 'pamela-portfolio-photo',
        readKey: '5rKxqMPGLYpdCUteF6GYcfoNhKi8RXhx6RjhcO98eDyxWvYxMU',
      });
      const data = await cosmic.objects.find({
        slug: `${slug}`,
      });
      this.setState({
        pictures: data.objects[0].metadata.images,
      });

      for (const element of this.state.pictures) {
        const img = await cosmic.objects.findOne({  id: element });
        temp.push(img.object);
      }
      console.log(temp);
      this.setState({
        images: temp
      });
  }
  callApiSlug();
  }
 
  render() {
    return (
      <> 
      <GridContainer column={true}>
         {this.state.images &&
          this.state.images.map((item, index) => {
            return (
              <Card key={index} as={Link} to={'/img/' + item.slug} onClick={() => localStorage.setItem("slug", this.props.match.params.slug)}>
                <Img src={item.metadata.img.url} alt='grid-img' />
                <Anchor as={Link} to={'/img/' + item.slug}>
                  <i className='fa fa-link' aria-hidden='true' />
                </Anchor>
              </Card>
            );
          })}
      </GridContainer>
      <Link to={'/'} style={{marginLeft: "14rem"}}>
          <Button>Go back</Button>
      </Link>
      </>
    );
  }
}
