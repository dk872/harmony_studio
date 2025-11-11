import unittest
import json
from datetime import date
from backend.app import create_app
from backend.app.extensions import db
from backend.app.models.user import User
from backend.app.models.master import Master
from backend.app.models.service import Service
from backend.config import TestConfig


def calculate_age(birth_date):
    today = date.today()
    return today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))


class ServiceRoutesCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(config_class=TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = self.app.test_client()

        self.s1 = Service(id=1, name="Manicure", description="Basic nail care")
        self.s2 = Service(id=2, name="Haircut", description="Hair styling")
        db.session.add_all([self.s1, self.s2])

        self.birth_date = date(1990, 1, 1)
        self.u_master = User(id=10, role='master', first_name='Dmytro', last_name='Master', phone_number='111',
                             email='dmytro@test.com', password_hash='m_hash', date_of_birth=self.birth_date)
        db.session.add(self.u_master)
        db.session.commit()

        self.master = Master(id=1, user_id=self.u_master.id, service_id=self.s1.id, speciality=self.s1.name,
                             bio="Manicure expert")
        db.session.add(self.master)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_1_create_service_success(self):
        data = {"name": "Pedicure", "description": "Foot care"}
        response = self.client.post(
            '/services/',
            data=json.dumps(data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.get_json()['name'], 'Pedicure')
        self.assertIsNotNone(Service.query.filter_by(name="Pedicure").first())

    def test_2_create_service_missing_name(self):
        data = {"description": "Foot care"}
        response = self.client.post(
            '/services/',
            data=json.dumps(data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("Missing required field: 'name'", response.get_json()['error'])

    def test_3_get_services_list(self):
        response = self.client.get('/services/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.get_json()), 2)
        self.assertEqual(response.get_json()[0]['name'], 'Manicure')

    def test_4_update_service_success(self):
        new_desc = "Updated comprehensive nail care"
        response = self.client.put(
            f'/services/{self.s1.id}',
            data=json.dumps({"description": new_desc}),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Service.query.get(self.s1.id).description, new_desc)

    def test_5_delete_service_success(self):
        response = self.client.delete(f'/services/{self.s2.id}')
        self.assertEqual(response.status_code, 200)
        self.assertIsNone(Service.query.get(self.s2.id))

    def test_6_get_service_with_masters_list(self):
        response = self.client.get(f'/services/{self.s1.id}')

        self.assertEqual(response.status_code, 200)
        data = response.get_json()

        self.assertEqual(data['name'], 'Manicure')
        self.assertIn('specialists', data)
        self.assertEqual(len(data['specialists']), 1)

        specialist = data['specialists'][0]
        self.assertEqual(specialist['name'], 'Dmytro Master')
        self.assertEqual(specialist['bio'], 'Manicure expert')

        current_age = calculate_age(self.birth_date)
        self.assertEqual(specialist['age'], current_age)

    def test_7_get_service_not_found(self):
        response = self.client.get('/services/999')
        self.assertEqual(response.status_code, 404)
        self.assertIn("Service not found", response.get_json()['error'])