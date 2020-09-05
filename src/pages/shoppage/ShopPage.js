import React, { Component } from 'react';

import Collection from '../../components/collection/Collection'; 
import { SHOP_DATA } from './shop-data';

class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      collections: SHOP_DATA
     }
  }
  render() { 
    const { collections } = this.state;
    return (
      <div className="shop-page">
        {collections.map(({ id, ...otherCollectionprops }) => {
          return <Collection key={id} {...otherCollectionprops} />
        })}
      </div>
    );
  }
}
 
export default ShopPage;