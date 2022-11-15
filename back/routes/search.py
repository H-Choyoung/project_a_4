from flask import Blueprint
# from config import db


api = Blueprint('search', __name__, url_prefix = '/search')


@api.route('/', methods=["GET"])
def request_Data():
    return "good hihhihihhi"

