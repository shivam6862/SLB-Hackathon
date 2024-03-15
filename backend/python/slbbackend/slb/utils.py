from rest_framework.response import Response


def get_response(data, status=200):
    return Response(data, status=status)


def post_response(data, status=201):
    return Response(data, status=status)


def post_chat(message, status=201):
    try:
        response = {
            'message': message
        }
        return Response(response, status=status)
    except Exception as e:
        return Response({'message': str(e)}, status=500)
