var React = require('react-native')
var sha1 = require('sha1')
var Icon = require('react-native-vector-icons/Ionicos')
var ImagePicker = require('NativeModules').ImagePickerManager

var request = require('../common/request')
var config = require('../common/config')

var StyleSheet = React.StyleSheet
var Text = React.Text
var View = React.View
var AlertIOS = React.AlertIOS
var Image = React.Image
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

function avatar(id, type) {
  return CLOUDINARY.base + '/' + type + '/upload/' + id
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

      var timestamp = Date.now()
      var tags = 'app,avatar'
      var folder = 'avatar'
      var signatureURL = config.api.base + config.api.signature
      var accessToken = this.state.user.accessToken

      request.post(signatureURL, {
        accessToken: accessToken,
        timestamp: timestamp,
        folder: folder,
        tags: tags,
        type: 'avatar',
      })
        .catch((err) => {
          console.log(err)
        })
        .then((data) => {
          if (data && data.success) {
            var signature = 'folder=' + folder + '&tags=' + tags + '&timestamp=' + timestamp + CLOUDINARY.api_secret
            signature = sha1(signature)

              var body = new FormData()

              body.append('folder',folder)
              body.append('signature',signature)
              body.append('tags',tags)
              body.append('timestamp',timestamp)
              body.append('api_key',CLOUDINARY.api_key)
              body.append('resource_type','image')
              body.append('file',avatarData)

              that._upload(body)
          }
        })
    })
  },

  _upload(body) {
    var that = this
    var xhr = new XMLHttpRequest()
    var url = CLOUDINARY.image

    xhr.open('POST', url)
    xhr.onload = () => {
      if (xhr.status !== 200) {
        Alert.alert('请求失败')
        console.log(xhr.responseText)
        return 
      }

      if (!xhr.responseText) {
        Alert.alert('请求失败')
        return        
      }

      var response
      try {
        response = JSON.parse(xhr.response)
      } catch (e) {
        console.log(e)
        console.log('parse fails')
      }
      if (response && response.public_id) {
        var user = this.state.user

        user.avatar = avatar(response.public_id, 'image')

        that.setState({
          user: user
        })
      }
    }
    xhr.send(body)
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