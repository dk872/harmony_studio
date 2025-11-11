import unittest
import json
from datetime import datetime, date
from backend.app import create_app
from backend.app.extensions import db
from backend.app.models.user import User
from backend.app.models.master import Master
from backend.app.models.client import Client
from backend.app.models.service import Service
from backend.app.models.booking import Booking
from backend.config import TestConfig


class UserRoutesCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(config_class=TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = self.app.test_client()

        self.s = Service(id=1, name="Test Service")
        db.session.add(self.s)

        self.u_master = User(id=10, role='master', first_name='Master', last_name='User', phone_number='111',
                             email='master@test.com', password_hash='m_hash')
        self.master = Master(id=1, user_id=self.u_master.id, service_id=self.s.id, speciality=self.s.name,
                             bio="Expert bio.")

        self.u_client = User(id=20, role='client', first_name='Client', last_name='User', phone_number='222',
                             email='client@test.com', password_hash='c_hash')
        self.client_rec = Client(id=self.u_client.id, additional_info='VIP')

        self.booking = Booking(user_id=self.u_client.id, master_id=self.master.id, service_id=self.s.id,
                               booking_datetime=datetime(2025, 12, 1, 10, 0))

        db.session.add_all([self.u_master, self.master, self.u_client, self.client_rec, self.booking])
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_1_get_master_user_details(self):
        response = self.client.get(f'/users/{self.u_master.id}')

        self.assertEqual(response.status_code, 200)
        data = response.get_json()

        self.assertEqual(data['role'], 'master')
        self.assertEqual(data['email'], 'master@test.com')
        self.assertIn('bio', data)
        self.assertEqual(data['bio'], 'Expert bio.')
        self.assertEqual(data['service_id'], self.s.id)

    def test_2_get_client_user_details(self):
        response = self.client.get(f'/users/{self.u_client.id}')

        self.assertEqual(response.status_code, 200)
        data = response.get_json()

        self.assertEqual(data['role'], 'client')
        self.assertEqual(data['email'], 'client@test.com')

    def test_3_update_user_details_success(self):
        new_phone = '5554443333'
        update_data = {"phone_number": new_phone, "first_name": "NewMaster"}

        response = self.client.put(
            f'/users/{self.u_master.id}',
            data=json.dumps(update_data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 200)

        updated_user = User.query.get(self.u_master.id)
        self.assertEqual(updated_user.phone_number, new_phone)
        self.assertEqual(updated_user.first_name, 'NewMaster')

    def test_4_delete_master_user_and_associated_data(self):
        master_id_to_check = self.master.id
        user_id_to_check = self.u_master.id

        Booking.query.filter_by(master_id=master_id_to_check).delete()
        db.session.commit()

        response = self.client.delete(f'/users/{user_id_to_check}')

        self.assertEqual(response.status_code, 200)

        self.assertIsNone(User.query.get(user_id_to_check))
        self.assertIsNone(Master.query.get(master_id_to_check))

    def test_5_delete_client_user_and_associated_data(self):
        client_user_id_to_check = self.u_client.id
        client_rec_id_to_check = self.client_rec.id

        Booking.query.filter_by(user_id=client_user_id_to_check).delete()
        db.session.commit()

        response = self.client.delete(f'/users/{client_user_id_to_check}')

        self.assertEqual(response.status_code, 200)

        self.assertIsNone(User.query.get(client_user_id_to_check))
        self.assertIsNone(Client.query.get(client_rec_id_to_check))

    def test_6_get_nonexistent_user(self):
        response = self.client.get('/users/999')
        self.assertEqual(response.status_code, 404)
