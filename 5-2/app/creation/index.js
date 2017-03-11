var React = require('react-native')
var Icon = require('react-native-vector-icons/Ionicos')

var StyleSheet = React.StyleSheet
var Text = React.Text
var View = React.View
var TouchableHighlight = React.TouchableHighlight 
var ListView = React.ListView
var Image = React.Image
var Dimensions = React.Dimensions

var width = Dimensions.get('window').width

var List = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([
      {
          "_id":"540000200511130440","author":
          {
              "avator":"http://dummyimage.com/640x640/198577)","nickname":"Scott Walker"
          }
          ,"thumb":"http://dummyimage.com/1280x720/6a31dd)","title":"Wyvt wouayqj mcucm vbbv hgemqltn ixuqqui jgjwjkik qgvhoo anrg fpoltshmie fbxoz rosx obsv vxhuj. Snizjnv stmxp pzahxxiy sijc twuvwje fxlyjtgg ncggqrrlm drfjgifjm gosyfvsll ydpdtbd pejnxirit oscilqp xkkouqlw ultewvjl qejwrlw. Syibik lubo ucqeofqw jxhsz mwsy wog feikhub kheo dlcxlss fcavfreze kfre gnxilgugty znis jgl.","video":""
      }
      ,
      {
          "_id":"130000198607077705","author":
          {
              "avator":"http://dummyimage.com/640x640/ea4fac)","nickname":"William Miller"
          }
          ,"thumb":"http://dummyimage.com/1280x720/7dd834)","title":"Kdta hlj ehp jcuxnd jpw hlmzrf pibdexfem ngivtts vdtss leihlyme wskinjbo skiswjgkp oqfy yvmwhb gddqmnt fzzbns peha kgkkgxx.","video":""
      }
    ]),
    };
  },
  renderRow: function(row) {
    return (
      <TouchableHighlight>
        <View style={styles.item}>

          <Text style={styles.title}>{row.title}</Text>

          <image
            source={{uri: row.thumb}}
            style={styles.thumb}
          >
            <Icon
              name='ios-play'
              size={28}
              style={styles.play} />
          </image>

          <View style={styles.itemFooter}>

            <View style={styles.handleBox}>
              <Icon
                name='ios-heart-outline'
                size={28}
                style={styles.up} />
              <Text style={styles.handleText}>喜欢</Text>
            </View>

            <View style={styles.handleBox}>
              <Icon
                name='ios-chatboxes-outline'
                size={28}
                style={styles.commentIcon} />
              <Text style={styles.handleText}>评论</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>     
    )
  },

  render: function() {
    return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>列表页面</Text>
      </View>

      <ListView 
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        enableEmptySections={true}
        automaticallyAdjustContentInsets={false}
      />
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
    paddingTop: 25,
    paddingBottom: 12,
    backgroundColor: '#ee735c'
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  },
  item: {
    width: width,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  thumb: {
    width: width,
    height: width * 0.56,
    resizeMode: 'cover'
  },
  title: {
    padding: 10,
    fontSize: 18,
    color: '#333'
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee'
  },
  handleBox: {
    padding: 10,
    flexDirection: 'row',
    width: width / 2 - 0.5,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  play: {
    position: absolute,
    bottom: 14,
    right: 14,
    width: 46,
    height: 46,
    paddingTop: 9,
    paddingLeft: 18,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 23,
    color: '#ed7b66'
  },
  handleText: {
    paddingLeft: 12,
    fontSize: 18,
    color: '#333'
  },
  up: {
    fontSize: 22,
    color: '#333'
  },
  commentIcon: {
    fontSize: 22,
    color: '#333'
  }
});

module.exports = List