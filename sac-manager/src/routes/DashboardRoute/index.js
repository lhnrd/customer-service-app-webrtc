import { connect } from 'react-redux';

import DashboardPage from 'src/pages/DashboardPage';
import {
  avgCallRatingSelector,
  avgServiceRatingSelector,
  solvedStatisticsSelector,
} from 'src/selectors/service-call';

const mapStateToProps = state => {
  const {
    solvedCalls,
    notSolvedCalls,
    notAnsweredCalls,
  } = solvedStatisticsSelector(state);

  return {
    avgCallRating: avgCallRatingSelector(state).toFixed(2),
    avgServiceRating: avgServiceRatingSelector(state).toFixed(2),
    solvedCalls,
    notSolvedCalls,
    notAnsweredCalls,
    totalCalls: solvedCalls + notSolvedCalls + notAnsweredCalls,
  };
};

export default connect(mapStateToProps)(DashboardPage);
