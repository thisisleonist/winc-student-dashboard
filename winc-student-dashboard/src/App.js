import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from 'react-router-dom'
import Student from './component/Student'
import StudentList from './component/StudentList'
import TableView from './component/TableView'
import {HOME_URL, STORE_URL} from './Config'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            students: [],
            metadata: []
        }
    }

    componentDidMount() {
        this.getApiData('GET', '/students.json').then(data => {
            this.setState({students: data})
        })
        this.getApiData('GET', '/metadata.json').then(data => {
            this.setState({metadata: data})
        })
    }

    async getApiData(method, api, body) {
        try {
            let result = await fetch(api, {
                method: method,
                body: JSON.stringify(body)
            })
            return await result.json()
        } catch (error) {
            console.log(error)
        }
    }

    getStudentNames(props) {
        const {students} = props

        let studentNames = []
        let studentID = 1
        students.forEach(row => {
            if (
                studentNames.findIndex(
                    index => index.username === row.username
                ) === -1
            ) {
                studentNames.push({
                    id: studentID,
                    name: row.username,
                    username: row.username
                })
                studentID++
            }
        })

        return studentNames.map(row => {
            return {
                id: row.id,
                name: row.name,
                username: row.username.toLowerCase()
            }
        })
    }

    render() {
        if (this.state.students === [] || this.state.metadata === []) {
            return ''
        }
        const studentNames = this.getStudentNames({
            students: this.state.students
        })

        const metadata = this.state.metadata

        return (
            <Router>
                <Switch>
                    <Route exact path={HOME_URL}>
                        <StudentList studentNames={studentNames} />
                    </Route>
                    <Route exact path={`${HOME_URL}${STORE_URL}`}>
                        <TableView studentNames={studentNames} />
                    </Route>
                    <Route
                        exact
                        path={`${HOME_URL}${STORE_URL}/id/:id/username/:username`}
                    >
                        <TableView studentNames={studentNames} />
                    </Route>
                    <Route exact path={`${HOME_URL}/id/:id/username/:username`}>
                        <Student
                            studentNames={studentNames}
                            metadata={metadata}
                        />
                    </Route>
                    <Redirect from='/' to={HOME_URL} />
                </Switch>
            </Router>
        )
    }
}

export default App
