var React = require('react-native')
var Icon = require('react-native-vector-icons/Ionicos')
var StyleSheet = React.StyleSheet
var Text = React.Text
var View = React.View

var Edit = React.createClass({
  render() {
    return (
    <View style={styles.container}>
      <Text>制作页面</Text>
    </View>
    )
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

module.exports = Edit