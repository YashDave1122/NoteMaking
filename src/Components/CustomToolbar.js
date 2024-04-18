import React from 'react';
import { Quill } from 'react-quill';

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header">
      <option value="1"></option>
      <option value="2"></option>
      <option value="3"></option>
      <option value="4"></option>
      <option value="5"></option>
      <option value="6"></option>
      <option selected></option>
    </select>
    <select className="ql-font"></select>
    <select className="ql-size"></select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <button className="ql-strike"></button>
    <button className="ql-blockquote"></button>
    <select className="ql-color">
      <option value="black"></option>
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="yellow"></option>
      <option value="purple"></option>
    </select>
    <select className="ql-background"></select>
    <button className="ql-list" value="ordered"></button>
    <button className="ql-list" value="bullet"></button>
    <button className="ql-indent" value="-1"></button>
    <button className="ql-indent" value="+1"></button>
    <button className="ql-direction" value="rtl"></button>
    <select className="ql-align"></select>
    <button className="ql-link"></button>
    <button className="ql-image"></button>
    <button className="ql-video"></button>
    <button className="ql-clean"></button>
  </div>
);

export default CustomToolbar;
