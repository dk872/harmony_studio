import unittest
import json
from datetime import datetime, timedelta
from backend.app import create_app
from backend.app.extensions import db
from backend.app.models.news import News
from backend.config import TestConfig


class NewsRoutesCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(config_class=TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = self.app.test_client()

        self.n1 = News(title='Old News', content='Content 1', created_at=datetime.now() - timedelta(days=5))
        self.n2 = News(title='Newest Update', content='Content 2', created_at=datetime.now() - timedelta(days=1))
        db.session.add_all([self.n1, self.n2])
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_1_create_news_item(self):
        data = {"title": "New Post", "content": "Just created this post."}
        response = self.client.post(
            '/news/',
            data=json.dumps(data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.get_json()['title'], 'New Post')
        self.assertIsNotNone(News.query.filter_by(title="New Post").first())

    def test_2_get_news_list_and_sorting(self):
        response = self.client.get('/news/')

        self.assertEqual(response.status_code, 200)
        news_list = response.get_json()

        self.assertEqual(len(news_list), 2)
        self.assertEqual(news_list[0]['title'], 'Newest Update')
        self.assertEqual(news_list[1]['title'], 'Old News')

    def test_3_get_single_news_item_success(self):
        response = self.client.get(f'/news/{self.n1.id}')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()['title'], 'Old News')

    def test_4_update_news_item(self):
        new_title = "Title Changed"
        response = self.client.put(
            f'/news/{self.n2.id}',
            data=json.dumps({"title": new_title}),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()['title'], new_title)
        self.assertEqual(News.query.get(self.n2.id).title, new_title)

    def test_5_delete_news_item(self):
        response = self.client.delete(f'/news/{self.n1.id}')

        self.assertEqual(response.status_code, 200)
        self.assertIsNone(News.query.get(self.n1.id))

    def test_6_get_nonexistent_news_item(self):
        response = self.client.get('/news/9999')
        self.assertEqual(response.status_code, 404)
