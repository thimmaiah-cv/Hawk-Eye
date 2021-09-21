import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Genres from '../../Components/Genres';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import TrendingCard from '../../Components/TrendingCard/TrendingCard';
import useGenres from '../../hooks/useGenres';

const Series = () => {


    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL=useGenres(selectedGenres);



    const fetchMovies = async () => {
        const { data } = await axios.get(
            // `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
            `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );

        // console.log(data);
        setContent(data.results);
        setNumOfPages(data.total_pages);
    };

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
    }, [page,genreforURL])



    return (
        <div>
            <span className="pageTitle">Series</span>

            <Genres
            type="tv" 
            selectedGenres={selectedGenres} 
            setSelectedGenres={setSelectedGenres} 
            genres={genres} 
            setGenres={setGenres} 
            setPage={setPage}
            />

            <div className="trending">
                {content && content.map((c) => (
                    <TrendingCard key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        media_type="tv"
                        vote_average={c.vote_average}
                    />
                ))}
            </div>

            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}

        </div>
    );
};

export default Series;