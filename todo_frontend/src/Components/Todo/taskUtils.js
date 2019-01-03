import React from 'react'
import { NavLink } from 'react-router-dom';
import './static/taskUtils.css'


export const TaskFilter = ({handleFilter}) => (
    <ul className="task-filters center">
        <li><NavLink to="/" onClick={ () => handleFilter(null) }>View All</NavLink></li>
        <span> / </span> 
        <li><NavLink to="/" onClick={ () => handleFilter('active')}>Active</NavLink></li>
        <span> / </span>
        <li><NavLink to="/" onClick={ () => handleFilter('completed')}>Completed</NavLink></li>
    </ul>
)
