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


class MasterRoutesCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(config_class=TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = self.app.test_client()

        self.s = Service(id=1, name="Styling")
        db.session.add(self.s)

        self.u_master = User(id=10, role='master', first_name='Dmytro', last_name='Master', phone_number='111',
                             email='dmytro@test.com', password_hash='m_hash')
        db.session.add(self.u_master)
        db.session.commit()

        self.initial_times = [
            (datetime.now() + timedelta(days=2)).strftime("%Y-%m-%d %H:%M"),
            (datetime.now() + timedelta(days=3)).strftime("%Y-%m-%d %H:%M")
        ]
        self.master = Master(id=1, user_id=self.u_master.id, service_id=self.s.id, speciality=self.s.name, bio="Expert",
                             free_times=self.initial_times)
        db.session.add(self.master)
        db.session.commit()

        self.u_client = User(id=20, role='client', first_name='Anna', last_name='Client', phone_number='222',
                             email='anna@test.com', password_hash='c_hash')
        db.session.add(self.u_client)
        db.session.commit()

        self.booked_time_str = self.initial_times[0]
        self.booked_time_dt = datetime.strptime(self.booked_time_str, "%Y-%m-%d %H:%M")

        self.booking = Booking(user_id=self.u_client.id, master_id=self.master.id, service_id=self.s.id,
                               booking_datetime=self.booked_time_dt)
        db.session.add(self.booking)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_1_get_master_success(self):
        response = self.client.get(f'/masters/{self.u_master.id}')

        self.assertEqual(response.status_code, 200)
        data = response.get_json()

        self.assertEqual(data['first_name'], 'Dmytro')
        self.assertEqual(data['master_id'], self.master.id)
        self.assertEqual(data['free_times'], self.initial_times)

    def test_2_update_master_bio(self):
        new_bio = "New extensive bio about services."
        response = self.client.put(
            f'/masters/{self.master.id}/bio',
            data=json.dumps({"bio": new_bio}),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Master.query.get(self.master.id).bio, new_bio)

    def test_3_add_free_time_success(self):
        new_time = (datetime.now() + timedelta(days=4)).strftime("%Y-%m-%d %H:%M")

        response = self.client.post(
            f'/masters/{self.master.id}/free-times',
            data=json.dumps({"free_time": f"{new_time}, 2026-07-01 10:00"}),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 200)
        master_after = Master.query.get(self.master.id)

        self.assertIn(new_time, master_after.free_times)
        self.assertGreater(len(master_after.free_times), 2)

    def test_4_delete_free_time_success(self):
        time_to_delete = self.initial_times[1]

        response = self.client.delete(
            f'/masters/{self.master.id}/free-times',
            data=json.dumps({"free_time": time_to_delete}),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 200)
        master_after = Master.query.get(self.master.id)

        self.assertNotIn(time_to_delete, master_after.free_times)
        self.assertEqual(len(master_after.free_times),
                         1)

    def test_5_get_master_appointments(self):
        response = self.client.get(f'/masters/{self.master.id}/appointments')

        self.assertEqual(response.status_code, 200)
        appointments = response.get_json()

        self.assertEqual(len(appointments), 1)
        self.assertEqual(appointments[0]['client_name'], f"{self.u_client.first_name} {self.u_client.last_name}")

    def test_6_get_filtered_free_times(self):
        response = self.client.get(f'/masters/{self.master.id}/free-times/filtered')

        self.assertEqual(response.status_code, 200)
        filtered_times = response.get_json()['free_times']

        self.assertNotIn(self.booked_time_str, filtered_times)
        self.assertEqual(len(filtered_times), 1)
        self.assertIn(self.initial_times[1], filtered_times)

    def test_7_delete_master_and_user_success(self):
        Booking.query.filter_by(master_id=self.master.id).delete()
        db.session.commit()

        response = self.client.delete(f'/masters/{self.master.id}')

        self.assertEqual(response.status_code, 200)

        self.assertIsNone(Master.query.get(self.master.id))
        self.assertIsNone(User.query.get(self.u_master.id))
