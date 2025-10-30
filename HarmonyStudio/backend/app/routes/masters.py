from flask import Blueprint, request, jsonify
from backend.app.models.master import Master
from backend.app.models.user import User
from backend.app.extensions import db
from sqlalchemy.exc import IntegrityError
from backend.app.models.booking import Booking
import datetime

DATETIME_FORMAT = "%Y-%m-%d %H:%M"
masters_bp = Blueprint('masters', __name__, url_prefix='/masters')


@masters_bp.route('/', methods=['GET'])
def get_masters():
    masters = Master.query.all()
    return jsonify([master.to_dict() for master in masters]), 200


@masters_bp.route('/<int:user_id>', methods=['GET'])
def get_master(user_id):
    master = Master.query.filter_by(user_id=user_id).first()

    if not master:
        return jsonify({"error": "Master not found"}), 404

    user_data = User.query.get_or_404(master.user_id)

    response = {
        "master_id": master.id,
        "service_id": master.service_id,
        "first_name": user_data.first_name,
        "last_name": user_data.last_name,
        "email": user_data.email,
        "phone_number": user_data.phone_number,
        "bio": master.bio or "No bio available",
        "profile_image_url": master.profile_image_url,
        "speciality": master.speciality or "Service Specialist",
        "free_times": master.free_times if master.free_times else []
    }

    return jsonify(response), 200


@masters_bp.route('/', methods=['POST'])
def create_master():
    data = request.get_json()
    try:
        new_master = Master(
            user_id=data.get('user_id'),
            service_id=data.get('service_id'),
            bio=data.get('bio'),
            speciality="Service Specialist"
        )
        db.session.add(new_master)
        db.session.commit()
        return jsonify(new_master.to_dict()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Database error"}), 500


@masters_bp.route('/<int:master_id>', methods=['PUT'])
def update_master(master_id):
    master = Master.query.get_or_404(master_id)
    data = request.get_json()
    for key, value in data.items():
        if hasattr(master, key):
            setattr(master, key, value)
    db.session.commit()
    return jsonify(master.to_dict()), 200


@masters_bp.route('/<int:master_id>', methods=['DELETE'])
def delete_master(master_id):
    """Delete the master (Master record) and the corresponding user (User record)"""

    master = Master.query.get_or_404(master_id)
    user = User.query.get(master.user_id)

    print(f"Attempting to delete master ID: {master_id} and user ID: {master.user_id}")

    try:
        related_bookings = Booking.query.filter_by(master_id=master_id).all()
        if related_bookings:
            print(f"Warning: Deleting master with {len(related_bookings)} associated bookings.")

        db.session.delete(master)
        if user:
            db.session.delete(user)
        db.session.commit()

        return jsonify({'message': 'Master and associated user deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete master and user', 'details': str(e)}), 500


@masters_bp.route('/<int:master_id>/bio', methods=['PUT'])
def update_master_bio(master_id):
    master = Master.query.get_or_404(master_id)
    data = request.get_json()
    bio = data.get('bio')

    if not bio:
        return jsonify({"error": "Bio is required"}), 400

    master.bio = bio
    db.session.commit()
    return jsonify({"message": "Bio updated successfully", "bio": master.bio}), 200


@masters_bp.route('/<int:master_id>/free-times', methods=['GET'])
def get_free_times(master_id):
    master = Master.query.get_or_404(master_id)

    free_times = master.free_times if master.free_times else []

    return jsonify({"free_times": free_times}), 200


@masters_bp.route('/<int:master_id>/free-times', methods=['POST'])
def add_free_time(master_id):
    """Add or update free time for a master"""
    master = Master.query.get_or_404(master_id)
    data = request.get_json()
    free_time_input = data.get("free_time")

    if not free_time_input:
        return jsonify({"error": "Free time is required"}), 400

    raw_new_times = [time.strip() for time in free_time_input.split(",") if time.strip()]

    new_times = []

    for time_str in raw_new_times:
        try:
            datetime.datetime.strptime(time_str, DATETIME_FORMAT)
            new_times.append(time_str)
        except ValueError:
            print(f"Skipping invalid time format: {time_str}")

    if not new_times and raw_new_times:
        return jsonify({"error": "All submitted free times had an invalid format. Expected YYYY-MM-DD HH:MM"}), 400

    existing_times = master.free_times if master.free_times else []

    cleaned_existing_times = []
    for time_str in existing_times:
        try:
            datetime.datetime.strptime(time_str, DATETIME_FORMAT)
            cleaned_existing_times.append(time_str)
        except ValueError:
            pass

    updated_times = list(set(cleaned_existing_times + new_times))

    updated_times.sort()

    master.free_times = updated_times
    db.session.commit()

    return jsonify({"message": "Free time updated successfully", "free_times": master.free_times}), 200


@masters_bp.route('/<int:master_id>/appointments', methods=['GET'])
def get_master_appointments(master_id):
    """Get a list of clients who have made a booking with the master"""
    bookings = Booking.query.filter_by(master_id=master_id).all()
    appointments = []

    for booking in bookings:
        user_data = User.query.get(booking.user_id)
        if user_data:
            appointments.append({
                "id": booking.id,
                "client_name": f"{user_data.first_name} {user_data.last_name}",
                "booking_datetime": booking.booking_datetime.strftime("%Y-%m-%d %H:%M:%S")
            })

    return jsonify(appointments), 200


@masters_bp.route('/<int:master_id>/free-times/filtered', methods=['GET'])
def get_filtered_free_times(master_id):
    """Get a list of free time filtered from busy slots"""
    master = Master.query.get_or_404(master_id)

    if not master.free_times:
        return jsonify({"free_times": []}), 200

    booked_slots = [booking.booking_datetime.strftime("%Y-%m-%d %H:%M")
                    for booking in Booking.query.filter_by(master_id=master_id).all()]
    filtered_times = [time for time in master.free_times if time not in booked_slots]

    return jsonify({"free_times": filtered_times}), 200


@masters_bp.route('/<int:master_id>/free-times', methods=['DELETE'])
def delete_free_time(master_id):
    master = Master.query.get_or_404(master_id)
    data = request.get_json()
    free_time_to_delete = data.get("free_time")

    if not free_time_to_delete:
        return jsonify({"error": "Free time is required"}), 400

    try:
        datetime.datetime.strptime(free_time_to_delete, DATETIME_FORMAT)
    except ValueError:
        return jsonify({"error": "Invalid time format. Expected YYYY-MM-DD HH:MM"}), 400

    existing_times = master.free_times if master.free_times else []
    if free_time_to_delete not in existing_times:
        return jsonify({"error": "Free time slot not found"}), 404

    updated_times = [time for time in existing_times if time != free_time_to_delete]

    master.free_times = updated_times
    db.session.commit()

    return jsonify({
        "message": "Free time deleted successfully",
        "free_times": master.free_times
    }), 200
