import React from "react";
import superagent from "superagent";

export default class extends React.Component {
    state = {
        movieDetail: []
    };
    componentDidMount = async () => {

        const { match } = this.props;
        console.log(this.props)
        let urlDetail = `http://54.180.149.147:8080/api/team/3/movie/${match.params.id}`;
        let movieDetail = await superagent
            .get(urlDetail)
            .catch(error => error);

        this.setState({ movieDetail });

    };

    render() {
        const { movieDetail } = this.props;
        return (
            <div>
                <h3>영화 상세 페이지</h3>
                <div>영화에 대한 상세 정보가 노출되는 페이지입니다</div>

                {movieDetail
                    ? movieDetail.map(movie => (
                        <Details
                            advanceRate={movie.advanceRate}
                            advanceRateRank={movie.advanceRateRank}
                            cast={movie.cast}
                            director={movie.director}
                            expertRating={movie.expertRating}
                            genres={movie.genres}
                            id={movie._id}
                            plot={movie.plot}
                            posterUrl={movie.posterUrl}
                            released={movie.released}
                            runtime={movie.runtime}
                            status={movie.screeningStatus}
                            title={movie.title}
                            visitorRating={movie.visitorRating}
                        />
                    ))
                    : null}
            </div>
        );
    }
}

const Details = (props) => {
    return (
        <main>
            <h3>{this.props.title}</h3>
            <img alt="" width="150" src={this.props.posterUrl} />
            <div>주연 : {this.props.cast}</div>
            <div>감독 : {this.props.director}</div>
            <div>장르 : {this.props.genres}</div>
            <div>개봉일: {this.props.released.slice(0, 11)}</div>
            <div>예매율 순위 : {this.props.advanceRateRank}</div>
            <div>예매율: {this.props.advanceRate + '%'}</div>
            <div>관객 평점: {this.props.expertRating + "/ 10"}</div>
            <div>전문가 평점: {this.props.visitorRating + "/ 10"}</div>
            <div>상영 여부 : {this.props.status}</div>
            <div>러닝 타임 : {this.props.runtime + "분"}</div>
            <div>줄거리 : {this.props.plot}</div>
        </main >
    );
}