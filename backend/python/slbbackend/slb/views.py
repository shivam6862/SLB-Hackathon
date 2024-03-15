from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import get_response, post_response, post_chat


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {'Endpoint': '/slb/', 'method': 'GET',
         'body': None, 'description': 'Returns an array of slb'},
        {'Endpoint': '/slb/', 'method': 'POST',
            'body': {'name': 'string', 'age': 'integer'}, 'description': 'Creates a new slb'},
        {'Endpoint': '/slb/chat/', 'method': 'POST',
            'body': {'message': 'string'}, 'description': 'Send a message to the chat'}

    ]
    return Response(routes)


@api_view(['GET', 'POST'])
def getSlb(request):
    if request.method == 'GET':
        return get_response('Get all slb')
    elif request.method == 'POST':
        return post_response('Create new slb')
    return get_response('Hello World')


@api_view(['POST'])
def chat(request):
    message = request.data['message']
    return post_chat(message)
