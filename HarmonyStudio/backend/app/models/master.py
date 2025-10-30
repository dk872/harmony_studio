from backend.app.extensions import db


class Master(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    speciality = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    free_times = db.Column(db.JSON, nullable=True)
    profile_image_url = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "service_id": self.service_id,
            "bio": self.bio,
            "free_times": self.free_times or [],
            "profile_image_url": self.profile_image_url,
            "speciality": self.speciality
        }
