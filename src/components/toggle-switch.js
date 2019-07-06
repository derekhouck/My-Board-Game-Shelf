import React from "react";
import PropTypes from 'prop-types';
import './toggle-switch.css';

class ToggleSwitch extends React.Component {
  state = {
    enabled: this.props.enabled
  }

  toggleSwitch = () => {
    const { enabled } = this.state;
    return this.setState({ enabled: !enabled }, () => this.props.onStateChanged(!enabled));
  }

  render() {
    let { enabled } = this.state;
    const { className, theme } = this.props;
    const switchClasses = `switch switch--theme-${theme ? theme : 'default'} switch--is-${enabled ? 'on' : 'off'} ${className ? className : ''}`;
    return (
      <button
        aria-pressed={enabled.toString()}
        className={switchClasses}
        onClick={() => this.toggleSwitch()}
        type="button"
      >
        <div className={`switch-toggle`}>
        </div>
      </button>
    );
  }
};

ToggleSwitch.defaultProps = {
  enabled: false,
  onStateChanged: enabled => console.log('You should set the onStateChanged prop!')
};

ToggleSwitch.propTypes = {
  theme: PropTypes.string,
  enabled: PropTypes.bool,
  onStateChanged: PropTypes.func
};

export default ToggleSwitch;