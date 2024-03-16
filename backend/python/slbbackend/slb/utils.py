from rest_framework.response import Response
from .model.main import produce_translations


def get_response(data, status=200):
    return Response(data, status=status)


def post_response(data, status=201):
    return Response(data, status=status)


def post_chat(message, status=201):
    try:
        print(message)
        answer = produce_translations(message)
        response = {
            'message': answer
        }
        return Response(response, status=status)
    except Exception as e:
        return Response({'message': str(e)}, status=500)
