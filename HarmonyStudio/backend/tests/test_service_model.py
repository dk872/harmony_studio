import unittest
from backend.app import create_app
from backend.app.extensions import db
from backend.app.models.service import Service
from backend.config import TestConfig


class ServiceModelCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(config_class=TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_service_creation_and_integrity(self):
        s = Service(
            name='Hair Styling',
            description='Professional haircut and styling services.'
        )
        db.session.add(s)
        db.session.commit()

        retrieved_service = Service.query.filter_by(name='Hair Styling').first()

        self.assertIsNotNone(retrieved_service)
        self.assertEqual(retrieved_service.description, 'Professional haircut and styling services.')
        self.assertIsNotNone(retrieved_service.id)

    def test_service_to_dict_full_data(self):
        s = Service(
            name='Manicure',
            description='Complete nail care.'
        )
        db.session.add(s)
        db.session.commit()

        service_dict = s.to_dict()

        self.assertIn('id', service_dict)
        self.assertEqual(service_dict['name'], 'Manicure')
        self.assertEqual(service_dict['description'], 'Complete nail care.')

    def test_service_to_dict_nullable_description(self):
        s = Service(
            name='Pedicure',
            description=None
        )
        db.session.add(s)
        db.session.commit()

        service_dict = s.to_dict()

        self.assertEqual(service_dict['name'], 'Pedicure')
        self.assertIsNone(service_dict['description'])
