import React, { useState, useEffect } from 'react';
import { Card, Alert } from 'react-bootstrap';
import { AnimatePresence, motion } from 'framer-motion';
import api from '../services/api';
import { SkeletonGrid } from '../animations/Skeletons';
import { cardItem, hoverLift, fadeUp, EASE_OUT } from '../animations/variants';
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

  return (
    <div>
      <motion.h2 className="mb-4" variants={fadeUp} initial="hidden" animate="show">
        Cryptocurrency News
      </motion.h2>

      <AnimatePresence initial={false}>
        {error && (
          <motion.div
            key="news-error"
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            style={{ overflow: 'hidden' }}
          >
            <Alert variant="warning" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <SkeletonGrid count={6} withImage={false} lines={2} />
      ) : (
        <motion.div className="row" layout>
          <AnimatePresence mode="popLayout">
            {news.map((article, index) => {
              const articleKey =
                article.guid || article.url || Math.random().toString(36).substr(2, 9);
              const bodyText = article.body ? article.body.slice(0, 120) : 'No description';
              return (
                <motion.div
                  className="col-12 col-md-6 col-lg-4 mb-4"
                  key={articleKey}
                  layout
                  variants={{ ...cardItem(index), hover: hoverLift }}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover="hover"
                  transition={{ layout: { duration: 0.32, ease: EASE_OUT } }}
                >
                  <Card className="news-card h-100">
                    {article.image && (
                      <div className="news-card__media">
                        <motion.img
                          className="card-img-top"
                          src={article.image}
                          alt={article.title}
                          variants={{ hover: { scale: 1.07 } }}
                          transition={{ duration: 0.5, ease: EASE_OUT }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <Card.Body>
                      <Card.Title className="news-title">{article.title}</Card.Title>
                      <Card.Text className="news-desc">
                        {bodyText}
                        {article.body && article.body.length > 120 ? '...' : ''}
                      </Card.Text>
                      <motion.a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm d-inline-flex align-items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Read More
                        <motion.span
                          className="ms-1 d-inline-flex"
                          variants={{ hover: { x: [0, 4, 0] } }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          &rarr;
                        </motion.span>
                      </motion.a>
                    </Card.Body>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence initial={false}>
        {news.length === 0 && !loading && (
          <motion.p
            key="no-news"
            className="text-center text-muted mt-4"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10 }}
          >
            No news articles available at this time.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default News;
