from flask import Blueprint


api = Blueprint('main', __name__,url_prefix='/')


@api.route('/main', methods=["GET"])
def request_Data():
    return "test"

