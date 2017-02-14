import React, { Component } from 'react';
import { Linking } from 'react-native'
import Meteor, { createContainer } from 'react-native-meteor';
import { Container, Content, ListItem, Text, List, Spinner, Body, Right, Icon } from 'native-base';

class Home extends Component {
  openUrl = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  };

  render() {
    if (!this.props.linksReady) {
      return <Spinner />;
    }

    return (
      <Container>
        <Content>
          <List
            dataArray={this.props.links}
            renderRow={(data) => (
              <ListItem
                onPress={() => this.openUrl(data.url)}
              >
                <Body>
                  <Text>{data.title}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

const WrappedHome = createContainer(() => {
  const linksHandler = Meteor.subscribe('links.all');

  return {
    linksReady: linksHandler.ready(),
    links: Meteor.collection('links').find(),
  };
}, Home);

WrappedHome.navigationOptions = {
  title: 'Home',
};

export default WrappedHome;
