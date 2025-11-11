import unittest
from datetime import datetime
from backend.app import create_app
from backend.app.extensions import db
from backend.app.models.user import User
from backend.app.models.master import Master
from backend.app.models.service import Service
from backend.app.models.booking import Booking
from backend.config import TestConfig


class BookingModelCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(config_class=TestConfig)

        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

        self.s = Service(name="Test Service")
        db.session.add(self.s)

        self.u_client = User(id=1, role='client', first_name='C', last_name='L', phone_number='123', email='c@test.com', password_hash='hashed_client_pass')
        self.u_master = User(id=2, role='master', first_name='M', last_name='A', phone_number='456', email='m@test.com', password_hash='hashed_master_pass')
        db.session.add_all([self.u_client, self.u_master])
        db.session.commit()

        self.master = Master(id=1, user_id=self.u_master.id, service_id=self.s.id, speciality="Test")
        db.session.add(self.master)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_booking_to_dict_serialization(self):
        booking_time = datetime(2025, 12, 25, 15, 30, 0)

        b = Booking(
            user_id=self.u_client.id,
            master_id=self.master.id,
            service_id=self.s.id,
            booking_datetime=booking_time
        )
        db.session.add(b)
        db.session.commit()

        expected_isoformat = "2025-12-25T15:30:00"

        booking_dict = b.to_dict()

        self.assertIn('booking_datetime', booking_dict)
        self.assertEqual(booking_dict['booking_datetime'], expected_isoformat)
        self.assertEqual(booking_dict['user_id'], self.u_client.id)
        self.assertEqual(booking_dict['master_id'], self.master.id)
        self.assertEqual(booking_dict['service_id'], self.s.id)

    def test_booking_integrity_on_creation(self):
        test_time = datetime(2025, 1, 1, 10, 0)

        b = Booking(
            user_id=self.u_client.id,
            master_id=self.master.id,
            service_id=self.s.id,
            booking_datetime=test_time
        )
        db.session.add(b)
        db.session.commit()

        retrieved_booking = Booking.query.filter_by(user_id=self.u_client.id).first()

        self.assertIsNotNone(retrieved_booking)
        self.assertEqual(retrieved_booking.booking_datetime, test_time)
        self.assertEqual(retrieved_booking.master_id, self.master.id)
