import React, { Component } from 'react';
import styled from 'styled-components';
import Center from '../parts/Center';
import H1 from '../headers/H1';
import Par from './../parts/Paragraph';

const PageWrap = styled.div`
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    height: 100%;
    padding: 30px 0;
  }
  ${({ theme }) => theme.media.tablet} {
    padding: 150px 0;
  }
`;

export default class Contact extends Component {
  state = {
    content: null,
  };
  componentDidMount = async () => {
    const Cosmic = require('cosmicjs');
    const api = Cosmic();
    const bucket = api.bucket({
      slug: 'pamela-portfolio-photo' || 'imageapp',
      read_key: '5rKxqMPGLYpdCUteF6GYcfoNhKi8RXhx6RjhcO98eDyxWvYxMU' || '',
    });
    const data = await bucket.getObject({
      slug: 'contact',
    });
    this.setState({
      content: data.object,
    });
  };
  render() {
    console.log(this.state.content);

    return (
      <PageWrap>
        <Center>
          {this.state.content && (
            <H1 isBig center>
              {this.state.content.title}
            </H1>
          )}
          {this.state.content && (
            <Par
              dangerouslySetInnerHTML={{ __html: this.state.content.content }}
            />
          )}
          <H1>About author:</H1>
          <span>
            Created by: <a href='https://github.com/3ndrius'> 3ndrius </a>
          </span>
        </Center>
      </PageWrap>
    );
  }
}
