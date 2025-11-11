import unittest
from backend.app import create_app
from backend.app.extensions import db
from backend.app.models.user import User
from backend.config import TestConfig
from datetime import date
from sqlalchemy.exc import IntegrityError


class UserModelCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(config_class=TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_password_hashing(self):
        u = User(
            role='client', first_name='Test', last_name='Hash',
            phone_number='1234567890', email='test_hash@example.com'
        )
        u.set_password('secure_test_password')

        self.assertTrue(u.check_password('secure_test_password'))
        self.assertFalse(u.check_password('wrong_password'))
        self.assertNotEqual(u.password_hash, 'secure_test_password')

    def test_user_to_dict_serialization(self):
        test_date = date(1995, 10, 10)
        u = User(
            role='master', first_name='John', last_name='Doe',
            date_of_birth=test_date, phone_number='1112223333',
            email='master@example.com', password_hash='hashed_value'
        )
        db.session.add(u)
        db.session.commit()

        user_dict = u.to_dict()

        self.assertIn('email', user_dict)
        self.assertIn('date_of_birth', user_dict)
        self.assertEqual(user_dict['role'], 'master')
        self.assertEqual(str(user_dict['date_of_birth']), '1995-10-10')

        self.assertNotIn('password_hash', user_dict)

    def test_user_email_uniqueness(self):
        u1 = User(
            role='client', first_name='U1', last_name='T1',
            phone_number='111', email='unique@test.com',
            password_hash='hash1'
        )
        db.session.add(u1)
        db.session.commit()

        u2 = User(
            role='client', first_name='U2', last_name='T2',
            phone_number='222', email='unique@test.com',
            password_hash='hash2'
        )
        db.session.add(u2)

        with self.assertRaises(IntegrityError):
            db.session.commit()

        db.session.rollback()

    def test_user_not_nullable_constraints(self):
        u = User(
            role='client', last_name='Test',
            phone_number='123', email='bad@test.com',
            password_hash='hash'
        )
        db.session.add(u)

        with self.assertRaises(IntegrityError):
            db.session.commit()

        db.session.rollback()
