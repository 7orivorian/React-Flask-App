from flask import request

from models import User


def get_user_from_token():
    # Get the token from the Authorization header
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return None, 'Access token required!', 401

    # Bearer token format: "Bearer <token>"
    token = auth_header.split(" ")[1] if len(auth_header.split(" ")) == 2 else None
    if not token:
        return None, 'Access token is malformed!', 401

    # Find the user using the token
    user = User.query.filter_by(access_token=token).first()
    if not user:
        return None, 'Invalid access token!', 401

    return user, None, None
