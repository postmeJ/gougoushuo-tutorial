var React = require('react-native')
var Icon = require('react-native-vector-icons/Ionicos')
var StyleSheet = React.StyleSheet
var Text = React.Text
var View = React.View
var AsyncStorage = React.AsyncStorage
var TouchableOpacity = React.TouchableOpacity
var Dimensions = React.Dimensions

var width = Dimensions.get('window').width

var Account = React.createClass({
  getInitialState() {
    var user = this.state.user || {}
    return {
      user: user
    }
  },
  componentDidMounti() {

  },
  render() {
    var user = this.state.user
    return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle}>我的账号</Text>
      </View>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarTip}>添加狗狗头像</Text>

        <TouchableOpacity style={styles.avatarBox}>
          <Icon
            name='ios-cloud-upload-outline'
            style={styles.plusIcon} />      
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#eee',
  },
  avatarBox: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
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