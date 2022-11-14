import React from 'react';
import { Dimensions } from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';

export const isOrientationLandscape = ({ width, height }) => width > height;

export default function(WrappedComponent) {
  class withOrientation extends React.Component {
    dimensionChangeEventListener

    constructor() {
      super();

      const isLandscape = isOrientationLandscape(Dimensions.get('window'));
      this.state = { isLandscape };
    }

    componentDidMount() {
     this.dimensionChangeEventListener = Dimensions.addEventListener('change', this.handleOrientationChange);
    }

    componentWillUnmount() {
      this.dimensionChangeEventListener?.remove()
    }

    handleOrientationChange = ({ window }) => {
      const isLandscape = isOrientationLandscape(window);
      this.setState({ isLandscape });
    };

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }

  return hoistNonReactStatic(withOrientation, WrappedComponent);
}
