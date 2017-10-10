import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Picker,
  Dimensions,
} from 'react-native'
import PropTypes from 'prop-types';

import styles from '../Styles/QuantityPickerStyles'

const propTypes = {
  buttonColor: PropTypes.string,
  labels: PropTypes.array,
  confirmText : PropTypes.string,
  cancelText : PropTypes.string,
  itemStyle: PropTypes.object,
  onSubmit: PropTypes.func,
  max: PropTypes.number.isRequired,
}

export default class CountryPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonColor: this.props.buttonColor || '#007AFF',
      modalVisible: false,
      selected: props.selected,
    }

    this.onPressCancel = this.onPressCancel.bind(this)
    this.onPressSubmit = this.onPressSubmit.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected
    })
  }

  select(selected){
    this.setState({
      selected
    })
  }

  onPressCancel() {
    this.setState({
      modalVisible: false,
    })
  }

  onPressSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.selected)
    }

    this.setState({
      modalVisible: false,
    })
  }

  onValueChange(selected) {
    this.setState({
      selected
    })
  }

  show() {
    this.setState({
      modalVisible: true,
    })
  }

  renderItem(country, index) {
    return (
      <PickerItem
        key={country.iso2}
        value={country.iso2}
        label={country.name}
      />
    )
  }

  render() {
    const { buttonColor } = this.state
    const { max } = this.props
    const itemStyle = this.props.itemStyle || {}
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalVisible}
        onRequestClose={() => {console.log("Country picker has been closed.")}}
      >
        <View style={styles.basicContainer}>
          <View style={[styles.modalContainer, {backgroundColor: this.props.pickerBackgroundColor || 'white'}]}>
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={this.onPressCancel}>
                <Text style={[{ color: buttonColor }, this.props.buttonTextStyle]}>
                  {this.props.cancelText || 'Cancel'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.onPressSubmit}>
                <Text style={[{ color: buttonColor }, this.props.buttonTextStyle]}>
                  {this.props.confirmText || 'Confirm'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.mainBox}>
              <Picker
                ref={'picker'}
                style={styles.bottomPicker}
                selectedValue={this.state.selected}
                onValueChange={(country) => this.onValueChange(country)}
                itemStyle={itemStyle}
                mode="dialog"
              >
                { Array.from({ length: max }).map(
                  (_,i) => 
                    <Picker.Item key={i} label={(i+1).toString()} value={(i+1).toString()} />
                  ) 
                }
              </Picker>
            </View>

          </View>
        </View>
      </Modal>
    )
  }
}

CountryPicker.propTypes = propTypes