import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCollectionsForPreview } from '../../redux/shop/shopSelectors';

import CollectionPreview from '../collection-preview/CollectionPreview'; 
import './collections-overview.scss';

const CollectionsOverview = ({ collections }) => {
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionprops }) => {
        return <CollectionPreview key={id} {...otherCollectionprops} />
      })}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
})
 
export default connect(mapStateToProps)(CollectionsOverview);