/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

var React = require('react-native')
var Icon = require('react-native-vector-icons/Ionicos')
var Component = React.Component
var AppRegistry = React.AppRegistry
var StyleSheet = React.StyleSheet
var Text = React.Text
var View = React.View
var TabBarIOS = React.TabBarIOS

var List = React.createClass({
  render: function() {
    return (
    <View style={styles.container}>
      <Text>列表页面</Text>
    </View>
    )
  }
})

var Edit = React.createClass({
  render: function() {
    return (
    <View style={styles.container}>
      <Text>制作页面</Text>
    </View>
    )
  }
})

var Account = React.createClass({
  render: function() {
    return (
    <View style={styles.container}>
      <Text>账号页面</Text>
    </View>
    )
  }
})

var imoocApp = react.createClass({
  getInitialState() {
    console.log('son', 'getDefaultProps')
    return {
      selectedTab: 'list'
    }
  },

  render: function() {
    return (
      <TabBarIOS
        tintColor="#ee735c">
        <Icon.TabBarItem
          iconName= 'ios-videocam-outline'
          selectedIconName= 'ios-videocam'
          selected={this.state.selectedTab === 'list'}
          onPress={() => {
            this.setState({
              selectedTab: 'list',
            })
          }}>
          <List />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName= 'ios-recording-outline'
          selectedIconName= 'ios-recording'
          selected={this.state.selectedTab === 'edit'}
          onPress={() => {
            this.setState({
              selectedTab: 'edit',
            })
          }}>
          <Edit />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName= 'ios-more-outline'
          selectedIconName= 'ios-more'
          selected={this.state.selectedTab === 'account'}
          onPress={() => {
            this.setState({
              selectedTab: 'account'
            })
          }}>
          <Account />
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('imoocApp', () => imoocApp)
