from backend.app.extensions import db


class Client(db.Model):
    id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    user = db.relationship('User', backref=db.backref('client', uselist=False))

    additional_info = db.Column(db.Text, nullable=True)

    def to_dict(self):
        user_data = self.user.to_dict()
        return {
            **user_data,
            "additional_info": self.additional_info
        }
