import unittest
import json
from backend.app import create_app
from backend.app.extensions import db
from backend.app.models.user import User
from backend.app.models.master import Master
from backend.app.models.client import Client
from backend.app.models.service import Service
from backend.config import TestConfig


class AuthRouteCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(config_class=TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = self.app.test_client()

        self.service = Service(name="Haircut", description="Test Service")
        db.session.add(self.service)

        admin = User(role='admin', first_name='A', last_name='D', phone_number='000', email='admin@test.com')
        admin.set_password('adminpass')
        db.session.add(admin)

        client_user = User(role='client', first_name='Test', last_name='Client', phone_number='123',
                           email='client@test.com')
        client_user.set_password('clientpass')
        db.session.add(client_user)
        db.session.commit()
        Client(id=client_user.id)
        db.session.commit()

        master_user = User(role='master', first_name='Test', last_name='Master', phone_number='456',
                           email='master@test.com')
        master_user.set_password('masterpass')
        db.session.add(master_user)
        db.session.commit()
        Master(user_id=master_user.id, service_id=self.service.id, speciality=self.service.name)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_1_client_registration_success(self):
        data = {
            "role": "client", "first_name": "Anna", "last_name": "Client",
            "date_of_birth": "1995-10-10", "phone_number": "9876543210",
            "email": "anna@client.com", "password": "pass123"
        }

        response = self.client.post(
            '/auth/register',
            data=json.dumps(data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 201)
        self.assertIn('registered successfully', response.get_json()['message'].lower())

        user = User.query.filter_by(email='anna@client.com').first()
        client = Client.query.filter_by(id=user.id).first()
        self.assertIsNotNone(user)
        self.assertIsNotNone(client)

    def test_2_master_registration_success(self):
        data = {
            "role": "master", "first_name": "Mike", "last_name": "Master",
            "date_of_birth": "1980-01-01", "phone_number": "1112223333",
            "email": "mike@newmaster.com", "password": "masterpass",
            "service_id": self.service.id,
            "bio": "Expert in all things hair."
        }

        response = self.client.post(
            '/auth/register',
            data=json.dumps(data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 201)

        user = User.query.filter_by(email='mike@newmaster.com').first()
        master = Master.query.filter_by(user_id=user.id).first()

        self.assertIsNotNone(user)
        self.assertIsNotNone(master)
        self.assertEqual(master.speciality, self.service.name)

    def test_3_registration_duplicate_email(self):
        data = {
            "role": "client", "first_name": "Duplicate", "last_name": "User",
            "phone_number": "000", "email": "client@test.com", "password": "newpass"
        }

        response = self.client.post(
            '/auth/register',
            data=json.dumps(data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn('Email already exists', response.get_json()['error'])

    def test_4_master_registration_missing_service_id(self):
        data = {
            "role": "master", "first_name": "Bad", "last_name": "Master",
            "date_of_birth": "1990-01-01", "phone_number": "1",
            "email": "bad@master.com", "password": "pass"
        }

        response = self.client.post(
            '/auth/register',
            data=json.dumps(data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn('Service ID is required for master', response.get_json()['error'])

    def test_5_registration_invalid_role(self):
        data = {
            "role": "manager", "first_name": "M", "last_name": "N",
            "date_of_birth": "1990-01-01", "phone_number": "1",
            "email": "manager@test.com", "password": "pass"
        }

        response = self.client.post(
            '/auth/register',
            data=json.dumps(data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("Invalid role", response.get_json()['error'])

    def test_6_login_success_admin(self):
        login_data = {"email": "admin@test.com", "password": "adminpass"}
        response = self.client.post('/auth/login', data=json.dumps(login_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('/admin', response.get_json()['redirect'])

    def test_7_login_success_client(self):
        login_data = {"email": "client@test.com", "password": "clientpass"}
        response = self.client.post('/auth/login', data=json.dumps(login_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('/client-dashboard', response.get_json()['redirect'])
        self.assertEqual(response.get_json()['user']['role'], 'client')

    def test_8_login_invalid_credentials(self):
        response_non_existent = self.client.post(
            '/auth/login',
            data=json.dumps({"email": "fake@test.com", "password": "pass"}),
            content_type='application/json'
        )
        self.assertEqual(response_non_existent.status_code, 401)

        response_wrong_pass = self.client.post(
            '/auth/login',
            data=json.dumps({"email": "admin@test.com", "password": "wrongpassword"}),
            content_type='application/json'
        )
        self.assertEqual(response_wrong_pass.status_code, 401)
        self.assertIn('Invalid email or password', response_wrong_pass.get_json()['error'])
