import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import { Button,Row, Col, Menu, Dropdown, Space,  } from 'antd';
import './Start.css'

function Start(props){

return(
    <div>
    <Button id="start"  shape="round" danger onClick={props.onClick}>Start a new game!</Button>
    </div>
)
}

export default Start;