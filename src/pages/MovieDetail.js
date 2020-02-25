import React from "react";
import superagent from "superagent";

export default class extends React.Component {
    state = {
        movieDetail: []
    };
    componentDidMount = async () => {
        const { match } = this.props;
        let urlDetail = `http://54.180.149.147:8080/api/team/3/movie/${match.params.id}`;
        let movieDetail = await superagent
            .get(urlDetail)
            .then(response => response.body)
            .catch(error => error);

        this.setState({ movieDetail });
    };

    render() {
        const { movieDetail } = this.state;
        console.log(movieDetail.cast)
        return (
            <div>
                <h3>영화 상세 페이지</h3>
                <div>영화에 대한 상세 정보가 노출되는 페이지입니다</div>

                {movieDetail
                    ? <Details
                        advanceRate={movieDetail.advanceRate}
                        advanceRateRank={movieDetail.advanceRateRank}
                        cast={movieDetail.cast}
                        director={movieDetail.director}
                        expertRating={movieDetail.expertRating}
                        genres={movieDetail.genres}
                        id={movieDetail._id}
                        plot={movieDetail.plot}
                        posterUrl={movieDetail.posterUrl}
                        released={movieDetail.released}
                        runtime={movieDetail.runtime}
                        status={movieDetail.screeningStatus}
                        title={movieDetail.title}
                        visitorRating={movieDetail.visitorRating}
                    />
                    : null}
            </div>
        );
    }
}

const Details = ({ title, posterUrl, cast, director, genres, released, advanceRate, advanceRateRank, expertRating, visitorRating, status, runtime, plot }) => {
    return (
        <main>
            <h3>{title}</h3>
            <img alt="" width="150" src={posterUrl} />
            <div>주연 : {cast}</div>
            <div>감독 : {director}</div>
            <div>장르 : {genres}</div>
            <div>개봉일: {released}</div>
            <div>예매율 순위 : {advanceRateRank}</div>
            <div>예매율: {advanceRate + '%'}</div>
            <div>관객 평점: {expertRating + "/ 10"}</div>
            <div>전문가 평점: {visitorRating + "/ 10"}</div>
            <div>상영 여부 : {status}</div>
            <div>러닝 타임 : {runtime + "분"}</div>
            <div>줄거리 : {plot}</div>
        </main >
    );
}