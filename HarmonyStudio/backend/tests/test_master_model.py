import unittest
from backend.app import create_app
from backend.app.extensions import db
from backend.app.models.user import User
from backend.app.models.master import Master
from backend.app.models.service import Service
from backend.config import TestConfig


class MasterModelCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(config_class=TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

        self.s = Service(id=50, name="Manicure")
        db.session.add(self.s)

        self.u = User(
            id=100,
            role='master',
            first_name='Test',
            last_name='Master',
            phone_number='1112223333',
            email='master@test.com',
            password_hash='master_hash'
        )
        db.session.add(self.u)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_master_creation_and_integrity(self):
        m = Master(
            user_id=self.u.id,
            service_id=self.s.id,
            speciality=self.s.name,
            bio='Experienced master of nails',
            free_times=['2026-05-01 09:00', '2026-05-01 10:00']
        )
        db.session.add(m)
        db.session.commit()

        retrieved_master = Master.query.filter_by(user_id=self.u.id).first()

        self.assertIsNotNone(retrieved_master)
        self.assertEqual(retrieved_master.user_id, self.u.id)
        self.assertEqual(retrieved_master.service_id, self.s.id)
        self.assertEqual(retrieved_master.speciality, 'Manicure')
        self.assertIsInstance(retrieved_master.free_times, list)

    def test_master_to_dict_full_data(self):
        m = Master(
            user_id=self.u.id,
            service_id=self.s.id,
            speciality='Pedicure',
            bio='Great bio',
            free_times=['2026-06-01 11:00'],
            profile_image_url='url/photo.jpg'
        )
        db.session.add(m)
        db.session.commit()

        master_dict = m.to_dict()

        self.assertEqual(master_dict['user_id'], self.u.id)
        self.assertEqual(master_dict['speciality'], 'Pedicure')
        self.assertEqual(master_dict['bio'], 'Great bio')
        self.assertEqual(master_dict['free_times'], ['2026-06-01 11:00'])
        self.assertIn('url/photo.jpg', master_dict['profile_image_url'])

    def test_master_to_dict_handles_none_free_times(self):
        m = Master(
            user_id=self.u.id,
            service_id=self.s.id,
            speciality='Hair Coloring',
            bio='No times yet',
            free_times=None,
        )
        db.session.add(m)
        db.session.commit()

        master_dict = m.to_dict()

        self.assertIn('free_times', master_dict)
        self.assertEqual(master_dict['free_times'], [])
        self.assertIsNone(master_dict['profile_image_url'])
