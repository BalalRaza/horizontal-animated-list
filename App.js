/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Dimensions,
  Text,
  Animated,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: windowWidth } = Dimensions.get('window');

const size = 64;
const backgroundColor = '#F5F5F5';
const borderRadius = 12;

const showBorder = {
  borderWidth: 1,
  borderColor: 'black',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor,
    padding: 16,
  },
  separator: {
    width: 20,
  },
  card: {
    height: size,
    width: size,
    borderRadius,
    backgroundColor: 'white',
    marginVertical: 10,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    padding: 5,
    flexDirection: 'row',
    borderRadius,
  },
  cardContained: {
    margin: 5,
    marginRight: 0,
  },
  description: {
    paddingLeft: 20,
    paddingRight: 25,
    justifyContent: 'center',
  },
  category: {
    fontSize: 20,
    color: 'white',
  },
  amount: {
    fontSize: 16,
    color: 'white',
  },
});

const DATA = [
  {
    icon: 'cutlery',
    category: 'Cafe',
    amount: 40,
    colors: { dark: '#002171', primary: '#0d47a1' },
  },
  {
    icon: 'shopping-basket',
    category: 'Grocery',
    amount: 600,
    colors: { dark: '#008ba3', primary: '#00bcd4' },
  },
  {
    icon: 'taxi',
    category: 'Taxi',
    amount: 56,
    colors: { dark: '#c79100', primary: '#ffc107' },
  },
  {
    icon: 'gear',
    category: 'Gym',
    amount: 120,
    colors: { dark: '#bf5f82', primary: '#f48fb1' },
  },
];

function Item(props) {
  const { icon, colors } = props.data;

  if (!props.selected) {
    return (
      <View style={styles.card}>
        <Icon name={icon} size={34} color={colors.primary} />
      </View>
    );
  }

  const { category, amount } = props.data;
  return (
    <View style={[styles.cardContainer, { backgroundColor: colors.primary }]}>
      <View style={[styles.card, styles.cardContained, { backgroundColor: colors.dark }]}>
        <Icon name={icon} size={34} color="white" />
      </View>

      <View style={styles.description}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.amount}>{`$ ${amount}`}</Text>
      </View>
    </View>
  );
}

class App extends React.Component {
  state = {
    currentIndex: 0,
    fadeIn: new Animated.Value(0),
    fadeOut: new Animated.Value(1),
  };

  carousel = React.createRef();

  render() {
    console.log('see ->', this.carousel.current);
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
        <View style={styles.container}>
          <Carousel
            ref={(ele) => { this.carousel = ele; }}
            data={DATA}
            renderItem={({ item, index }) => {
              return (
                <Item
                  data={item}
                  selected={this.state.currentIndex === index}
                />
              );
            }}
            keyExtractor={item => item.category}
            sliderWidth={windowWidth}
            itemWidth={175}
            containerCustomStyle={{ flexGrow: 0 }}
            activeSlideAlignment="start"
            activeAnimationType="decay"
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            onSnapToItem={(slideIndex) => {
              this.setState({ currentIndex: slideIndex });
            }}
          />
        </View>
      </>
    );
  }
}

export default App;
