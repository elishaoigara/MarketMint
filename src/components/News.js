import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner } from 'react-bootstrap';
import './News.css'; // Import custom styles

function NewsCard({ news }) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <Card className="h-100 shadow-sm news-card">
        <Card.Img
          variant="top"
          src={news.imageurl || 'https://via.placeholder.com/300x180?text=No+Image'}
          alt={news.title}
          className="news-image"
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title>{news.title}</Card.Title>
            <Card.Text className="news-desc">
              {news.body.slice(0, 100)}...
            </Card.Text>
          </div>
          <a
            href={news.url}
            className="btn btn-primary btn-sm mt-3"
            target="_blank"
            rel="noreferrer"
          >
            Read More
          </a>
        </Card.Body>
      </Card>
    </div>
  );
}

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          'https://min-api.cryptocompare.com/data/v2/news/?lang=EN'
        );
        setArticles(res.data.Data);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container mt-4 news-container">
      <h2 className="mb-4 text-center news-title">📰 Latest Crypto News</h2>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="row">
          {articles.length > 0 ? (
            articles.map((news) => <NewsCard key={news.id} news={news} />)
          ) : (
            <div className="col-12">
              <p>No crypto news found at the moment.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default News;
