import unittest
import json
from backend.app import create_app
from backend.app.extensions import db
from backend.app.models.user import User
from backend.app.models.master import Master
from backend.app.models.service import Service
from backend.app.models.review import Review
from backend.config import TestConfig


class ReviewRoutesCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(config_class=TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = self.app.test_client()

        self.s = Service(id=1, name="Test Service")
        db.session.add(self.s)

        self.u_master = User(id=10, role='master', first_name='M', last_name='A', phone_number='111',
                             email='master@test.com', password_hash='m_hash')
        self.u_client = User(id=20, role='client', first_name='C', last_name='L', phone_number='222',
                             email='client@test.com', password_hash='c_hash')
        db.session.add_all([self.u_master, self.u_client])
        db.session.commit()

        self.master = Master(id=1, user_id=self.u_master.id, service_id=self.s.id, speciality=self.s.name)
        db.session.add(self.master)
        db.session.commit()

        self.r1 = Review(master_id=self.master.id, client_id=self.u_client.id, rating=5, comment="Excellent!")
        self.r2 = Review(master_id=self.master.id, client_id=self.u_master.id, rating=4, comment="Very Good.")
        db.session.add_all([self.r1, self.r2])
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_1_add_review_for_master_success(self):
        data = {"client_id": self.u_client.id, "rating": 5, "comment": "Amazing service!"}
        response = self.client.post(
            f'/reviews/master/{self.master.id}',
            data=json.dumps(data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.get_json()['rating'], 5)
        self.assertEqual(Review.query.count(), 3)

    def test_2_get_reviews_for_master(self):
        response = self.client.get(f'/reviews/master/{self.master.id}')

        self.assertEqual(response.status_code, 200)
        reviews = response.get_json()

        self.assertEqual(len(reviews), 2)
        self.assertEqual(reviews[0]['master_id'], self.master.id)
        self.assertEqual(reviews[0]['rating'], 5)

    def test_3_get_reviews_for_nonexistent_master(self):
        response = self.client.get('/reviews/master/999')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.get_json()), 0)

    def test_4_get_all_reviews(self):
        response = self.client.get('/reviews/')

        self.assertEqual(response.status_code, 200)
        reviews = response.get_json()
        self.assertEqual(len(reviews), 2)
        self.assertTrue(all('comment' in r for r in reviews))

    def test_5_update_review_success(self):
        new_rating = 1
        new_comment = "Bad experience."
        data = {"rating": new_rating, "comment": new_comment}

        response = self.client.put(
            f'/reviews/{self.r1.id}',
            data=json.dumps(data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 200)
        updated_review = Review.query.get(self.r1.id)
        self.assertEqual(updated_review.rating, new_rating)
        self.assertEqual(updated_review.comment, new_comment)

    def test_6_delete_review_success(self):
        review_id = self.r2.id
        response = self.client.delete(f'/reviews/{review_id}')

        self.assertEqual(response.status_code, 200)
        self.assertIsNone(Review.query.get(review_id))
        self.assertEqual(Review.query.count(), 1)

    def test_7_update_nonexistent_review(self):
        response = self.client.put(
            '/reviews/999',
            data=json.dumps({"rating": 3}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 404)

    def test_8_delete_nonexistent_review(self):
        response = self.client.delete('/reviews/999')
        self.assertEqual(response.status_code, 404)
