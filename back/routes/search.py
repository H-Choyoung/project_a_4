from flask import Blueprint
# from config import db


api = Blueprint('search', __name__, url_prefix = '/')


@api.route('/search', methods=["GET"])
def request_Data():
    return "good hihhihihhi"

