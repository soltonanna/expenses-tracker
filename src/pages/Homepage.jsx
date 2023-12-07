import React from 'react';
import Container from '../components/Container';
import { HomepageContentInfo } from '../utils/content-info';

const Homepage = () => {
  return (
    <Container className="home-page">
      {
        HomepageContentInfo.map((item) => (
          <div key={item.id}>
            <div className='home-page__back-image'>
              <img src={item.imgUrl} alt={item.title} />
            </div>
            <div className='home-page__description'>
              <div dangerouslySetInnerHTML={{__html: item.desc}}></div>
            </div>
          </div>
        ))
      }
    </Container>
  )
}

export default Homepage;