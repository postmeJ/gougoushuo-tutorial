/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

var React = require('react-native')
var Icon = require('react-native-vector-icons/Ionicos')

var List = require('./app/creation/index')
var Edit = require('./app/edit/index')
var Account = require('./app/account/Account')
var Login = require('./app/account/login')

var AppRegistry = React.AppRegistry
var StyleSheet = React.StyleSheet
var Text = React.Text
var View = React.View
var TabBarIOS = React.TabBarIOS
var Navigator = React.Navigator
var AsyncStorage = React.AsyncStorage


var imoocApp = react.createClass({
  getInitialState() {
    console.log('son', 'getDefaultProps')
    return {
      user: null,
      selectedTab: 'list',
      logined: false
    }
  },
  componentDidMount() {
    this._asyncAppStatus()
  },
  _asyncAppStatus() {
    var that = this
    AsyncStorage.getItem('user')
      .then((data) => {
        var user 
        var newState = {}
        if (data) {
          user = JSON.parse(data)
        }

        if (user && user.accessToken) {
          newState.user = user
          newState.logined = true
        } else {
          newState.logined = false
        }

        that.setState(newState)
      })
  },
  _afterLogin(user) {
    var that = this
    user = JSON.stringify(user)
    AsyncStorage.setItem('user',user)
      .then(() => {
        that.setState({
          logined: true,
          user: user
        })
      })
  },
  render() {
    if (!this.state.logined) {
      return <Login afterLogin={this._afterLogin} />
    }
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
          <Navigator
            initialRoute={{
              name: 'list',
              component: List
            }}
            configureScene={(route) => {
              return Navigator.SceneConfigs.FloatFromRight
            }}
            renderScene={(route, navigator) => {
              var Component = route.component
              return <Component {...route.params} navigator={navigator} />
            }}
          />
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
