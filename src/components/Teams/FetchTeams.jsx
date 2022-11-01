import React, {useState, useEffect} from "react"
import axios from "axios"


const FetchTeams = () => {
    const [teamList, setTeam] = useState([]);

    useEffect(() => {
        axios.get('/api/teams').then((item) => {
            setTeam(item.data)
        })
    }, []);

    const getTeamMember = (g) => {
        let team = [];
        teamList.forEach((item, index) => {
            if (item.team === g) {
                team.push(
                    <div className="team-item" key={index}>
                        <div
                            className={g === "special" || g === "news" ? "special team-name" : "team-name"}>{item.name}</div>
                        {item.role === "lyrics" || item.role === "news" ? null :
                            <div className="team-role" id={item.role === "팀장" ? "team-manager" : null}>
                                {item.role}
                            </div>}
                    </div>
                );
            }
        })
        return team;
    }

    const getTeams = () => {
        let teams = [];
        let group = {
            "website": "웹사이트",
            "weekly": "주간 왁뮤차트",
            "ios": "iOS 앱",
            "android": "안드로이드 앱",
            "project_w": "프로젝트 W(COMING SOON)",
            "special": "Special Thanks",
            "news": ""
        }
        let previous;

        teamList.forEach((item, index) => {
            if (previous !== item.team) {
                teams.push(
                    <div className="teams fadein" key={index}>
                        <div className="h2">{group[item.team]}</div>
                        <div className="team-members">{getTeamMember(item.team)}</div>
                    </div>
                );
                previous = item.team;
            }
        });
        return teams;
    }

    if (!teamList) return <div className="loading-dark"/>;
    return getTeams();
}

export default FetchTeams;