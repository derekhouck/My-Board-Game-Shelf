import React from 'react';
import ReactResponsiveSelect from 'react-responsive-select';
import '../styles/select.css';

export default function Select(props) {
  return (
    <ReactResponsiveSelect 
      caretIcon={props.caretIcon}
      name={props.name}
      onBlur={() => props.input.onBlur(props.input.value)}
      onChange={newValue => props.input.onChange(newValue.value)}
      options={props.options}
      selectedValue={props.input.value}
    />
  );
}