import unittest
import json
from datetime import datetime, timedelta
from backend.app import create_app
from backend.app.extensions import db
from backend.app.models.user import User
from backend.app.models.master import Master
from backend.app.models.service import Service
from backend.app.models.booking import Booking
from backend.config import TestConfig


class BookingRoutesCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(config_class=TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = self.app.test_client()

        self.s = Service(name="Haircut")
        db.session.add(self.s)

        self.u_client = User(id=1, role='client', first_name='Client', last_name='User', phone_number='123',
                             email='client@test.com', password_hash='c_hash')
        self.u_master = User(id=2, role='master', first_name='Master', last_name='User', phone_number='456',
                             email='master@test.com', password_hash='m_hash')
        db.session.add_all([self.u_client, self.u_master])
        db.session.commit()

        self.initial_times = [
            (datetime.now() + timedelta(days=1, hours=1)).strftime("%Y-%m-%d %H:%M"),
            (datetime.now() + timedelta(days=1, hours=2)).strftime("%Y-%m-%d %H:%M")
        ]

        self.master = Master(id=1, user_id=self.u_master.id, service_id=self.s.id, speciality=self.s.name,
                             free_times=self.initial_times)
        db.session.add(self.master)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_1_create_booking_failure_due_to_server_bug(self):
        booking_time = self.initial_times[0]
        data = {
            "user_id": self.u_client.id,
            "master_id": self.master.id,
            "booking_datetime": booking_time
        }

        response = self.client.post(
            '/bookings/',
            data=json.dumps(data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 500)
        self.assertIn("Booking failed", response.get_json()['error'])

        master_after = Master.query.get(self.master.id)
        self.assertIn(booking_time, master_after.free_times)
        self.assertEqual(len(master_after.free_times), 2)

    def test_2_create_booking_time_unavailable(self):
        unavailable_time = (datetime.now() + timedelta(days=3)).strftime("%Y-%m-%d %H:%M")
        data = {
            "user_id": self.u_client.id,
            "master_id": self.master.id,
            "booking_datetime": unavailable_time
        }

        response = self.client.post(
            '/bookings/',
            data=json.dumps(data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 409)
        self.assertIn("is not available", response.get_json()['error'])

    def test_3_delete_booking_success_and_restore_slot(self):
        booking_time = self.initial_times[0]

        booking = Booking(
            user_id=self.u_client.id,
            master_id=self.master.id,
            service_id=self.s.id,
            booking_datetime=datetime.strptime(booking_time, "%Y-%m-%d %H:%M")
        )
        self.master.free_times.remove(booking_time)
        db.session.add(booking)
        db.session.commit()

        response = self.client.delete(f'/bookings/{booking.id}')

        self.assertEqual(response.status_code, 200)
        self.assertIsNone(Booking.query.get(booking.id))

        master_after = Master.query.get(self.master.id)
        self.assertIn(booking_time, master_after.free_times)
        self.assertEqual(len(master_after.free_times), len(self.initial_times))

    def test_4_get_booking_details(self):
        booking_time = self.initial_times[0]
        booking = Booking(
            user_id=self.u_client.id,
            master_id=self.master.id,
            service_id=self.s.id,
            booking_datetime=datetime.strptime(booking_time, "%Y-%m-%d %H:%M")
        )
        db.session.add(booking)
        db.session.commit()

        response = self.client.get(f'/bookings/{booking.id}')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()['master_id'], self.master.id)
