var React = require('react-native')
var sha1 = require('sha1')
var Icon = require('react-native-vector-icons/Ionicos')
var ImagePicker = require('NativeModules').ImagePickerManager

var request = require('../common/request')
var config = require('../common/config')

var StyleSheet = React.StyleSheet
var Text = React.Text
var View = React.View
var AsyncStorage = React.AsyncStorage
var TouchableOpacity = React.TouchableOpacity
var Dimensions = React.Dimensions

var width = Dimensions.get('window').width

var photoOptions = {
  title: '选择头像',
  cancelButtonTitle: '取消',
  tablePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '选择相册',
  quality: 0.75,
  allowsEditing: true,
  noData: false,
  storageOptions: { 
    skipBackup: true, 
    path: 'images'
  }
}

var CLOUDINARY = {
  cloud_name: 'liubinhui',  
  api_key: '755675477547144',  
  api_secret: 'YbD545WonnI2GhMITVhRDxy0aeg',
  base: 'http://res.cloudinary.com/liubinhui',
  image: 'https://api.cloudinary.com/v1_1/liubinhui/image/upload',
  video: 'https://api.cloudinary.com/v1_1/liubinhui/video/upload',
  audio: 'https://api.cloudinary.com/v1_1/liubinhui/raw/upload',
}
var Account = React.createClass({
  getInitialState() {
    var user = this.props.user || {}
    return {
      user: user
    }
  },
  componentDidMounti() {
    var that = this
    AsyncStorage.getItem('user')
      .then((data) => {
        var user
        if (data) {
          user = JSON.parse(data)
        }

        if (user && user.accessToken) {
          that.setState({
            user: user
          })
        }
      })
  },
  _pickPhoto() {
    var that = this
    ImagePicker.showImagePicker(photoOptions, (res) => {

      if (res.didCancel) {
        return
      }
      var avatarData = 'data:image/jpeg;base64,' + res.data
      var user = that.state.user
      user.avatar = avatarData
      that.setState({
        user: user,
      })

      var timestamp = Date.now()
      var tags = 'app,avatar'
      var folder = 'avatar'
      var signatureURL = config.api.base + config.api.signature
      var accessToken = this.state.user.accessToken

      request.post(signatureURL, {
        accessToken: accessToken,
        timestamp: timestamp,
        type: 'avatar',
      })
        .then((data) => {
          if (data && data.success) {
            var signature = 'folder=' + folder + '&tags=' + tags + '&timestamp=' + timestamp + CLOUDINARY.api_secret
            signature = sha1(signature)
          }
        })


    })
  },
  render() {
    var user = this.state.user
    return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle}>我的账号</Text>
      </View>

      {
        user.avatar
        ? <TouchableOpacity onPress={this._pickPhoto} style={styles.avatarContainer}>
            <Image source={{uri:user.avatar}} style={styles.avatarContainer}>
              <View style={styles.avatarBox}>
                <Image 
                  source={{uri:user.avatar}}
                  style={styles.avatar}
                />
              </View>  
              <Text style={styles.avatarTip}>戳这里换头像</Text>
            </Image>
          </TouchableOpacity>
        : <TouchableOpacity onPress={this._pickPhoto} style={styles.avatarContainer}>
            <Text style={styles.avatarTip}>添加狗狗头像</Text>
            <View style={styles.avatarBox}>
              <Icon
                name='ios-cloud-upload-outline'
                style={styles.plusIcon} />      
            </View>
          </TouchableOpacity>
      }
    </View>
    )
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    paddingTop: 25,
    paddingBottom: 12,
    backgroundColor: '#ee735c',
  },

  toolbarTitle: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  avatarContainer: {
    width: width,
    heigth: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#666',
  },
  avatarTip: {
    color: '#fff',
    backgroundColor: 'transparent',
    fontSize: 14,
  },
  avatarBox: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    marginBottom: 15,
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'cover',
    borderRadius: width * 0.1
  },
  plusIcon: {
    padding: 20,
    paddingLeft: 25,
    paddingRight: 25,
    color: '#999',
    fontSize: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  
});

module.exports = Account