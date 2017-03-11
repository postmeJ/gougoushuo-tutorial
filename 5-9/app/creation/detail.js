var React = require('react-native')
var Icon = require('react-native-vector-icons/Ionicos')
var Video = require('react-native-video').default

var StyleSheet = React.StyleSheet
var Text = React.Text
var View = React.View
var Dimensions = React.Dimensions

var width = Dimensions.get('window').width

var Detail = React.createClass({
  getInitialState() {
    var data = this.props.data
    return {
      data: data,
      rate: 1,
      muted: false,
      resizeMode: 'contain',
      repeat: false
    }
  },

  
  _backToList() {
    this.props.navigator.pop()
  },
  _onLoadStart() {
    console.log('load start')
  },
  _onLoad() {
    console.log('loads')

  },
  _onProgress(data) {
    console.log(data)
    console.log('progress')

  },
  _onEnd() {
    console.log('end')

  },
  _onError(e) {
    console.log(e)
    console.log('error')

  },

  render: function() {
    return (
    <View style={styles.container}>
      <Text onPress={this._backToList}>详情页面</Text>
      <View style={styles.videoBox}>
        <Video ref='videoPlayer'
        source={{uri: data.video}} 
        style={styles.video}
        volume={5}
        paused={false}
        rate={this.state.rate}
        muted={this.state.muted}
        resizeMode={this.state.resizeMode}
        repeat={this.state.repeat}

        onLoadStart={this._onLoadStart}
        onLoad={this._onLoad}
        onProgress={this._onProgress}
        onEnd={this._onEnd}
        onError={this._onError}
        />
      </View>
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
  videoBox: {
    width: width,
    height: 360,
    backgroundColor: '#000'
  },
  video: {
    width: width,
    height: 360,
    backgroundColor: '#000'
  }
});

module.exports = Detail