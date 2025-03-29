import React, { useEffect, useState, useCallback } from "react";
import PropTypes from 'prop-types';
import "./Feed.css";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import moment from "moment/moment";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
      const response = await fetch(videoList_url);
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const result = await response.json();
      setData(result.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <div className="feed">Loading...</div>;
  }

  if (error) {
    return <div className="feed">Error: {error}</div>;
  }

  return (
    <div className="feed">
      {data.map((item) => (
        <Link 
          key={item.id}
          to={`video/${item.snippet.categoryId}/${item.id}`} 
          className="card"
        >
          <img 
            src={item.snippet.thumbnails.medium.url} 
            alt={item.snippet.title}
          />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>
            {value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}
          </p>
        </Link>
      ))}
    </div>
  );
};

Feed.propTypes = {
  category: PropTypes.string.isRequired,
};

export default Feed;
