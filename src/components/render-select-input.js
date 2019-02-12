import React from 'react';
import Select from 'react-select';

export default class RenderSelectInput extends React.Component {
  render() {
    const { input, options, name, id, ...custom } = this.props;
    const customStyles = {
      control: (provided, state) => ({
          ...provided,
          '&:hover': { borderColor: 'primary75' },
          borderColor: 'primary',
          width: '200px'
        })
    };

    return (
      <Select
        {...input}
        {...custom}
        id={id}
        name={name}
        options={options}
        value={input.value || ''}
        onChange={value => input.onChange(value)}
        onBlur={() => input.onBlur(input.value)}
        optionClassName="needsclick"
        styles={customStyles}
        theme={theme => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary: '#4F2119',
              primary75: '#9b4131',
              primary50: '#ce7464',
              primary25: '#e7b9b1',
              danger: '#D74A39',
              dangerLight: '#eaa199',
              neutral0: '#F9FAFA',
              neutral5: '#ecefef',
              neutral10: '#dee3e3',
              neutral20: '#c2cccc',
              neutral30: '#a6b5b5',
              neutral40: '#8a9e9e',
              neutral50: '#6f8585',
              neutral60: '#586a6a',
              neutral70: '#414e4e',
              neutral80: '#2a3232',
              neutral90: '#131616'
            }
          })}
      />
    );
  }
}