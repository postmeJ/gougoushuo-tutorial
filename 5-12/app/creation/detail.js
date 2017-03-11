var React = require('react-native')
var Icon = require('react-native-vector-icons/Ionicos')
var Video = require('react-native-video').default

var StyleSheet = React.StyleSheet
var Text = React.Text
var View = React.View
var TouchableOpacity = React.TouchableOpacity
var Dimensions = React.Dimensions
var ActivityIndicatorIOS = React.ActivityIndicatorIOS


var width = Dimensions.get('window').width

var Detail = React.createClass({
  getInitialState() {
    var data = this.props.data
    return {
      data: data,
      videoOk: true,
      videoLoaded: false,
      playing: false,
      paused: false,
      videoProgress: 0.01,
      videoTotal: 0,
      currentTime: 0,
      rate: 1,
      muted: false,
      resizeMode: 'contain',
      repeat: false
    }
  },

  
  _pop() {
    this.props.navigator.pop()
  },
  _onLoadStart() {
    console.log('load start')
  },
  _onLoad() {
    console.log('loads')

  },
  _onProgress(data) {
    if (!this.state.videoLoaded) {
      this.setState({
        videoLoaded: true
      })
    }
    var duration = data.playableDuration
    var currentTime = data.currentTime
    var percent = Number((currentTime / duration).toFixed(2))
    var newState = {
      videoTotal: duration,
      currentTime: Number(data.currentTime.toFixed(2)),
      videoProgress: percent
    }
    if (!this.state.videoLoaded) {
      newState.videoLoaded = true
    } else if (!this.state.playing) {
      newState.playing = true
    }
    this.setState(newState)
  },
  _onEnd() {
    this.setState({
      videoProgress: 1,
      playing: false
    })
  },
  _onError(e) {
    this.setState({videoOk: false})
    console.log(e)
    console.log('error')

  },
  _rePlay() {
    this.refs.videoPlayer.seek(0)
  },
  _pause() {
    if (!this.state.paused) {
      this.setState({
        paused: true
      })
    }
  },
  _resume() {
    if (this.state.paused) {
      this.setState({
        paused: false
      })
    }
  },
  render: function() {
    return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBox} onPress={this._pop}>
          <Icon name='ios-arrow-back' style={styles.backIcon} />
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          视频详情页
        </Text>
      </View>
      <View style={styles.videoBox}>
        <Video 
          ref='videoPlayer'
          source={{uri: data.video}} 
          style={styles.video}
          volume={5}
          paused={this.state.paused}
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

        {
          !this.state.videoOk && <Text style={styles.failText}>视频出错了！很抱歉</Text>
        }
        {
          !this.state.videoLoaded && <ActivityIndicatorIOS color="#ee735c" style={styles.loading}/>
        }
        {
          this.state.videoLoaded && !this.state.playing 
          ? <Icon 
              onPress={this._rePlay}
              size={48}
              name='ios-play'
              style={styles.playIcon} />
          : null
        }
        {
          this.state.videoLoaded && this.state.playing
          ? <TouchableOpacity onPress={this._pause} style={styles.pauseBtn}>
            {
              this.state.paused
              ? <Icon onPress={this._resume} size={48} name="ios-play" style={styles.resumeIcon} />
              : <Text></Text>
            }
            </TouchableOpacity>
          : null
        }
        <View style={styles.progressBox}>
          <View style={[styles.progressBar, {width: width * this.state.videoProgress}]}></View>
        </View>
      </View>
    </View>
    )
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 64,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  backBox: {
    position: 'absolute',
    left: 12,
    top: 32,
    width: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    width: width - 120,
    textAlign: 'center',
  },
  backIcon: {
    color: '#999',
    fontSize: 20,
    marginRight: 5,
  },
  backText: {
    color: '#999',
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
  },

  failText: {
    position: 'absolute',
    left: 0,
    top: 180,
    width: width,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent'
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: 140,
    width: width,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  progressBox: {
    width: width,
    height: 2,
    backgroundColor: '#ccc'
  },
  progressBar: {
    width: 1,
    height: 2,
    backgroundColor: '#ff6600'
  },
  playIcon: {
    position: 'absolute',
    top: 140,
    left: width / 2 - 30,
    width: 60,
    height: 60,
    paddingTop: 8,
    paddingLeft: 22,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    color: '#ed7b66'
  },
  pauseBtn: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: 360
  },
  resumeIcon: {
    position: 'absolute',
    top: 140,
    left: width / 2 - 30,
    width: 60,
    height: 60,
    paddingTop: 8,
    paddingLeft: 22,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    color: '#ed7b66'
  },
    
});

module.exports = Detail