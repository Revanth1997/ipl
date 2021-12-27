import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

const teamsApiUrl = 'https://apis.ccbp.in/ipl'

class Home extends Component {
  state = {
    isLoading: true,
    teamsData: [],
  }

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch(teamsApiUrl)
    const fetchedData = await response.json()
    const formatedData = fetchedData.teams.map(team => ({
      name: team.name,
      id: team.id,
      teamImageUrl: team.team_image_url,
    }))

    this.setState({
      teamsData: formatedData,
      isLoading: false,
    })
  }

  renderTeams = () => {
    const {teamsData} = this.state
    return (
      <ul className="teams-list">
        {teamsData.map(team => (
          <TeamCard teamDetails={team} key={team.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div testId="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="home-container">
        <div className="teams-list-container">
          <div className="logo-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="logo"
            />
            <h1 className="ipl-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeams()}
        </div>
      </div>
    )
  }
}

export default Home
