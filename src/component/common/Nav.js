import React from 'react'
import {Link} from 'react-router-dom'

import {
    HOME_URL,
    HOME_LABEL,
    STORE_URL,
    STORE_LABEL,
    LOGO_IMAGE,
    LOGO_LABEL
} from '../../Config'

/**
 *
 *  @param {object} props: Navigation component
 *  Switches between three variations of <nav>
 *     Dashboard
 *     Tableview
 *     Student
 *
 */

const Nav = props => {
    const {nav} = props

    switch (nav) {
        case 'Tableview':
            return (
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>
                                <img src={LOGO_IMAGE} alt={LOGO_LABEL} />
                            </Link>
                        </li>
                        <li>
                            <Link to={HOME_URL}>{HOME_LABEL}</Link>
                        </li>
                        <li>
                            <Link
                                className='active'
                                to={`${HOME_URL}${STORE_URL}`}
                            >
                                {STORE_LABEL}
                            </Link>
                        </li>
                        {props.urlToStudent}
                    </ul>
                </nav>
            )
        case 'Dashboard':
            return (
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>
                                <img src={LOGO_IMAGE} alt={LOGO_LABEL} />
                            </Link>
                        </li>
                        <li>
                            <Link className='active' to={HOME_URL}>
                                {HOME_LABEL}
                            </Link>
                        </li>
                        <li>
                            <Link to={`${HOME_URL}${STORE_URL}`}>
                                {STORE_LABEL}
                            </Link>
                        </li>
                    </ul>
                </nav>
            )
        case 'Student':
            return (
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>
                                <img src={LOGO_IMAGE} alt={LOGO_LABEL} />
                            </Link>
                        </li>
                        <li>
                            <Link to='/'>{HOME_LABEL}</Link>
                        </li>
                        <li>
                            <Link
                                to={`${HOME_URL}${STORE_URL}/id/${props.id}/username/${props.username}`}
                            >
                                {STORE_LABEL}
                            </Link>
                        </li>
                        {props.urlToStudent}
                    </ul>
                </nav>
            )

        default:
            return (
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>
                                <img src={LOGO_IMAGE} alt={LOGO_LABEL} />
                            </Link>
                        </li>
                        <li>
                            <Link to='/'>{HOME_LABEL}</Link>
                        </li>
                    </ul>
                </nav>
            )
    }
}

export default Nav
