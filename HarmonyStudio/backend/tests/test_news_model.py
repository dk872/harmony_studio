import unittest
from backend.app import create_app
from backend.app.extensions import db
from backend.app.models.news import News
from backend.config import TestConfig
from datetime import datetime


class NewsModelCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(config_class=TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_news_creation_and_integrity(self):
        n = News(
            title='Studio Grand Opening',
            content='We are thrilled to announce the opening of Harmony Studio!'
        )
        db.session.add(n)
        db.session.commit()

        retrieved_news = News.query.filter_by(title='Studio Grand Opening').first()

        self.assertIsNotNone(retrieved_news)
        self.assertEqual(retrieved_news.content, 'We are thrilled to announce the opening of Harmony Studio!')
        self.assertIsNotNone(retrieved_news.created_at)
        self.assertIsInstance(retrieved_news.created_at, datetime)

    def test_news_to_dict_serialization(self):
        test_time = datetime(2025, 11, 10, 14, 0, 0)

        n = News(
            title='Holiday Schedule',
            content='Check our new hours.',
            created_at=test_time
        )
        db.session.add(n)
        db.session.commit()

        news_dict = n.to_dict()
        expected_isoformat = "2025-11-10T14:00:00"

        self.assertIn('created_at', news_dict)
        self.assertEqual(news_dict['title'], 'Holiday Schedule')
        self.assertEqual(news_dict['created_at'], expected_isoformat)