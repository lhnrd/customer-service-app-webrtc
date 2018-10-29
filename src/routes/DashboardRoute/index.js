import { connect } from 'react-redux';
import { compose } from 'recompose';

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
    avgCallRating: avgCallRatingSelector(state),
    avgServiceRating: avgServiceRatingSelector(state),
    solvedCalls,
    notSolvedCalls,
    notAnsweredCalls,
    totalCalls: solvedCalls + notSolvedCalls + notAnsweredCalls,
  };
};

export default compose(connect(mapStateToProps))(DashboardPage);
