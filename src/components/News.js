import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner } from 'react-bootstrap';

// Reusable component for a single news card
function NewsCard({ news }) {
  return (
    <div className="col-md-4 mb-4">
      <Card className="h-100 shadow-sm">
        <Card.Img
          variant="top"
          src={news.imageurl || 'https://via.placeholder.com/300x180?text=No+Image'}
          alt={news.title}
          style={{ height: '180px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>{news.title}</Card.Title>
          <Card.Text>{news.body.slice(0, 100)}...</Card.Text>
          <a
            href={news.url}
            className="btn btn-primary btn-sm"
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

  // Fetch crypto news on component mount
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
    <div className="container mt-4">
      <h2 className="mb-4">📰 Latest Crypto News</h2>

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
