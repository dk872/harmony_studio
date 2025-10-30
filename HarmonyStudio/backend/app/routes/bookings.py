from flask import Blueprint, request, jsonify
from backend.app.models.user import User
from backend.app.models.master import Master
from backend.app.models.service import Service
from backend.app.models.booking import Booking
from backend.app.extensions import db
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.attributes import flag_modified
import datetime

bookings_bp = Blueprint('bookings', __name__, url_prefix='/bookings')


@bookings_bp.route('/', methods=['GET'])
def get_bookings():
    bookings = Booking.query.all()
    return jsonify([booking.to_dict() for booking in bookings]), 200


@bookings_bp.route('/<int:booking_id>', methods=['GET'])
def get_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    return jsonify(booking.to_dict()), 200


@bookings_bp.route('/', methods=['POST'])
def create_booking():
    """Create a new booking and remove a time from the free list"""
    data = request.get_json()
    booking_datetime_str = data.get('booking_datetime')

    try:
        booking_time = datetime.datetime.strptime(booking_datetime_str, "%Y-%m-%d %H:%M")
        if booking_time < datetime.datetime.now():
            return jsonify({"error": "Cannot book a time in the past."}), 400
    except ValueError:
        pass

    try:
        user = User.query.get(data.get('user_id'))
        master = Master.query.get(data.get('master_id'))

        if not user or not master:
            return jsonify({"error": "Invalid user or master ID"}), 400

        service_id = master.service_id

        current_free_times = master.free_times if master.free_times else []

        if booking_datetime_str not in current_free_times:
            return jsonify({"error": f"Time slot {booking_datetime_str} is not available (not in master's list)."}), 409

        current_free_times.remove(booking_datetime_str)
        master.free_times = current_free_times
        flag_modified(master, "free_times")

        new_booking = Booking(
            user_id=data.get('user_id'),
            master_id=data.get('master_id'),
            service_id=service_id,
            booking_datetime=booking_datetime_str
        )

        db.session.add(new_booking)
        db.session.add(master)
        db.session.commit()

        return jsonify(new_booking.to_dict()), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Database error (Integrity)"}), 500
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Booking failed: {str(e)}"}), 500


@bookings_bp.route('/<int:booking_id>', methods=['PUT'])
def update_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    data = request.get_json()

    for key, value in data.items():
        if hasattr(booking, key):
            setattr(booking, key, value)

    db.session.commit()
    return jsonify(booking.to_dict()), 200


@bookings_bp.route('/<int:booking_id>', methods=['DELETE'])
def delete_booking(booking_id):
    """Delete booking and return time to available master slots"""
    booking = Booking.query.get_or_404(booking_id)

    master_id = booking.master_id
    try:
        booking_time_str = booking.booking_datetime.strftime("%Y-%m-%d %H:%M")
    except AttributeError:
        booking_time_str = str(booking.booking_datetime).split(":")[0] + ":" + str(booking.booking_datetime).split(":")[
            1]

    master = Master.query.get(master_id)

    if master:
        current_free_times = master.free_times if master.free_times else []

        if booking_time_str not in current_free_times:
            current_free_times.append(booking_time_str)

            master.free_times = sorted(current_free_times)
            db.session.add(master)

    db.session.delete(booking)
    db.session.commit()

    return jsonify({'message': 'Booking deleted and time slot restored successfully'}), 200


@bookings_bp.route('/client/<int:user_id>/appointments', methods=['GET'])
def get_client_appointments(user_id):
    """Get all client bookings by user_id"""
    bookings = Booking.query.filter_by(user_id=user_id).all()

    appointments = []
    for booking in bookings:
        master = Master.query.get(booking.master_id)
        service = Service.query.get(booking.service_id)

        if master:
            user_data = User.query.get(master.user_id)

            appointments.append({
                "id": booking.id,
                "master_name": f"{user_data.first_name} {user_data.last_name}",
                "booking_datetime": booking.booking_datetime.strftime("%Y-%m-%d %H:%M:%S"),
                "master_image_url": master.profile_image_url,
                "service_name": service.name if service else "N/A"
            })

    return jsonify(appointments), 200
