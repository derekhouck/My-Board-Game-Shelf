import React from 'react';
import ReactResponsiveSelect from 'react-responsive-select';
import './select.css';

// By default no caret icon is supplied - any valid jsx markup will do
const caretIcon = (
  <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
    <g><path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z" /></g>
  </svg>
);

export default class Select extends React.Component {
  handleChange(newValue) {
    if (!newValue.options) {
      return this.props.input.onChange(newValue.value);
    } else {
      const values = newValue.options.map(option => option.value);
      return this.props.input.onChange(values);
    }
  }

  render() {
    const { initialValue, input, multiselect } = this.props;

    return (
      <ReactResponsiveSelect
        caretIcon={caretIcon}
        customLabelRenderer={this.props.customLabelRenderer}
        multiselect={multiselect}
        name={this.props.name}
        noSelectionLabel={this.props.noSelectionLabel}
        onChange={newValue => this.handleChange(newValue)}
        options={this.props.options}
        selectedValue={!multiselect ? input.value || initialValue : undefined}
        selectedValues={multiselect ? input.value : undefined}
      />
    );
  }
}

Select.defaultProps = {
  initialValue: null
};