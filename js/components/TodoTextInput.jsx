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
  handleBlur() {
    this.props.onSave(this.state.value.trim());
    this.setState({
      value: ''
    });
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleKeyDown(e) {
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
        className={className}
        placeholder={placeholder}
        value={value}
        autoFocus={true}
        type="text"
        onChange={::this.handleChange}
        onKeyDown={::this.handleKeyDown}
      />
    );
  }
}
