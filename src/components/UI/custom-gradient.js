import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default class CustomGradientWidget extends React.PureComponent {
  constructor(props) {
    super(props);
  }


  render() {
    const [primaryColor, backgroundColor, textColor, iconColor, buttonColor] = [
      '#000000',
      '#005E61',
      '#005E61',
      '#888888',
      '#eeeeee',
    ];
    const colors = [
      primaryColor,
      backgroundColor,
      textColor,
      iconColor,
      buttonColor,
    ];
    return  (
      <LinearGradient
        colors={colors}
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 1.0}}
        style={{flex: 1}}>
        {this.props.children}
      </LinearGradient>
    )
  }
}
