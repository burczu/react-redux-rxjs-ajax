import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { connect, Provider } from 'react-redux';
import * as actions from './actions';
import { reducer } from './reducer';

const store = createStore(
  reducer,
  { isLoading: false, isError: false, repositories: [] },
  applyMiddleware(thunk)
);

class Repositories extends React.Component {
  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  render() {
    const { isLoading, isError, repositories } = this.props;

    return (
      <div>
        {repositories.map((item, index) => {
          return (<div key={index}>
            {item.name}
          </div>);
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => dispatch(actions.getData())
  }
};

Repositories = connect(mapStateToProps, mapDispatchToProps)(Repositories);

render(
  <Provider store={store}>
    <Repositories />
  </Provider>
  , document.getElementById('root')
);