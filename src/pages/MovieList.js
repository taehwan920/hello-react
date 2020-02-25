import React from "react";
import superagent from "superagent";
import { Link } from "react-router-dom";



export default class extends React.Component {
    state = {
        movieList: []
    };

    componentDidMount = async () => {

        let url = "http://54.180.149.147:8080/api/team/3/movie";

        let movieList = await superagent
            .get(url)
            .then(response => response.body)
            .catch(error => error);

        this.setState({
            movieList
        });
    };

    render() {
        const { movieList } = this.state;
        return (
            <div>
                <h3>영화 리스트 리스트</h3>
                <div>영화 포스터를 클릭하시면 상세 페이지로 이동합니다</div>

                {movieList
                    ? movieList.map(movie => (
                        <MovieItem
                            id={movie._id}
                            title={movie.title}
                            posterUrl={movie.posterUrl}
                            advanceRate={movie.advanceRate}
                            advanceRateRank={movie.advanceRateRank}
                        />
                    ))
                    : null}
            </div>
        );
    }
}



const MovieItem = ({ advanceRate, advanceRateRank, id, posterUrl, title }) => {
    return (
        <div>
            <h3>{title}</h3>
            <Link to={'detail/' + id}>
                <img alt="" width="150" src={posterUrl} /></Link>
            <div>예매율: {advanceRate}</div>
            <div>예매율 순위 : {advanceRateRank}</div>
        </div >
    );
};