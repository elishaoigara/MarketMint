import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import api from '../services/api';
import './News.css';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/coins/categories', {
          signal,
          params: {
            order: 'market_cap_desc',
          },
        });
        if (Array.isArray(res.data)) {
          const mapped = res.data.slice(0, 30).map((item) => ({
            guid: item.id,
            url: `https://www.coingecko.com/en/categories/${item.id}`,
            title: item.name || 'Unknown Category',
            body: item.content || item.description || 'No description available.',
            image: item.image || null,
            category: item.category || 'General',
          }));
          setNews(mapped);
        } else {
          setNews([]);
        }
      } catch (err) {
        if (err.name === 'CanceledError' || err.name === 'AbortError') return;
        setError('Failed to fetch news. Please try again later.');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading news...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Cryptocurrency News</h2>

      {error && (
        <Alert variant="warning" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {news.length === 0 && !loading && (
        <p className="text-center text-muted mt-4">No news articles available at this time.</p>
      )}

      <Row>
        {news.map((article) => {
          const articleKey = article.guid || article.url || Math.random().toString(36).substr(2, 9);
          const bodyText = article.body
            ? article.body.slice(0, 120)
            : 'No description';
          return (
            <Col lg={4} md={6} sm={12} key={articleKey} className="mb-4">
              <Card className="news-card h-100">
                {article.image && (
                  <Card.Img
                    variant="top"
                    src={article.image}
                    alt={article.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <Card.Body>
                  <Card.Title className="news-title">{article.title}</Card.Title>
                  <Card.Text className="news-desc">
                    {bodyText}
                    {article.body && article.body.length > 120 ? '...' : ''}
                  </Card.Text>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Read More
                  </a>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default News;
