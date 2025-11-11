import unittest
from backend.app import create_app
from backend.app.extensions import db
from backend.app.models.user import User
from backend.app.models.client import Client
from backend.config import TestConfig
from datetime import date


class ClientModelCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(config_class=TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

        self.u = User(
            id=10,
            role='client',
            first_name='Test',
            last_name='Client',
            date_of_birth=date(1990, 1, 1),
            phone_number='123456',
            email='client@test.com',
            password_hash='hashed_password'
        )
        db.session.add(self.u)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_client_creation_and_foreign_key(self):
        c = Client(
            id=self.u.id,
            additional_info='Prefers morning appointments'
        )
        db.session.add(c)
        db.session.commit()

        retrieved_client = Client.query.get(self.u.id)

        self.assertIsNotNone(retrieved_client)
        self.assertEqual(retrieved_client.id, self.u.id)
        self.assertEqual(retrieved_client.additional_info, 'Prefers morning appointments')
        self.assertEqual(retrieved_client.user.first_name, 'Test')

    def test_client_to_dict_combines_user_data(self):
        c = Client(
            id=self.u.id,
            additional_info='VIP status'
        )
        db.session.add(c)
        db.session.commit()

        client_dict = c.to_dict()

        self.assertIn('first_name', client_dict)
        self.assertIn('email', client_dict)
        self.assertIn('additional_info', client_dict)
        self.assertEqual(client_dict['first_name'], 'Test')
        self.assertEqual(client_dict['additional_info'], 'VIP status')
        self.assertNotIn('password_hash', client_dict)
