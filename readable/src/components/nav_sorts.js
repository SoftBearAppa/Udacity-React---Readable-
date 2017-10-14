import React from 'react'
import { Link } from 'react-router-dom'

const NavOrderTab = (props) => {
  return (
    <ul>
      <li>
        <Link onClick={() => props.orderByTime(props.topic)} to="#">Newest</Link>
      </li>
      <li>
        <Link onClick={() => props.orderByVotes(props.topic)} to="#">Votes</Link>
      </li>
    </ul>
  )
}
export default NavOrderTab