import os
from flask import Flask
from instagram.client import InstagramAPI

app = Flask(__name__)
api = InstagramAPI(client_id='5168205698c040dbb91ef9f38a54601a', client_secret='1029346bbcbf4fce8c702dd9a9dd926a')

@app.route('/')
def hello():
  return file("static/index.html").read()

@app.route('/photos')
def photos():
  popular_media = api.media_popular(count=20)
  result = ""
  for media in popular_media:
     result = result + media.images['standard_resolution'].url + "<br>"
  return result

if __name__ == '__main__':
  # Bind to PORT if defined, otherwise default to 5000.
  port = int(os.environ.get('PORT', 5000))
  app.run(host='0.0.0.0', port=port)
