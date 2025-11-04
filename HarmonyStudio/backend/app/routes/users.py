from flask import Blueprint, jsonify, request
from backend.app.models.user import User
from backend.app.models.master import Master
from backend.app.models.client import Client
from backend.app.extensions import db
from backend.app.models.booking import Booking

users_bp = Blueprint('users', __name__, url_prefix='/users')


@users_bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)

    response = user.to_dict()

    if user.role == "master":
        master = Master.query.filter_by(user_id=user.id).first()
        if master:
            response.update({
                "bio": master.bio or "No bio available",
                "service_id": master.service_id
            })

    elif user.role == "client":
        client = Client.query.filter_by(id=user.id).first()
        if client and hasattr(client, 'appointments'):
            response.update({
                "appointments": [
                    {
                        "id": booking.id,
                        "master_id": booking.master_id,
                        "service_id": booking.service_id,
                        "booking_datetime": booking.booking_datetime
                    }
                    for booking in client.appointments
                ]
            })

    return jsonify(response), 200


@users_bp.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """Delete user and all associated data"""
    user = User.query.get_or_404(user_id)

    Booking.query.filter_by(user_id=user.id).delete()
    if user.role == "client":
        Client.query.filter_by(id=user.id).delete()
    elif user.role == "master":
        Master.query.filter_by(user_id=user.id).delete()

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200


@users_bp.route('/<int:user_id>', methods=['PUT'])
def update_user_details(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()

    try:
        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'last_name' in data:
            user.last_name = data['last_name']
        if 'phone_number' in data:
            user.phone_number = data['phone_number']
        if 'email' in data:
            user.email = data['email']

        db.session.commit()
        return jsonify({"message": "User details updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to update user details", "details": str(e)}), 500
