#!/usr/bin/env python3

from app import application
from werkzeug.serving import run_simple

if __name__ == '__main__':
    run_simple('0.0.0.0', 5000, application, use_reloader=True, use_evalex=True, threaded=True)
