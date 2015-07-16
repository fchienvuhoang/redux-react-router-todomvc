import React, { Component, PropTypes } from 'react';

const ENTER_KEY_CODE = 13;

/**
 * General purpose text input component.
 */
export default class TodoTextInput extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || ''
    };
  }

  // FIXME: properly register blur events on the input field.
  onBlur() {
    this.props.onSave(this.state.value.trim());
    this.setState({
      value: ''
    });
  }

  onChange(e) {
    this.setState({
      // NOTE: `e.target` broken in 0.14.0-beta1, using `e.nativeEvent.target`
      value: e.nativeEvent.target.value
    });
  }

  onKeyDown(e) {
    if (e.keyCode !== ENTER_KEY_CODE) return;

    this.props.onSave(this.state.value.trim());
    this.setState({
      value: ''
    });
  }

  render() {
    const { className, placeholder } = this.props;
    const { value } = this.state;

    return (
      <input
        autoFocus={true}
        className={className}
        onChange={::this.onChange}
        onKeyDown={::this.onKeyDown}
        placeholder={placeholder}
        type="text"
        value={value}
      />
    );
  }
}
