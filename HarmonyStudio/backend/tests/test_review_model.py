import unittest
from backend.app import create_app
from backend.app.extensions import db
from backend.app.models.user import User
from backend.app.models.master import Master
from backend.app.models.service import Service
from backend.app.models.review import Review
from backend.config import TestConfig
from datetime import datetime


class ReviewModelCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(config_class=TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.s = Service(name="Test Service")
        db.session.add(self.s)

        self.u_client = User(
            id=1, role='client', first_name='C', last_name='L',
            phone_number='123', email='c@test.com',
            password_hash='client_hash'
        )
        self.u_master = User(
            id=2, role='master', first_name='M', last_name='A',
            phone_number='456', email='m@test.com',
            password_hash='master_hash'
        )
        db.session.add_all([self.u_client, self.u_master])
        db.session.commit()

        self.master = Master(
            id=1, user_id=self.u_master.id,
            service_id=self.s.id, speciality="Test"
        )
        db.session.add(self.master)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_review_creation_and_integrity(self):
        r = Review(
            master_id=self.master.id,
            client_id=self.u_client.id,
            rating=5,
            comment='Excellent service!'
        )
        db.session.add(r)
        db.session.commit()

        retrieved_review = Review.query.filter_by(master_id=self.master.id).first()

        self.assertIsNotNone(retrieved_review)
        self.assertEqual(retrieved_review.master_id, self.master.id)
        self.assertEqual(retrieved_review.client_id, self.u_client.id)
        self.assertEqual(retrieved_review.rating, 5)
        self.assertEqual(retrieved_review.comment, 'Excellent service!')
        self.assertIsInstance(retrieved_review.created_at, datetime)

    def test_review_to_dict_serialization(self):
        test_time = datetime(2025, 10, 5, 12, 0, 0)

        r = Review(
            master_id=self.master.id,
            client_id=self.u_client.id,
            rating=4,
            comment='Good job',
            created_at=test_time
        )
        db.session.add(r)
        db.session.commit()

        review_dict = r.to_dict()
        expected_isoformat = "2025-10-05T12:00:00"

        self.assertIn('created_at', review_dict)
        self.assertEqual(review_dict['rating'], 4)
        self.assertEqual(review_dict['created_at'], expected_isoformat)

    def test_review_nullable_comment(self):
        r = Review(
            master_id=self.master.id,
            client_id=self.u_client.id,
            rating=3,
            comment=None
        )
        db.session.add(r)
        db.session.commit()

        retrieved_review = Review.query.filter_by(rating=3).first()

        self.assertIsNotNone(retrieved_review)
        self.assertIsNone(retrieved_review.comment)

        review_dict = retrieved_review.to_dict()
        self.assertIsNone(review_dict['comment'])