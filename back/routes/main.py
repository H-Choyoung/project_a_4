from flask import Blueprint


api = Blueprint('main', __name__, url_prefix='/main')


@api.route('/')
def save():
    return "main"



