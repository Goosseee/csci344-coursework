from flask import Response, request
from flask_restful import Resource
from models import Following, Post, db
from views import get_authorized_user_ids

import json

def get_path():
    return request.host_url + 'api/posts/'

class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        print("TESTING:", request.args.get('limit'))
        limit = request.args.get('limit')
        # get posts created by one of these users:
        #1. Get all the use_ids of people that the user#12 is following
        following = Following.query.filter_by(user_id=self.current_user.id).all()
        
        # building a list of our friends' usernames:
        friends_ids = []
        for rec in following: 
                friends_ids.append(rec.following_id)
        friends_ids.append(self.current_user.id)
        print(friends_ids)  

#   Alternative syntax:
# if limit:
#         posts = Post.query.filter(Post.user_id.in_(friends_ids)).limit(limit)
# else:
#         posts = Post.query.filter(Post.user_id.in_(friends_ids)).limit(20)
 
        try: 
            limit = request.args.get('limit') or 20
            limit = int(limit)
        except: 
            return Response(
                json.dumps({'error:' : 'no string for limit'}, status=400
                )
            )
            if limit > 20:
                return Response(
                    json.dumps({'error': 'bad data: LImit cannot exceed 200'}, status =400)
            )

        posts = Post.query.filter(Post.user_id.in_(friends_ids)).limit(limit)
        return Response(json.dumps([post.to_dict() for post in posts]), mimetype="application/json", status=200)



def post(self):
        # create a new post based on the data posted in the body 
        body = request.get_json()
        print(body)  
        return Response(json.dumps({}), mimetype="application/json", status=201)
        
class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
        

    def patch(self, id):
        # update post based on the data posted in the body 
        body = request.get_json()
        print(body)       
        return Response(json.dumps({}), mimetype="application/json", status=200)


    def delete(self, id):
        # delete post where "id"=id
        return Response(json.dumps({}), mimetype="application/json", status=200)


    def get(self, id):
        # get the post based on the id
        return Response(json.dumps({}), mimetype="application/json", status=200)

def initialize_routes(api):
    # manipulate a list of posts
    api.add_resource(
        PostListEndpoint, 
        '/api/posts', '/api/posts/', 
        resource_class_kwargs={'current_user': api.app.current_user}
    )
    
    # manpiulate a single post
    api.add_resource(
        PostDetailEndpoint, 
        '/api/posts/<int:id>', '/api/posts/<int:id>/',
        resource_class_kwargs={'current_user': api.app.current_user}
    )