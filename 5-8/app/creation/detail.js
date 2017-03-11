var React = require('react-native')
var Icon = require('react-native-vector-icons/Ionicos')
var StyleSheet = React.StyleSheet
var Text = React.Text
var View = React.View

var Detail = React.createClass({
  _backToList() {
    this.props.navigator.pop()
  },

  render: function() {
    var row = this.props.row

    return (
    <View style={styles.container}>
      <Text onPress={this._backToList}>详情页面{row._id}</Text>
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

module.exports = Detail