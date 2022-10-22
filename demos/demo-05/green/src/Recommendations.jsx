import * as React from 'react';
import { allRecommendations } from './recos';

export const Recommendations = ({ item }) => {
  const recommendations = allRecommendations[item] || [];
  return (
    <div className="green-recos" id="reco">
      <h3>Related Products</h3>
      {recommendations.map(recommendation => (
        <img src={recommendation.image} key={recommendation.id} alt={`Recommendation ${recommendation.id}`} />
      ))}
    </div>
  );
};
