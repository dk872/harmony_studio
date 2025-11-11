import unittest
import json
from datetime import datetime, date, timedelta
from backend.app import create_app
from backend.app.extensions import db
from backend.app.models.user import User
from backend.app.models.client import Client
from backend.app.models.booking import Booking
from backend.app.models.master import Master
from backend.app.models.service import Service
from backend.config import TestConfig


class ClientRoutesCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(config_class=TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client_http = self.app.test_client()

        self.u_client = User(
            id=10,
            role='client',
            first_name='Test',
            last_name='Client',
            date_of_birth=date(1990, 1, 1),
            phone_number='123456',
            email='client@test.com',
            password_hash='hashed_pass'
        )
        db.session.add(self.u_client)
        db.session.commit()
        self.c = Client(
            id=self.u_client.id,
            additional_info='Loves discounts'
        )
        db.session.add(self.c)
        db.session.commit()

        self.s = Service(id=1, name="Test Service")
        self.u_master = User(id=20, role='master', first_name='M', last_name='A', phone_number='456',
                             email='m@test.com', password_hash='m_hash')
        self.master = Master(id=1, user_id=self.u_master.id, service_id=self.s.id, speciality="Test")
        db.session.add_all([self.s, self.u_master, self.master])
        db.session.commit()

        self.b_time = datetime.now() + timedelta(days=5)
        self.b = Booking(
            user_id=self.u_client.id,
            master_id=self.master.id,
            service_id=self.s.id,
            booking_datetime=self.b_time
        )
        db.session.add(self.b)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_1_get_client_success(self):
        response = self.client_http.get(f'/clients/{self.u_client.id}')

        self.assertEqual(response.status_code, 200)
        data = response.get_json()

        self.assertEqual(data['first_name'], 'Test')
        self.assertEqual(data['additional_info'], 'Loves discounts')
        self.assertIn('appointments', data)
        self.assertEqual(len(data['appointments']), 1)
        self.assertEqual(data['appointments'][0]['master_id'], self.master.id)

    def test_2_update_client_success(self):
        update_data = {"additional_info": "Prefers late evenings"}
        response = self.client_http.put(
            f'/clients/{self.u_client.id}',
            data=json.dumps(update_data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data['additional_info'], 'Prefers late evenings')

        updated_client = Client.query.get(self.u_client.id)
        self.assertEqual(updated_client.additional_info, 'Prefers late evenings')

    def test_3_get_all_clients(self):
        response = self.client_http.get('/clients/')

        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.get_json()), 1)
        self.assertEqual(response.get_json()[0]['email'], 'client@test.com')

    def test_4_get_client_appointments_list(self):
        response = self.client_http.get(f'/clients/{self.u_client.id}/appointments')

        self.assertEqual(response.status_code, 200)
        appointments = response.get_json()

        self.assertEqual(len(appointments), 1)
        self.assertEqual(appointments[0]['master_id'], self.master.id)
        self.assertEqual(appointments[0]['service_id'], self.s.id)

    def test_5_delete_nonexistent_client(self):
        response = self.client_http.delete('/clients/9999')
        self.assertEqual(response.status_code, 404)
