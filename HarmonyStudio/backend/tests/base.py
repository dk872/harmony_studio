import unittest
from backend.app import create_app
from backend.app.extensions import db
from backend.config import TestConfig


class BaseTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(config_class=TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()

        db.create_all()

        self.client = self.app.test_client()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

        self.app_context.pop()
