import React, { Component } from 'react';

const withDataLoading = (action, shouldLoad) => WrappedComponent =>
  class WithDataLoading extends Component {
    state = {
      loading: true,
      error: null,
    };

    async componentWillMount() {
      await this.loadData();
    }

    componentWillReceiveProps(nextProps) {
      if (shouldLoad && shouldLoad(this.props, nextProps)) {
        this.setState(
          {
            loading: true,
          },
          this.loadData
        );
      }
    }

    loadData = async () => {
      try {
        await action(this.props);
        this.setState({
          loading: false,
        });
      } catch (e) {
        this.setState({
          error: e,
          loading: false,
        });
      }
    };

    render() {
      const { loading } = this.state;
      if (loading) {
        return <div />;
      }

      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };

export default withDataLoading;
