/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

var React = require('react-native')
var {
  AppRegistry,
  StyleSheet,
  Text,
  View
} = React

var son = react.createClass({
  getDefaultProps() {
    console.log('son', 'getDefaultProps')
  },
  getInitialState() {
    console.log('son', 'getDefaultProps')
    return {
      times: this.props.times
    }
  },
  componentWillMount() {
    console.log('son', 'componentWillMount')
  },
  componentDidMount() {
    console.log('son', 'componentDidMount')
  },
  componentWillReciveProps(props) {
    console.log(this.props)
    console.log('son', 'componentWillReciveProps')
    this.setState({
      times: props.times
    })
  },
  shouldComponentUpdate() {
    console.log('son', 'shouldComponentUpdate')
    return true
  },
  componentWillUpdate() {
    console.log('son', 'componentWillUpdate')
  },
  compontentDidUpdate() {
    console.log('son', 'compontentDidUpdate')
  },

  timesPlus() {
    let times = this.state.times
    times++
    this.setState({
      times: times
    })
  },

  timesReset() {
    this.props.timesReset()
  },

  render() {
    console.log('son', 'render')
    return (
      <View style={styles.container}>
        <Text style={styles.instructions} onPress={this.timesPlus}>
          儿子：有本事揍我啊!
        </Text>
        <Text style={styles.instructions}>
          你居然揍我 {this.state.times}次
        </Text>
        <Text style={styles.instructions} onPress={this.timesReset}>
          信不信我亲亲你
        </Text>
      </View>
    );
  }
})

var imoocApp = react.createClass({
  getDefaultProps() {
    console.log('father', 'getDefaultProps')

  },
  getInitialState() {
    console.log('father', 'getInitialState')
    return {
      hit: false,
      times: 2
    }
  },
  componentWillMount() {
    console.log('father', 'componentWillMount')
  },
  componentDidMount() {
    console.log('father', 'componentDidMount')
  },
  shouldComponentUpdate() {
    console.log('father', 'shouldComponentUpdate')
    return true
  },
  componentWillUpdate() {
    console.log('father', 'componentWillUpdate')
  },
  compontentDidUpdate() {
    console.log('father', 'compontentDidUpdate')
  },

  timesPlus() {
    let times = this.state.times
    times += 3
    this.setState({
      times: times
    })
  },

  timesReset() {
    this.setState({
      times: 0
    })
  },

  willHit() {
    this.setState({
      hit: !this.state.hit
    })
  },

  render() {
    console.log('father', 'render')
    return (
      <View style={styles.container}>
        {
          this.state.willHit
            ? <son times={this.state.times} timesReset={this.timesReset} />
            : null
        }
        <son />
        <Text style={styles.welcome} onPress={this.timesReset}>
          老子说：心情好就放你一马
        </Text>
        <Text style={styles.instructions} onPress={this.willHit}>
          到底揍不揍
        </Text>
        <Text style={styles.instructions}>
          就揍你{this.state.times}次而已
        </Text>
        <Text style={styles.instructions} onPress={this.willHit}>
          不听话，再揍你 3 次
        </Text>
      </View>
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
