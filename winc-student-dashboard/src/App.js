import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import Student from './component/Student'
import Dashboard from './component/Dashboard'
import TableView from './component/TableView'
import {HOME_URL, STORE_URL} from './Config'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            students: [],
            metadata: [],
            tableView: {
                student: ''
            }
        }
        this.handleTableviewSelect = this.handleTableviewSelect.bind(this)
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

    getAssignments(props) {
        const {students} = props
        let assignments = []
        const map = new Map()
        for (const item of students) {
            if (!map.has(item.assignment)) {
                map.set(item.assignment, true)
                assignments.push({assignment: item.assignment})
            }
        }

        let assignmentsWithData = assignments.map(a => {
            let data = students.filter(s => {
                return a.assignment === s.assignment
            })

            const count = data.length

            let difficultyRating = data
                .map(d => {
                    return parseInt(d.difficultyRating)
                })
                .reduce((a, b) => a + b, 0)

            difficultyRating = Math.round(difficultyRating / count)

            let enjoymentRating = data
                .map(e => {
                    return parseInt(e.enjoymentRating)
                })
                .reduce((a, b) => a + b, 0)
            enjoymentRating = Math.round(enjoymentRating / count)

            return {
                assignment: a.assignment,
                difficultyRating: difficultyRating,
                enjoymentRating: enjoymentRating
            }
        })
        return assignmentsWithData
    }

    handleTableviewSelect(event) {
        event.preventDefault()
        const student = event.target.value
        this.setState(state => {
            state.tableView.student = student
            return state
        })
    }

    render() {
        const studentNames = this.getStudentNames({
            students: this.state.students
        })

        const metadata = this.state.metadata
        const students = this.state.students
        const tableViewStudent = this.state.tableView.student

        const assignments = this.getAssignments({
            students: this.state.students
        })

        return (
            <Router>
                <Switch>
                    <Route exact path={HOME_URL}>
                        <Dashboard
                            studentNames={studentNames}
                            metadata={metadata}
                            students={students}
                            assignments={assignments}
                        />
                    </Route>
                    <Route exact path={`${HOME_URL}${STORE_URL}`}>
                        <TableView
                            studentNames={studentNames}
                            students={students}
                            handleTableviewSelect={this.handleTableviewSelect}
                            tableViewStudent={tableViewStudent}
                        />
                    </Route>
                    <Route
                        exact
                        path={`${HOME_URL}${STORE_URL}/id/:id/username/:username`}
                    >
                        <TableView
                            studentNames={studentNames}
                            students={students}
                            handleTableviewSelect={this.handleTableviewSelect}
                            tableViewStudent={tableViewStudent}
                        />
                    </Route>
                    <Route exact path={`${HOME_URL}/id/:id/username/:username`}>
                        <Student
                            studentNames={studentNames}
                            metadata={metadata}
                            students={students}
                        />
                    </Route>
                    <Redirect from='/' to={HOME_URL} />
                </Switch>
            </Router>
        )
    }
}

export default App
