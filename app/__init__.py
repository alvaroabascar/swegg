import connexion
from .frontend.views import frontend_app
from werkzeug.wsgi import peek_path_info
from threading import Lock
from . import api

# Using this class we dispatch one app or another (frontend or backend)
# depending on how the path starts.
# I didn't find another way to have the frontend in root and the API
# (with swagger) in /api/v1/. Using the normal way ('DispatcherMiddleware')
# failed for the api endpoints.
class PathDispatcher:

    def __init__(self, frontend_app, backend_app):
        self.frontend_app = frontend_app
        self.backend_app = backend_app
        self.lock = Lock()

    def __call__(self, environ, start_response):
        if peek_path_info(environ) == 'api':
            return self.backend_app(environ, start_response)
        else:
            return self.frontend_app(environ, start_response)

# Create backend application. We use 'connexion' in order to define it via
# Swagger.
backend_app = connexion.App(__name__, 5000,
                    specification_dir='./swagger/', debug=True)
backend_app.add_api('swagger.yaml', arguments={'title': 'MSConnect webapp API'})

application = PathDispatcher(frontend_app, backend_app.app)
